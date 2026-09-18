import React, { useEffect, useRef, useState } from "react";
import { reducedMotion } from "./primitives";

/*
 * Animated ASCII backdrops. Each art exposes
 *   { fps, init(grid) -> state, frame(state, grid) }
 * and draws into a character Grid of any size. Frames are written straight
 * to a <pre> (no React re-render) and only run while on screen.
 */

class Grid {
  constructor(W, H) {
    this.W = W;
    this.H = H;
    this.cells = new Array(W * H).fill(" ");
    this.z = new Float32Array(W * H);
  }
  clear() {
    this.cells.fill(" ");
    this.z.fill(-1e9);
  }
  put(x, y, ch) {
    if (x >= 0 && x < this.W && y >= 0 && y < this.H) this.cells[x + y * this.W] = ch;
  }
  /* depth-tested put: larger z is closer to the viewer */
  putZ(x, y, z, ch) {
    if (x < 0 || x >= this.W || y < 0 || y >= this.H) return;
    const o = x + y * this.W;
    if (z > this.z[o]) {
      this.z[o] = z;
      this.cells[o] = ch;
    }
  }
  toString() {
    let s = "";
    for (let r = 0; r < this.H; r++) {
      s += this.cells.slice(r * this.W, (r + 1) * this.W).join("") + "\n";
    }
    return s;
  }
}

const rnd = (n) => (Math.random() * n) | 0;

/* Starfield warp: stars fly toward the viewer, growing . -> + -> * -> # */
const stars = {
  fps: 30,
  init: (g) => ({
    stars: Array.from({ length: Math.round((g.W * g.H) / 16) }, () => ({
      x: Math.random() * 2 - 1,
      y: Math.random() * 2 - 1,
      z: Math.random(),
    })),
  }),
  frame(s, g) {
    s.stars.forEach((st) => {
      st.z -= 0.012;
      if (st.z <= 0.02) {
        st.x = Math.random() * 2 - 1;
        st.y = Math.random() * 2 - 1;
        st.z = 1;
      }
      const px = Math.round(g.W / 2 + (st.x / st.z) * g.W * 0.25);
      const py = Math.round(g.H / 2 + (st.y / st.z) * g.H * 0.25);
      g.put(px, py, st.z > 0.6 ? "." : st.z > 0.3 ? "+" : st.z > 0.15 ? "*" : "#");
    });
  },
};

/* Digital rain: columns of glyphs falling with a bright head and fading tail */
const RAIN = "0101010<>[]{}|/\\=+*#%&$@;:";
const rain = {
  fps: 15,
  init: (g) => ({
    cols: Array.from({ length: g.W }, () => ({ y: rnd(g.H * 2) - g.H, len: 4 + rnd(g.H / 2) })),
    glyph: new Array(g.W * g.H).fill(":"),
  }),
  frame(s, g) {
    s.cols.forEach((c, x) => {
      c.y += 1;
      if (c.y - c.len > g.H) {
        c.y = -rnd(g.H);
        c.len = 4 + rnd(g.H / 2);
      }
      for (let k = 0; k < c.len; k++) {
        const y = c.y - k;
        if (y < 0 || y >= g.H) continue;
        if (k === 0) s.glyph[x + y * g.W] = RAIN[rnd(RAIN.length)];
        g.put(x, y, k === 0 ? "@" : k > c.len - 3 ? "." : s.glyph[x + y * g.W]);
      }
    });
  },
};

/* ------------------------------------------------------------------ */
/* Kick-ups: a point-cloud figure juggling a football, lit + depth-sorted */
/* ------------------------------------------------------------------ */
const RAMP = ".:-=+*#%@";
const shade = (v) => RAMP[Math.max(0, Math.min(RAMP.length - 1, Math.round(v * (RAMP.length - 1))))];
const norm = ([x, y, z]) => {
  const l = Math.hypot(x, y, z) || 1;
  return [x / l, y / l, z / l];
};
const rotX = ([x, y, z], a) => [x, y * Math.cos(a) - z * Math.sin(a), y * Math.sin(a) + z * Math.cos(a)];
const rotY = ([x, y, z], a) => [x * Math.cos(a) + z * Math.sin(a), y, -x * Math.sin(a) + z * Math.cos(a)];

