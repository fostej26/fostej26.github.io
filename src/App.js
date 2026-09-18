import React, { useCallback, useState } from "react";
import Boot from "./components/Boot";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import { About, Experience, Projects, Contact } from "./components/Sections";
import { AsciiStrip } from "./components/AsciiArt";

function App() {
  const [booted, setBooted] = useState(false);
  const onBooted = useCallback(() => setBooted(true), []);

  return (
    <>
      {!booted && <Boot onDone={onBooted} />}
      <div className="crt" aria-hidden="true" />
      <Nav />
      <main className={`terminal ${booted ? "terminal--on" : ""}`}>
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Contact />
      </main>
      {/* full-bleed rain, flush with the bottom of the page */}
      <AsciiStrip art="rain" rows={14} className="page-rain" />
    </>
  );
}

export default App;
