import React from "react";
import { useTypewriter } from "react-simple-typewriter";
import { nameBanner } from "../ascii";
import { typewriterWords, links } from "../data";
import { Prompt, Cursor, Scramble } from "./primitives";
import { AsciiBackdrop } from "./AsciiArt";

export default function Hero() {
  const [text] = useTypewriter({
    words: typewriterWords,
    loop: true,
    typeSpeed: 80,
    deleteSpeed: 35,
    delaySpeed: 3000,
  });

  return (
    <section id="top" className="hero">
      <AsciiBackdrop art="stars" />
      <div className="hero-main">
        <Prompt cmd="welcome.bat" />
        <Scramble text={nameBanner} className="banner" as="h1" />
        <div className="hero-sub">
          <Prompt cmd="whoami" />
          <p className="typewriter" aria-live="polite">
            {text}
            <Cursor />
          </p>
        </div>
        <div className="hero-links">
          <a href="#about" className="btn">
            [ about ]
          </a>
          <a href="#projects" className="btn">
            [ projects ]
          </a>
          <a href={links.resume} target="_blank" rel="noopener noreferrer" className="btn">
            [ resume ]
          </a>
          <a href={links.email} className="btn">
            [ contact ]
          </a>
        </div>
        <p className="hint">
          tip: press <kbd>0</kbd>-<kbd>4</kbd> to jump between sections
        </p>
      </div>
    </section>
  );
}
