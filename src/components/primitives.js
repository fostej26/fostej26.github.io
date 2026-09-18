import React, { useEffect, useRef, useState } from "react";

export const reducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export const HOME = "C:\\Users\\Jacob";

/* A cmd.exe prompt line: `C:\Users\Jacob\path><cmd>` */
export function Prompt({ cmd, path = "", children }) {
  return (
    <div className="prompt-line">
      <span className="prompt-path">
        {HOME}
        {path}&gt;
      </span>
      <span className="prompt-cmd">{cmd}</span>
      {children}
    </div>
  );
}

/* Blinking underscore cursor, as in cmd.exe. */
export const Cursor = () => (
  <span className="cursor" aria-hidden="true">
    _
  </span>
);

/* Fires once when the element scrolls into view. */
export function useInView(margin = "-10% 0px") {
  const ref = useRef(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || seen) return undefined;
    if (!("IntersectionObserver" in window)) {
      setSeen(true);
      return undefined;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) setSeen(true);
      },
      { rootMargin: margin }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [seen, margin]);
  return [ref, seen];
}

/*
 * A prompt whose command gets typed keystroke by keystroke once it scrolls
 * into view, with a cursor while typing. Calls onDone when "Enter" is hit.
 */
export function TypedPrompt({ cmd, path = "", onDone }) {
  const [ref, seen] = useInView();
  const [n, setN] = useState(() => (reducedMotion() ? cmd.length : 0));
  const done = n >= cmd.length;
  const onDoneRef = useRef(onDone);
  onDoneRef.current = onDone;

  useEffect(() => {
    if (!seen || done) return undefined;
    // uneven keystroke timing reads as a person typing, not a machine
    const id = setTimeout(() => setN((k) => k + 1), 45 + Math.random() * 80);
    return () => clearTimeout(id);
  }, [seen, n, done]);

  useEffect(() => {
    if (!done) return undefined;
    const id = setTimeout(() => onDoneRef.current?.(), 250);
    return () => clearTimeout(id);
  }, [done]);

  return (
    <div ref={ref} className="prompt-line">
      <span className="prompt-path">
        {HOME}
        {path}&gt;
      </span>
      <span className="prompt-cmd">{cmd.slice(0, n)}</span>
      {seen && !done && <Cursor />}
    </div>
  );
}

/*
 * Streams paragraphs onto the screen the way `type` prints a file: quickly,
 * character by character, one paragraph after another, cursor at the end.
 */
export function StreamText({ paragraphs, start, cps = 600, className = "" }) {
  const total = paragraphs.reduce((a, p) => a + p.length + 1, 0);
  const [n, setN] = useState(() => (reducedMotion() ? total : 0));
  const done = n >= total;

  useEffect(() => {
    if (!start || done) return undefined;
    let raf;
    let last = performance.now();
    const tick = (now) => {
      const chars = Math.max(1, Math.round(((now - last) / 1000) * cps));
      last = now;
      setN((k) => Math.min(total, k + chars));
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [start, done, cps, total]);

  let remaining = n;
  return (
    <div className={className} aria-live="polite">
      {paragraphs.map((p, i) => {
        if (remaining <= 0) return null;
        const shown = p.slice(0, remaining);
        const isCurrent = remaining <= p.length;
        remaining -= p.length + 1;
        return (
          <p key={p.slice(0, 20)} className={i === 0 ? "bright" : ""}>
            {shown}
            {(isCurrent || (i === paragraphs.length - 1 && !done)) && <Cursor />}
          </p>
        );
      })}
    </div>
  );
}

const GLYPHS = "!<>-_\\/[]{}=+*^?#%&@$~;:.|";

/*
 * Renders a block of ASCII art that "decodes" into place when scrolled into
 * view: every non-space character starts as noise and settles left-to-right.
 */
export function Scramble({ text, className = "", as: Tag = "pre", delay = 0 }) {
  const [ref, seen] = useInView();
  const [out, setOut] = useState(() => (reducedMotion() ? text : mask(text)));

  useEffect(() => {
    if (!seen) return undefined;
    if (reducedMotion()) {
      setOut(text);
      return undefined;
    }
    const lines = text.split("\n");
    const width = Math.max(...lines.map((l) => l.length));
    const duration = 700;
    const start = performance.now() + delay;
    let raf;
    const tick = (now) => {
      const t = Math.min(1, Math.max(0, (now - start) / duration));
      // Sweep threshold across columns; jitter per row so it isn't a flat wipe.
      const cut = t * (width + 6);
      setOut(
        lines
          .map((line, r) =>
            line
              .split("")
              .map((ch, c) => {
                if (ch === " ") return ch;
                const edge = cut - ((r * 7) % 5);
                if (c < edge) return ch;
                return GLYPHS[(Math.random() * GLYPHS.length) | 0];
              })
              .join("")
          )
          .join("\n")
      );
      if (t < 1) raf = requestAnimationFrame(tick);
      else setOut(text);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [seen, text, delay]);

  return (
    <Tag ref={ref} className={`ascii ${className}`} aria-label={text}>
      {out}
    </Tag>
  );
}

function mask(text) {
  return text
    .split("")
    .map((ch) =>
      ch === " " || ch === "\n" ? ch : GLYPHS[(Math.random() * GLYPHS.length) | 0]
    )
    .join("");
}

/* Fade-and-rise into view (CSS driven). */
export function Reveal({ children, className = "", delay = 0 }) {
  const [ref, seen] = useInView();
  return (
    <div
      ref={ref}
      className={`reveal ${seen ? "reveal--in" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}
