import React, { useState } from "react";
import { about, experience, projects, links } from "../data";
import { sectionBanners, companyLogos, projectIcons, jfLogo } from "../ascii";
import { Prompt, Cursor, Scramble, Reveal, HOME, TypedPrompt, StreamText } from "./primitives";
import { AsciiFigure } from "./AsciiArt";

function SectionHeader({ id, cmd, path }) {
  return (
    <div className="section-head">
      <Prompt cmd={cmd} path={path} />
      <Scramble text={sectionBanners[id]} as="h2" className="section-banner" />
    </div>
  );
}

/* The command is typed out when the section scrolls in, then the file "prints". */
export function About() {
  const [typed, setTyped] = useState(false);
  return (
    <section id="about" className="section">
      <div className="section-head">
        <TypedPrompt cmd="type about.txt" onDone={() => setTyped(true)} />
        {typed && <Scramble text={sectionBanners.about} as="h2" className="section-banner" />}
      </div>
      <div className="about-grid">
        <StreamText paragraphs={about} start={typed} className="about-body" />
        <div className={`about-figure ${typed ? "about-figure--on" : ""}`}>
          <AsciiFigure art="kickups" />
          <span className="dim">me.obj</span>
        </div>
      </div>
    </section>
  );
}

/* Mimics the `dir` output format of cmd.exe. */
function dirListing(dir, entries) {
  const rows = entries.map((e) => `${e.stamp.padEnd(30)}<DIR>     ${e.name}`);
  return [
    " Volume in drive C is PORTFOLIO",
    ` Directory of ${HOME}\\${dir}`,
    "",
    ...rows,
    `${String(0).padStart(16)} File(s)              0 bytes`,
    `${String(entries.length).padStart(16)} Dir(s)`,
  ].join("\n");
}

export function Experience() {
  return (
    <section id="experience" className="section">
      <SectionHeader id="experience" cmd="dir" path={"\\experience"} />
      <Reveal>
        <pre className="ascii listing">
          {dirListing(
            "experience",
            experience.map((j) => ({ stamp: j.dates, name: j.id }))
          )}
        </pre>
      </Reveal>
      <div className="stack">
        {experience.map((job, i) => (
          <Reveal key={job.id} delay={i * 80}>
            <article className="box">
              <div className="box-title">[ {job.id}\ ]</div>
              <div className="job-head">
                <a
                  href={job.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="logo-link"
                  aria-label={job.company}
                >
                  <pre className="ascii logo">{companyLogos[job.id]}</pre>
                </a>
                <div className="job-meta">
                  <h3 className="bright">{job.role}</h3>
                  <div>
                    <a href={job.url} target="_blank" rel="noopener noreferrer" className="link">
                      {job.company}
                    </a>
                  </div>
                  <div className="dim">{job.dates}</div>
                </div>
              </div>
              <ul className="bullets">
                {job.bullets.map((b) => (
                  <li key={b.slice(0, 30)}>{b}</li>
                ))}
              </ul>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export function Projects() {
  const tree = [
    "Folder PATH listing for volume PORTFOLIO",
    `${HOME.toUpperCase()}\\PROJECTS`,
    ...projects.map((p, i) => `${i === projects.length - 1 ? "└───" : "├───"}${p.title}`),
  ].join("\n");
  return (
    <section id="projects" className="section">
      <SectionHeader id="projects" cmd="tree" path={"\\projects"} />
      <Reveal>
        <pre className="ascii listing">{tree}</pre>
      </Reveal>
      <div className="grid">
        {projects.map((p, i) => (
          <Reveal key={p.id} delay={(i % 3) * 80} className="grid-item">
            <a href={p.url} target="_blank" rel="noopener noreferrer" className="box card">
              <div className="box-title">[ {p.id}.exe ]</div>
              <pre className="ascii icon" aria-hidden="true">
                {projectIcons[p.id]}
              </pre>
              <h3 className="bright">{p.title}</h3>
              <p>{p.description}</p>
              <span className="card-link">
                &gt; open on {p.linkLabel} <span className="card-arrow">-&gt;</span>
              </span>
            </a>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

const contacts = [
  { label: "linkedin", href: links.linkedin, text: "linkedin.com/in/jacobnfoster", ext: true },
  { label: "github", href: links.github, text: "github.com/fostej26", ext: true },
  { label: "resume", href: links.resume, text: "Jacob-Foster-Resume.pdf", ext: true },
  { label: "email", href: links.email, text: "fostej26@mcmaster.ca", ext: false },
];

export function Contact() {
  return (
    <footer id="contact" className="section">
      <SectionHeader id="contact" cmd="type contact.txt" />
      <Reveal>
        <div className="contact-grid">
          <div className="contact-list">
            {contacts.map((c) => (
              <div key={c.label} className="contact-row">
                <span className="dim">{c.label.padEnd(9, ".")}</span>
                <a
                  href={c.href}
                  className="link"
                  {...(c.ext ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                >
                  {c.text}
                </a>
              </div>
            ))}
          </div>
          <pre className="ascii logo-footer" aria-hidden="true">
            {jfLogo}
          </pre>
        </div>
      </Reveal>
      <Reveal className="footer-meta">
        <Prompt cmd="type colophon.txt" />
        <p className="dim">Built from scratch using React.js and TailwindCSS</p>
        <p className="dim">Copyright &copy; Jacob Foster 2026</p>
        <Prompt cmd="">
          <Cursor />
        </Prompt>
      </Reveal>
    </footer>
  );
}
