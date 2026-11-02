"use client";
import { useState } from "react";
import {
  ArrowDownRight,
  ArrowUpRight,
  Github,
  Linkedin,
  Mail,
  Layers,
  Code2,
  Cloud,
  Shield,
  ExternalLink,
  Check,
  Menu,
  X,
} from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { Architecture } from "@/components/architecture";
import { Terminal } from "@/components/terminal";
import { Contact } from "@/components/contact";
import { cases, notes } from "@/lib/content";
export default function Home() {
  const [openArticle, setOpenArticle] = useState<string | null>(null);
  const [menu, setMenu] = useState(false);
  const article = notes.find((n) => n.slug === openArticle);
  return (
    <main>
      <header className="site-header">
        <a className="wordmark" href="#home" aria-label="Zahraa Mahmood home">
          ZM<span className="wordmark-period">.</span>
          <span className="wordmark-label">ENGINEERING / PORTFOLIO</span>
        </a>
        <nav
          className={menu ? "nav-links menu-open" : "nav-links"}
          aria-label="Main navigation"
        >
          {[
            ["#work", "Work"],
            ["#expertise", "Expertise"],
            ["#lab", "Lab"],
            ["#notes", "Writing"],
            ["#contact", "Contact"],
          ].map(([href, label]) => (
            <a key={href} href={href} onClick={() => setMenu(false)}>
              {label}
            </a>
          ))}
        </nav>
        <div className="header-actions">
          <ThemeToggle />
          <a href="mailto:zahraamahmood222@gmail.com" className="header-cta">
            Let’s talk <ArrowUpRight size={15} />
          </a>
          <button
            className="menu-button"
            type="button"
            aria-label="Toggle navigation"
            aria-expanded={menu}
            onClick={() => setMenu(!menu)}
          >
            {menu ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>
      <section className="hero section-container" id="home">
        <div className="hero-main">
          <div className="eyebrow">
            <span className="small-orbit" /> BACKEND-FOCUSED FULL-STACK ENGINEER{" "}
            <span className="eyebrow-id">/ 001</span>
          </div>
          <h1>
            Building the
            <br />
            <span className="outlined">systems</span> behind
            <br />
            what’s next<span className="hero-dot">.</span>
          </h1>
          <div className="hero-footer">
            <div>
              <p>
                I'm <strong>Zahraa Mahmood</strong> — a software engineer
                crafting reliable backend services, thoughtful integrations, and
                cloud infrastructure on AWS.
              </p>
              <div className="hero-buttons">
                <a className="btn-primary" href="#work">
                  Explore my work <ArrowUpRight size={17} />
                </a>
                <a className="text-link" href="#contact">
                  Get in touch <ArrowDownRight size={16} />
                </a>
              </div>
            </div>
            <div className="hero-meta">
              <span>BASED IN</span>
              <strong>Mosul, Iraq</strong>
              <span>WORKING</span>
              <strong>Remotely · Worldwide</strong>
            </div>
          </div>
        </div>
        <div className="hero-decoration" aria-hidden="true">
          <div className="orb-ring orb-ring-one" />
          <div className="orb-ring orb-ring-two" />
          <div className="orb-center">
            <span>BUILD</span>
            <span>DESIGN</span>
            <span>OPERATE</span>
          </div>
          <span className="orb-coordinate top">35° 52′ N</span>
          <span className="orb-coordinate bottom">43° 07′ E</span>
        </div>
      </section>
      <div className="marquee" aria-label="Core technologies">
        <div className="marquee-inner">
          {[
            "NODE.JS",
            "TYPESCRIPT",
            "POSTGRESQL",
            "AWS CLOUD",
            "DOCKER",
            "REST APIS",
            "DISTRIBUTED FLOWS",
            "BACKEND ARCHITECTURE",
          ].map((x) => (
            <span key={x}>
              {x}
              <i>✳</i>
            </span>
          ))}
        </div>
      </div>
      <section className="section-container intro" id="expertise">
        <div className="section-side">
          <span className="section-index">01 / ABOUT</span>
          <div className="thin-line" />
        </div>
        <div className="intro-content">
          <h2>
            Engineering for the <em>real world.</em>
          </h2>
          <p className="lead">
            I work where product complexity meets technical responsibility:
            payments, subscriptions, content platforms, integrations, and cloud
            operations.
          </p>
          <div className="intro-bottom">
            <div>
              <span className="big-number">
                5<span>+</span>
              </span>
              <small>YEARS BUILDING SOFTWARE</small>
            </div>
            <p>
              I care about the details that make software dependable — clear
              APIs, consistent data, predictable failure handling, and systems
              the next engineer can understand. My work spans backend-heavy
              product development and hands-on AWS operations.
            </p>
          </div>
          <div className="specialties">
            <div>
              <Code2 />
              <strong>Backend systems</strong>
              <p>APIs, business logic, integrations, stateful workflows</p>
            </div>
            <div>
              <Cloud />
              <strong>AWS & infrastructure</strong>
              <p>Cloud services, deployments, troubleshooting, monitoring</p>
            </div>
            <div>
              <Shield />
              <strong>Production reliability</strong>
              <p>Webhooks, recovery flows, operational resilience</p>
            </div>
          </div>
        </div>
      </section>
      <section className="work-section" id="work">
        <div className="section-container">
          <div className="section-heading">
            <div>
              <span className="section-index">02 / SELECTED WORK</span>
              <h2>
                Complex problems.
                <br />
                <em>Considered solutions.</em>
              </h2>
            </div>
            <p>
              Selected professional engineering themes. These are high-level
              case studies, not public employer source code.
            </p>
          </div>
          <div className="case-list">
            {cases.map((item) => (
              <article className="case" key={item.num}>
                <div className="case-num">/{item.num}</div>
                <div className="case-content">
                  <div className="case-label">{item.label}</div>
                  <h3>{item.title}</h3>
                  <p className="case-summary">{item.summary}</p>
                  <div className="case-sub">
                    <div>
                      <span>THE CHALLENGE</span>
                      <p>{item.challenge}</p>
                    </div>
                    <div>
                      <span>ENGINEERING APPROACH</span>
                      <ul>
                        {item.approach.map((step) => (
                          <li key={step}>
                            <Check size={14} />
                            {step}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="chips">
                    {item.stack.map((s) => (
                      <span key={s}>{s}</span>
                    ))}
                  </div>
                  <p className="case-note">{item.note}</p>
                </div>
                <div className="case-mark">
                  <Layers size={33} />
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="section-container lab-section" id="lab">
        <div className="section-heading">
          <div>
            <span className="section-index">03 / SYSTEMS LAB</span>
            <h2>
              Under the <em>hood.</em>
            </h2>
          </div>
          <p>
            An interactive look at how I reason about reliable backend systems.
            Click through a conceptual service architecture or explore the
            terminal.
          </p>
        </div>
        <Architecture />
        <div className="lab-bottom">
          <div>
            <span className="section-index">A SMALL INTERACTIVE DETAIL</span>
            <h3>
              Curiosity is
              <br />a feature.
            </h3>
            <p>
              Prefer a command line? There's one here, too. Try{" "}
              <code>help</code>, <code>stack</code>, or <code>projects</code>.
            </p>
          </div>
          <Terminal />
        </div>
      </section>
      <section className="notes-section" id="notes">
        <div className="section-container">
          <div className="section-heading">
            <div>
              <span className="section-index">04 / ENGINEERING NOTES</span>
              <h2>
                Notes from
                <br />
                <em>the backend.</em>
              </h2>
            </div>
            <p>
              Short technical reflections on systems, trade-offs, and lessons
              from building for production.
            </p>
          </div>
          <div className="notes-grid">
            {notes.map((n, i) => (
              <button
                type="button"
                className="note-card"
                key={n.slug}
                onClick={() => setOpenArticle(n.slug)}
              >
                <div className="note-top">
                  <span>{n.category}</span>
                  <ArrowUpRight size={20} />
                </div>
                <span className="note-index">0{i + 1}</span>
                <h3>{n.title}</h3>
                <p>{n.intro}</p>
                <span className="note-bottom">
                  {n.minutes} <span>READ ARTICLE ↗</span>
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>
      <section className="contact-section section-container" id="contact">
        <div>
          <span className="section-index">05 / CONTACT</span>
          <h2>
            Let’s build
            <br />
            <em>something meaningful.</em>
          </h2>
          <p>
            Working on a challenging backend problem, looking for a senior
            engineer, or want to talk architecture? I’d love to hear from you.
          </p>
          <div className="contact-direct">
            <a href="mailto:zahraamahmood222@gmail.com">
              <Mail size={18} />
              zahraamahmood222@gmail.com <ArrowUpRight size={16} />
            </a>
            <a
              href="https://github.com/ZahraaMahmood"
              target="_blank"
              rel="noreferrer"
            >
              <Github size={18} />
              GitHub <ArrowUpRight size={16} />
            </a>
          </div>
        </div>
        <Contact />
      </section>
      <footer className="footer section-container">
        <span>
          ZM<span className="hero-dot">.</span> © {new Date().getFullYear()}
        </span>
        <span>BUILT WITH CURIOSITY, INTENTION & CODE.</span>
        <a href="#home">BACK TO TOP ↑</a>
      </footer>
      {article && (
        <div className="modal-backdrop" onClick={() => setOpenArticle(null)}>
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="article-title"
            className="article-dialog"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="close-dialog"
              aria-label="Close article"
              onClick={() => setOpenArticle(null)}
            >
              <X />
            </button>
            <span className="section-index">
              {article.category} · {article.minutes}
            </span>
            <h2 id="article-title">{article.title}</h2>
            <p className="article-lead">{article.intro}</p>
            {article.body.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
            <button className="text-link" onClick={() => setOpenArticle(null)}>
              ← Back to portfolio
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