/* sphere surface points with normals */
function sphere(c, r, steps = 16) {
  const out = [];
  for (let i = 0; i <= steps; i++) {
    const th = (i / steps) * Math.PI;
    const ring = Math.max(6, Math.round(steps * 2 * Math.sin(th)));
    for (let j = 0; j < ring; j++) {
      const ph = (j / ring) * Math.PI * 2;
      const n = [Math.sin(th) * Math.cos(ph), Math.cos(th), Math.sin(th) * Math.sin(ph)];
      out.push({ p: [c[0] + n[0] * r, c[1] + n[1] * r, c[2] + n[2] * r], n });
    }
  }
  return out;
}

/* tube from a to b with radius r (or r(t)); rz flattens the cross-section in z */
function tube(a, b, r, rz = r, around = 20) {
  const out = [];
  const axis = norm([b[0] - a[0], b[1] - a[1], b[2] - a[2]]);
  const len = Math.hypot(b[0] - a[0], b[1] - a[1], b[2] - a[2]);
  const helper = Math.abs(axis[1]) < 0.9 ? [0, 1, 0] : [1, 0, 0];
  const u = norm([
    axis[1] * helper[2] - axis[2] * helper[1],
    axis[2] * helper[0] - axis[0] * helper[2],
    axis[0] * helper[1] - axis[1] * helper[0],
  ]);
  const v = [axis[1] * u[2] - axis[2] * u[1], axis[2] * u[0] - axis[0] * u[2], axis[0] * u[1] - axis[1] * u[0]];
  const steps = Math.max(2, Math.round(len / 0.035));
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const rr = typeof r === "function" ? r(t) : r;
    const rrz = typeof rz === "function" ? rz(t) : rz;
    for (let j = 0; j < around; j++) {
      const ang = (j / around) * Math.PI * 2;
      const ca = Math.cos(ang), sa = Math.sin(ang);
      const n = norm([ca * u[0] + sa * v[0], ca * u[1] + sa * v[1], ca * u[2] + sa * v[2]]);
      out.push({
        p: [
          a[0] + (b[0] - a[0]) * t + rr * ca * u[0] + rrz * sa * v[0],
          a[1] + (b[1] - a[1]) * t + rr * ca * u[1] + rrz * sa * v[1],
          a[2] + (b[2] - a[2]) * t + rr * ca * u[2] + rrz * sa * v[2],
        ],
        n,
      });
    }
  }
  return out;
}

const cross = ([a, b, c], [d, e, f]) => [b * f - c * e, c * d - a * f, a * e - b * d];
const add = (a, b, k = 1) => [a[0] + b[0] * k, a[1] + b[1] * k, a[2] + b[2] * k];

/* Upper body is static: head, neck, torso, hips, arms out for balance. */
function upperBody() {
  const pts = [
    ...sphere([0, 0.82, 0], 0.17),
    ...tube([0, 0.68, 0], [0, 0.6, 0], 0.06),
    ...tube([0, 0.6, 0], [0, 0.05, 0], (t) => 0.26 - 0.07 * t, (t) => 0.14 - 0.02 * t, 28),
    ...tube([0, 0.05, 0], [0, -0.06, 0], 0.2, 0.13, 24),
  ];
  [1, -1].forEach((side) => {
    pts.push(
      ...sphere([0.29 * side, 0.56, 0], 0.075, 10),
      ...tube([0.3 * side, 0.55, 0], [0.48 * side, 0.3, 0.06], 0.065),
      ...tube([0.48 * side, 0.3, 0.06], [0.6 * side, 0.08, 0.14], 0.055),
      ...sphere([0.62 * side, 0.03, 0.16], 0.06, 10)
    );
  });
  return pts;
}

/* A panelled football: dark patches on a light sphere, tagged for the shader. */
function football(r) {
  return sphere([0, 0, 0], r, 12).map((pt) => {
    const [x, y, z] = pt.n;
    const patch = (Math.floor((Math.atan2(z, x) + Math.PI) / (Math.PI / 2.5)) + Math.floor((y + 1) * 1.5)) % 2 === 0;
    return { ...pt, tag: patch ? "patch" : null };
  });
}

