import React, { useEffect, useState } from "react";
import { bootLines, jfLogo } from "../ascii";
import { reducedMotion } from "./primitives";

const KEY = "jf-booted";

/*
 * Fake BIOS boot on first visit of the session: lines print one by one, a
 * progress bar fills, then the overlay drops away. Click or any key skips it.
 */
export default function Boot({ onDone }) {
  const [lines, setLines] = useState([]);
  const [progress, setProgress] = useState(0);
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    let skipped = false;
    try {
      skipped = sessionStorage.getItem(KEY) === "1";
    } catch (e) {
      /* storage unavailable: just play the boot */
    }
    if (skipped || reducedMotion()) {
      onDone();
      return undefined;
    }

    const timers = [];
    const finish = () => {
      try {
        sessionStorage.setItem(KEY, "1");
      } catch (e) {
        /* ignore */
      }
      setClosing(true);
      timers.push(setTimeout(onDone, 350));
    };

    bootLines.forEach((l, i) => {
      timers.push(setTimeout(() => setLines((p) => [...p, l]), 120 + i * 170));
    });
    const barStart = 120 + bootLines.length * 170;
    for (let p = 1; p <= 20; p++) {
      timers.push(setTimeout(() => setProgress(p), barStart + p * 35));
    }
    timers.push(setTimeout(finish, barStart + 20 * 35 + 350));

    const skip = () => {
      timers.forEach(clearTimeout);
      finish();
    };
    window.addEventListener("keydown", skip);
    window.addEventListener("pointerdown", skip);
    return () => {
      timers.forEach(clearTimeout);
      window.removeEventListener("keydown", skip);
      window.removeEventListener("pointerdown", skip);
    };
  }, [onDone]);

  const bar = "#".repeat(progress) + "-".repeat(20 - progress);

  return (
    <div className={`boot ${closing ? "boot--out" : ""}`} aria-live="polite">
      <div className="boot-inner">
        <pre className="ascii boot-logo">{jfLogo}</pre>
        <div className="boot-lines">
          {lines.map((l) => (
            <div key={l}>{l}</div>
          ))}
          {lines.length === bootLines.length && (
            <div>
              [{bar}] {progress * 5}%
            </div>
          )}
        </div>
        <div className="boot-hint">press any key to skip</div>
      </div>
    </div>
  );
}
