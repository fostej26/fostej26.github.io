import React, { useEffect, useState } from "react";
import { links } from "../data";

const sections = [
  { id: "about", label: "about", key: "1" },
  { id: "experience", label: "experience", key: "2" },
  { id: "projects", label: "projects", key: "3" },
  { id: "contact", label: "contact", key: "4" },
];

/* cmd.exe window title bar: icon + title on the left, sections in the middle,
   the usual minimise / maximise / close glyphs on the right. */
const readTheme = () => document.documentElement.getAttribute("data-theme") === "light";

export default function Nav() {
  const [active, setActive] = useState("");
  const [light, setLight] = useState(readTheme);

  // Invert colours; the label shows the current mode.
  const toggleTheme = () => {
    const next = !light;
    setLight(next);
    document.documentElement.setAttribute("data-theme", next ? "light" : "dark");
    try {
      localStorage.setItem("jf-theme", next ? "light" : "dark");
    } catch (e) {
      /* storage unavailable */
    }
  };

  useEffect(() => {
    const els = sections.map((s) => document.getElementById(s.id)).filter(Boolean);
    if (!("IntersectionObserver" in window)) return undefined;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-40% 0px -55% 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  // Number keys jump between sections.
  useEffect(() => {
    const onKey = (e) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const s = sections.find((x) => x.key === e.key);
      if (s) document.getElementById(s.id)?.scrollIntoView({ behavior: "smooth" });
      if (e.key === "0" || e.key === "`") window.scrollTo({ top: 0, behavior: "smooth" });
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <header className="titlebar" aria-label="Primary">
      <a href="#top" className="titlebar-title">
        <span className="titlebar-icon" aria-hidden="true">
          C:\_
        </span>
        <span className="titlebar-text">cmd.exe - Jacob Foster</span>
      </a>
      <nav className="titlebar-nav">
        {sections.map((s) => (
          <a
            key={s.id}
            href={`#${s.id}`}
            className={`titlebar-link ${active === s.id ? "is-active" : ""}`}
          >
            <span className="titlebar-key">{s.key}:</span>
            {s.label}
          </a>
        ))}
      </nav>
      <div className="titlebar-right">
        <button
          type="button"
          className="titlebar-link titlebar-btn"
          onClick={toggleTheme}
          aria-label={light ? "Switch to dark colours" : "Invert to light colours"}
          title="invert colours"
        >
          [ {light ? "light" : "dark"} ]
        </button>
        <a href={links.resume} target="_blank" rel="noopener noreferrer" className="titlebar-link">
          resume.pdf
        </a>
        <span className="titlebar-buttons" aria-hidden="true">
          <span>_</span>
          <span>□</span>
          <span>X</span>
        </span>
      </div>
    </header>
  );
}