const THIGH = 0.47;
const SHIN = 0.42;
/* Two-bone IK: thigh + shin from the hip to a foot target, knee bending forward. */
function leg(hip, target) {
  let d = Math.hypot(target[0] - hip[0], target[1] - hip[1], target[2] - hip[2]);
  d = Math.min(d, THIGH + SHIN - 0.01);
  const dir = norm([target[0] - hip[0], target[1] - hip[1], target[2] - hip[2]]);
  // bend direction: forward (+z), made perpendicular to the hip->foot line
  let bend = add([0, 0, 1], dir, -dir[2]);
  bend = norm(bend[0] || bend[1] || bend[2] ? bend : [0, 1, 0]);
  const cosA = Math.max(-1, Math.min(1, (THIGH * THIGH + d * d - SHIN * SHIN) / (2 * THIGH * d)));
  const sinA = Math.sqrt(1 - cosA * cosA);
  const knee = add(add(hip, dir, THIGH * cosA), bend, THIGH * sinA);
  const foot = add(hip, dir, d);
  const shin = norm(add(foot, knee, -1));
  const toe = norm(cross(shin, [1, 0, 0])); // perpendicular to the shin, pointing forward
  return [
    ...tube(hip, knee, 0.1, 0.1),
    ...tube(knee, foot, 0.075),
    ...tube(add(foot, toe, -0.04), add(foot, toe, 0.2), 0.055, 0.04),
  ];
}

/*
 * Kick-ups. The ball follows a parabola between alternating feet; the kicking
 * foot swings up to meet it just before each bounce. Camera looks down -z with
 * the viewer at +z; cells are ~2x taller than wide, so x is scaled by 2.
 */
const BALL_R = 0.13;
const PERIOD = 44; // frames per bounce
const REST = -0.92;
const kickups = {
  fps: 22,
  init: () => ({ body: upperBody(), ball: football(BALL_R), t: 0, a: 0.4 }),
  frame(s, g) {
    s.t++;
    s.a += 0.022;
    const cycle = Math.floor(s.t / PERIOD);
    const ph = (s.t % PERIOD) / PERIOD;
    const from = cycle % 2 ? 1 : -1; // foot the ball just left
    const to = -from;

    // feet: each foot rises around its own kick, which happens every other cycle
    const feet = [1, -1].map((side) => {
      const q = (((s.t - (side === 1 ? 0 : PERIOD)) % (2 * PERIOD)) + 2 * PERIOD) % (2 * PERIOD) / PERIOD;
      const c = Math.cos(Math.PI * q);
      const lift = c > 0 ? c * c : 0; // 1 at the kick, 0 for the rest of the time
      const rest = [0.14 * side, REST, 0];
      const kick = [0.16 * side, -0.66, 0.34];
      return add(rest, add(kick, rest, -1), lift);
    });

    // ball: parabola from the last foot to the next, spinning as it goes
    const bx = 0.16 * (from * (1 - ph) + to * ph);
    const by = -0.66 + BALL_R + 4 * 0.85 * ph * (1 - ph);
    const bz = 0.36 + 0.06 * Math.sin(ph * Math.PI);
    const spin = s.t * 0.25;

    const dynamic = [
      ...leg([0.12, -0.03, 0], feet[0]),
      ...leg([-0.12, -0.03, 0], feet[1]),
      ...s.ball.map((pt) => ({ p: add(rotX(pt.p, spin), [bx, by, bz]), n: rotX(pt.n, spin), tag: pt.tag })),
    ];

    const scale = g.H / 2.5;
    const L = norm([-0.5, 0.6, 1]);
    const tilt = 0.06;
    const draw = (pt) => {
      const p = rotX(rotY(pt.p, s.a), tilt);
      const n = rotX(rotY(pt.n, s.a), tilt);
      if (n[2] < -0.35) return; // back-facing
      const persp = 3.2 / (3.2 - p[2]);
      const sx = Math.round(g.W / 2 + p[0] * scale * 2 * persp);
      const sy = Math.round(g.H / 2 - (p[1] + 0.08) * scale * persp);
      const lit = Math.max(0.04, n[0] * L[0] + n[1] * L[1] + n[2] * L[2]);
      g.putZ(sx, sy, persp, pt.tag === "patch" ? "@" : shade(lit));
    };
    s.body.forEach(draw);
    dynamic.forEach(draw);

    // a floor line so it reads as standing on something
    const fy = Math.round(g.H / 2 + (0.98 - 0.08) * scale);
    for (let x = Math.round(g.W * 0.25); x < g.W * 0.75; x++) g.put(x, fy, "_");
  },
};

const arts = { stars, rain, kickups };

/* Drives one art into a <pre>, at that art's frame rate, only while visible. */
function useArtLoop(ref, name, cols, rows) {
  useEffect(() => {
    const el = ref.current;
    const art = arts[name];
    if (!el || !art || !cols || !rows) return undefined;
    const g = new Grid(cols, rows);
    const state = art.init(g);
    const draw = () => {
      g.clear();
      art.frame(state, g);
      el.textContent = g.toString().slice(0, -1); // drop the final newline
    };
    draw();
    if (reducedMotion()) return undefined;

    let visible = true;
    let raf = 0;
    let last = 0;
    const step = 1000 / art.fps;
    const loop = (now) => {
      raf = requestAnimationFrame(loop);
      if (!visible || document.hidden || now - last < step) return;
      last = now;
      draw();
    };
    raf = requestAnimationFrame(loop);
    const io =
      "IntersectionObserver" in window
        ? new IntersectionObserver(([e]) => {
            visible = e.isIntersecting;
          })
        : null;
    io?.observe(el);
    return () => {
      cancelAnimationFrame(raf);
      io?.disconnect();
    };
  }, [ref, name, cols, rows]);
}

/* Measures how many character cells fit in an element (re-measured on resize). */
function useCellSize(ref, withRows) {
  const [size, setSize] = useState({ cols: 0, rows: 0 });
  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const measure = () => {
      const probe = document.createElement("pre");
      probe.textContent = "0".repeat(100) + "\n0";
      probe.style.cssText = "position:absolute;visibility:hidden;margin:0;font:inherit;line-height:inherit";
      el.appendChild(probe);
      const r = probe.getBoundingClientRect();
      probe.remove();
      const chW = r.width / 100;
      const chH = r.height / 2;
      setSize({
        cols: Math.max(10, Math.floor(el.clientWidth / chW)),
        rows: withRows ? Math.max(4, Math.floor(el.clientHeight / chH)) : 0,
      });
    };
    measure();
    const ro = "ResizeObserver" in window ? new ResizeObserver(measure) : null;
    ro?.observe(el);
    return () => ro?.disconnect();
  }, [ref, withRows]);
  return size;
}

/* An art filling the whole of a positioned parent, behind its content. */
export function AsciiBackdrop({ art = "stars", className = "" }) {
  const ref = useRef(null);
  const preRef = useRef(null);
  const { cols, rows } = useCellSize(ref, true);
  useArtLoop(preRef, art, cols, rows);
  return (
    <div ref={ref} className={`ascii-backdrop ${className}`} aria-hidden="true">
      <pre ref={preRef} className="ascii backdrop-canvas" />
    </div>
  );
}

/* A fixed-size canvas for one art, e.g. the rotating figure. */
export function AsciiFigure({ art = "kickups", cols = 44, rows = 24, className = "" }) {
  const preRef = useRef(null);
  useArtLoop(preRef, art, cols, rows);
  return (
    <pre
      ref={preRef}
      className={`ascii figure-canvas ${className}`}
      style={{ width: `${cols}ch`, height: `${rows}em` }}
      aria-hidden="true"
    />
  );
}

/* A full-width strip of one art; columns follow the container width. */
export function AsciiStrip({ art = "rain", rows = 10, className = "" }) {
  const ref = useRef(null);
  const preRef = useRef(null);
  const { cols } = useCellSize(ref, false);
  useArtLoop(preRef, art, cols, rows);
  return (
    <div ref={ref} className={`ascii-strip ${className}`} aria-hidden="true">
      <pre ref={preRef} className="ascii strip-canvas" />
    </div>
  );
}
