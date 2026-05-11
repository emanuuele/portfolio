"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import styles from "./page.module.css";
import Chat from "./components/chat";
import techsData from "../techs/techs.json";
import { ChatMessage, Techs } from "@/type/techs";
import RoadMapSection from "./RoadMapSection";

// ─────────────────────────────────────────────
// BOXICONS — Componente wrapper
// ─────────────────────────────────────────────
function Bx({
  name,
  className,
  style,
}: {
  name: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <i
      className={`bx ${name}${className ? " " + className : ""}`}
      style={style}
      aria-hidden="true"
    />
  );
}

// ─────────────────────────────────────────────
// DADOS
// ─────────────────────────────────────────────
const TECHS: Techs[] = [
  "NEXT_JS", "REACT", "TYPESCRIPT", "JAVASCRIPT",
  "NODE_JS", "SPRING_BOOT", "JAVA",
  "PHP", "LARAVEL", "CODEIGNITER",
  "REACT_NATIVE", "DOCKER",
  "POSTGRESQL", "MYSQL",
];

const TECH_LABELS: Record<Techs, string> = {
  SPRING_BOOT: "Spring Boot", REACT: "React", NODE_JS: "Node.js",
  DOCKER: "Docker", TYPESCRIPT: "TypeScript", JAVA: "Java",
  JAVASCRIPT: "JavaScript", REACT_NATIVE: "React Native", MYSQL: "MySQL",
  POSTGRESQL: "PostgreSQL", LARAVEL: "Laravel", PHP: "PHP",
  CODEIGNITER: "CodeIgniter", NEXT_JS: "Next.js",
};

const PROJECTS = [
  {
    id: "ttravel",
    title: "TTRAVEL",
    description: "Calcula o custo de combustível em viagens, integrando APIs do IBGE e OpenRouteService.",
    image: "/ttravel.png",
    link: "https://ttravelling.netlify.app/",
    tags: ["Next.js", "IBGE API", "OpenRouteService"],
    icon: "bx-map-alt",
  },
  {
    id: "academia",
    title: "Ah, cadê mia?",
    description: "Sistema de gerenciamento de academia com controle de alunos, planos e pagamentos.",
    image: "/academia.png",
    link: "https://front-academia-augusto.vercel.app/",
    tags: ["React.js", "Node.js", "PostgreSQL"],
    icon: "bx-dumbbell",
  },
  {
    id: "blog",
    title: "Blog",
    description: "Projeto completo de blog com painel administrativo, autenticação JWT e CRUD.",
    image: "/blog.png",
    link: "https://blog-3bk5.onrender.com/",
    tags: ["Node.js", "Express", "Auth"],
    icon: "bx-pencil",
  },
  {
    id: "portfolio",
    title: "Portfólio",
    description: "Este portfólio — desenvolvido com Next.js e TypeScript, foco em performance e SEO.",
    image: "/portfolio.png",
    link: "#",
    tags: ["Next.js", "TypeScript", "CSS Modules"],
    icon: "bx-briefcase",
  },
];

const ROADMAP = [
  {
    year: "2019",
    title: "O primeiro passo",
    description: "Início do curso Técnico em Informática no IFPE de Garanhuns. O começo de tudo.",
    icon: "bx-leaf",
    highlight: false,
    side: "right",
  },
  {
    year: "2022",
    title: "Diploma conquistado",
    description: "Conclusão e obtenção do diploma de Técnica em Informática pelo IFPE.",
    icon: "bxs-graduation",
    highlight: false,
    side: "left",
  },
  {
    year: "Jan 2023",
    title: "Primeira oportunidade",
    description: "Conquista da primeira oportunidade de estágio na área — o sonho começando a se tornar realidade.",
    icon: "bx-briefcase-alt-2",
    highlight: false,
    side: "right",
  },
  {
    year: "Ago 2023",
    title: "Engenharia de Software",
    description: "Início da graduação em Engenharia de Software na UPE de Surubim.",
    icon: "bxs-school",
    highlight: false,
    side: "left",
  },
  {
    year: "2024",
    title: "Produção Acadêmica",
    description: 'Escrita do artigo "A utopia do mercado: Relação entre o mercado de trabalho e a empregabilidade do profissional de tecnologia".',
    icon: "bx-file",
    highlight: false,
    side: "right",
  },
  {
    year: "Abr 2024",
    title: "Desenvolvedora JR efetivada",
    description: "Efetivação como Desenvolvedora Júnior — um marco de crescimento e reconhecimento profissional.",
    icon: "bx-rocket",
    highlight: false,
    side: "left",
  },
  {
    year: "2026",
    title: "Excelência técnica",
    description: "Homologação aprovada na Stone pela empresa atual — marco de excelência técnica e maturidade como desenvolvedora.",
    icon: "bxs-star",
    highlight: true,
    side: "right",
  },
];

const CERTS = [
  { id: "cert1", label: "Certificado 1", file: "/cert1.jpg" },
  { id: "cert2", label: "Certificado 2", file: "/cert2.jpg" },
  { id: "cert3", label: "Certificado 3", file: "/cert3.jpg" },
];

// ─────────────────────────────────────────────
// EMABOT — Respostas & opções
// ─────────────────────────────────────────────
const BOT_ANSWERS: Record<string, string> = {
  projetos: "Tenho 4 projetos no portfólio: TTRAVEL (cálculo de viagens), Ah, cadê mia? (gestão de academia), um Blog completo e este próprio Portfólio!",
  techs: "Trabalho com React, Next.js, TypeScript, Node.js, Spring Boot, Java, Docker, PostgreSQL e muito mais! Explore a seção de Techs acima.",
  contato: "Você pode me encontrar no LinkedIn (emanuelemds), GitHub (emanuuele) ou enviar um e-mail para emanuele.mdsilva@gmail.com",
  sobre: "Sou a Emanuele! Desenvolvedora Full-Stack desde 2019, formada técnica pelo IFPE e cursando Engenharia de Software na UPE. Amo transformar ideias em código!",
  curriculo: 'Você pode baixar meu currículo pelo botão "Baixar Currículo" no header ou na seção Hero. O HTML é convertido em PDF com Puppeteer na hora.',
  ola: "Olá! Sou a EmaBot, assistente da Emanuele. Como posso te ajudar a conhecer melhor o trabalho dela?",
};

const BOT_OPTIONS = [
  { label: "Projetos", key: "projetos", icon: "bx-folder-open" },
  { label: "Techs", key: "techs", icon: "bx-code-alt" },
  { label: "Contato", key: "contato", icon: "bx-envelope" },
  { label: "Sobre ela", key: "sobre", icon: "bx-user" },
  { label: "Currículo", key: "curriculo", icon: "bx-file-blank" },
];

// ─────────────────────────────────────────────
// COMPONENTES UTILITÁRIOS
// ─────────────────────────────────────────────
function SectionLabel({ children }: { children: React.ReactNode }) {
  return <p className={styles.sectionLabel}>{children}</p>;
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h2 className={styles.sectionTitle}>{children}</h2>;
}

function BtnPrimary({
  href, onClick, children, download,
}: {
  href?: string; onClick?: () => void; children: React.ReactNode; download?: boolean;
}) {
  if (href) {
    return (
      <a
        href={href}
        className={styles.btnPrimary}
        download={download || undefined}
        target={!download ? "_blank" : undefined}
        rel="noopener noreferrer"
      >
        {children}
      </a>
    );
  }
  return <button onClick={onClick} className={styles.btnPrimary}>{children}</button>;
}

function BtnSecondary({
  href, onClick, children, download,
}: {
  href?: string; onClick?: () => void; children: React.ReactNode; download?: boolean;
}) {
  if (href) {
    return (
      <a
        href={href}
        className={styles.btnSecondary}
        download={download || undefined}
        target={!download ? "_blank" : undefined}
        rel="noopener noreferrer"
      >
        {children}
      </a>
    );
  }
  return <button onClick={onClick} className={styles.btnSecondary}>{children}</button>;
}

// ─────────────────────────────────────────────
// HOOK — Dark Mode
// ─────────────────────────────────────────────
function useDarkMode() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    const isDark = saved === "dark";
    setDark(isDark);
    document.documentElement.setAttribute("data-theme", isDark ? "dark" : "light");
  }, []);

  const toggle = useCallback(() => {
    setDark((prev) => {
      const next = !prev;
      document.documentElement.setAttribute("data-theme", next ? "dark" : "light");
      localStorage.setItem("theme", next ? "dark" : "light");
      return next;
    });
  }, []);

  return { dark, toggle };
}

// ─────────────────────────────────────────────
// HOOK — Typing effect
// ─────────────────────────────────────────────
const PHRASES = [
  "Desenvolvedora Full-Stack",
  "Engenheira de Software",
  "Apaixonada por código",
  "React & Spring Boot Dev",
];

function useTyping() {
  const [text, setText] = useState("");
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const phrase = PHRASES[phraseIdx];
    const speed = deleting ? 40 : 80;
    const timer = setTimeout(() => {
      if (!deleting) {
        if (charIdx < phrase.length) {
          setText(phrase.slice(0, charIdx + 1));
          setCharIdx(charIdx + 1);
        } else {
          setTimeout(() => setDeleting(true), 1800);
        }
      } else {
        if (charIdx > 0) {
          setText(phrase.slice(0, charIdx - 1));
          setCharIdx(charIdx - 1);
        } else {
          setDeleting(false);
          setPhraseIdx((i) => (i + 1) % PHRASES.length);
        }
      }
    }, speed);
    return () => clearTimeout(timer);
  }, [charIdx, deleting, phraseIdx]);

  return text;
}

// ─────────────────────────────────────────────
// HEADER
// ─────────────────────────────────────────────
function Header({ dark, toggleDark }: { dark: boolean; toggleDark: () => void }) {
  const [open, setOpen] = useState(false);

  const nav = [
    { label: "Sobre", href: "#sobre" },
    { label: "Techs", href: "#techs" },
    { label: "Trajetória", href: "#roadmap" },
    { label: "Projetos", href: "#projetos" },
    { label: "Contato", href: "#contato" },
  ];

  return (
    <>
      <header className={styles.header}>
        <a href="#" className={styles.logo}>
          ema<span>.</span>dev
        </a>
        <nav className={styles.nav}>
          <ul className={styles.navLinks}>
            {nav.map((item) => (
              <li key={item.href}>
                <a href={item.href} className={styles.navLink}>{item.label}</a>
              </li>
            ))}
          </ul>
          <div className={styles.headerActions}>
            <button
              className={styles.themeToggle}
              onClick={toggleDark}
              aria-label="Alternar tema"
            >
              <Bx name={dark ? "bx-sun" : "bx-moon"} style={{ fontSize: "1.2rem" }} />
            </button>
            <a
              href="/api/curriculo"
              download
              className={styles.btnPrimary}
              style={{ fontSize: "0.82rem", padding: "9px 18px" }}
            >
              <Bx name="bx-download" /> Currículo
            </a>
            <button
              className={`${styles.hamburger} ${open ? styles.hamburgerOpen : ""}`}
              onClick={() => setOpen(!open)}
              aria-label="Menu"
            >
              <span /><span /><span />
            </button>
          </div>
        </nav>
      </header>

      <div className={`${styles.mobileMenu} ${open ? styles.mobileMenuOpen : ""}`}>
        {nav.map((item) => (
          <a
            key={item.href}
            href={item.href}
            className={styles.mobileNavLink}
            onClick={() => setOpen(false)}
          >
            {item.label}
          </a>
        ))}
        <a
          href="/api/curriculo"
          download
          className={styles.btnPrimary}
          onClick={() => setOpen(false)}
        >
          <Bx name="bx-download" /> Baixar Currículo
        </a>
      </div>
    </>
  );
}

// ─────────────────────────────────────────────
// HERO
// ─────────────────────────────────────────────
function HeroSection() {
  const typed = useTyping();

  return (
    <section className={styles.hero} id="inicio">
      <div className={styles.heroBg} />
      <div className={styles.heroInner}>
        <div className={styles.heroContent}>
          <span className={styles.heroGreeting}>
            <Bx name="bx-wave" /> Olá, mundo!
          </span>
          <h1 className={styles.heroTitle}>
            Sou <em>Emanuele</em><br />Maria
          </h1>
          <p className={styles.heroSubtitle}>
            {typed}
            <span className={styles.typingCursor} />
          </p>
          <p className={styles.heroDesc}>
            Transformo ideias em interfaces elegantes e sistemas robustos.
            Full-Stack desde 2019, com paixão por React, Spring Boot e boas práticas.
          </p>
          <div className={styles.heroCTAs}>
            <BtnPrimary href="#projetos">
              Ver Projetos <Bx name="bx-right-arrow-alt" />
            </BtnPrimary>
            <BtnSecondary href="/api/curriculo" download>
              <Bx name="bx-download" /> Baixar Currículo
            </BtnSecondary>
          </div>
        </div>

        <div className={styles.heroImage}>
          <div className={styles.heroImageRing}>
            <div className={styles.heroPhotoPh}>EM</div>
            <div className={`${styles.heroBadge} ${styles.heroBadge1}`}>
              <span className={styles.heroBadgeDot} />
              Disponível para projetos
            </div>
            <div className={`${styles.heroBadge} ${styles.heroBadge2}`}>
              <Bx name="bxs-trophy" style={{ color: "var(--pink-vivid)", fontSize: "1rem" }} />
              7+ anos codando
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────
// SOBRE
// ─────────────────────────────────────────────
function SobreSection() {
  return (
    <section className={styles.sobre} id="sobre" style={{ padding: "clamp(80px,10vw,130px) 0" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 clamp(20px,5vw,60px)" }}>
        <SectionLabel>Quem sou eu</SectionLabel>
        <div className={styles.sobreGrid}>
          <div className={styles.sobreText}>
            <SectionTitle>Código, <em>paixão</em> & propósito</SectionTitle>
            <p>
              Lembro da primeira entrevista com meu primeiro chefe: ele me perguntou onde eu queria
              chegar e eu disse <strong>"quero ser programadora Full-Stack"</strong>. Posso dizer que
              atingi esse objetivo.
            </p>
            <p>
              Comecei a programar em 2019, quando entrei no IFPE de Garanhuns no curso Técnico de
              Informática. Hoje sou desenvolvedora e curso Engenharia de Software na UPE de Surubim —
              sempre em busca de novas fronteiras.
            </p>
            <p>
              Acredito que bom código é aquele que resolve problemas reais com clareza, elegância e
              responsabilidade. Cada projeto é uma oportunidade de aprender e crescer.
            </p>
            <div className={styles.sobreStats}>
              {[
                { n: "7+", l: "Anos codando" },
                { n: "14", l: "Tecnologias" },
                { n: "4+", l: "Projetos" },
                { n: "1", l: "Artigo publicado" },
              ].map((s) => (
                <div key={s.l} className={styles.statCard}>
                  <span className={styles.statNumber}>{s.n}</span>
                  <span className={styles.statLabel}>{s.l}</span>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.sobreVisual}>
            <div className={styles.sobreCard}>
              <SectionLabel>Formação</SectionLabel>
              <div className={styles.sobreFormacao}>
                {[
                  { icon: "bxs-school", title: "Técnico em Informática", desc: "IFPE — Garanhuns\n2019 – 2022" },
                  { icon: "bxs-graduation", title: "Engenharia de Software", desc: "UPE — Surubim\n2023 – Em andamento" },
                  { icon: "bx-file", title: "Produção Acadêmica", desc: '"A utopia do mercado" — 2024' },
                ].map((f) => (
                  <div key={f.title} className={styles.formacaoItem}>
                    <div className={styles.formacaoIcon}>
                      <Bx name={f.icon} style={{ fontSize: "1.3rem" }} />
                    </div>
                    <div className={styles.formacaoInfo}>
                      <h4>{f.title}</h4>
                      <p style={{ whiteSpace: "pre-line" }}>{f.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────
// TECHS
// ─────────────────────────────────────────────
function TechsSection() {
  const [selected, setSelected] = useState<Techs | null>(null);

  return (
    <section id="techs" style={{ padding: "clamp(80px,10vw,130px) 0", background: "var(--bg-primary)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 clamp(20px,5vw,60px)" }}>
        <SectionLabel>Stack tecnológica</SectionLabel>
        <SectionTitle>Ferramentas que <em>domino</em></SectionTitle>
        <p style={{ color: "var(--text-muted)", fontSize: "0.95rem", marginBottom: 8 }}>
          Clique em qualquer tecnologia para saber como a utilizo.
        </p>

        <div className={styles.techGrid}>
          {TECHS.map((tech) => (
            <div
              key={tech}
              className={`${styles.techCard} ${selected === tech ? styles.techCardActive : ""}`}
              onClick={() => setSelected(selected === tech ? null : tech)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === "Enter" && setSelected(selected === tech ? null : tech)}
              aria-pressed={selected === tech}
            >
              <img
                src={tech === "NEXT_JS" ? "/next_js.svg" : `/${tech.toLowerCase()}.png`}
                alt={TECH_LABELS[tech]}
                className={styles.techCardIcon}
                onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
              />
              <span className={styles.techCardName}>{TECH_LABELS[tech]}</span>
            </div>
          ))}
        </div>

        {selected && (
          <div className={styles.techDesc}>
            <button
              className={styles.techDescClose}
              onClick={() => setSelected(null)}
              aria-label="Fechar"
            >
              <Bx name="bx-x" style={{ fontSize: "1.1rem" }} />
            </button>
            <h3 className={styles.techDescTitle}>{TECH_LABELS[selected]}</h3>
            <p className={styles.techDescText}>{(techsData as Record<string, string>)[selected]}</p>
          </div>
        )}
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────
// PROJETOS
// ─────────────────────────────────────────────
function ProjectsSection() {
  return (
    <section id="projetos" style={{ padding: "clamp(80px,10vw,130px) 0", background: "var(--bg-primary)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 clamp(20px,5vw,60px)" }}>
        <SectionLabel>Portfólio</SectionLabel>
        <SectionTitle>Projetos que <em>constroí</em></SectionTitle>

        <div className={styles.projectGrid}>
          {PROJECTS.map((project) => (
            <div key={project.id} className={styles.projectCard}>
              <div className={styles.projectImageWrap}>
                <div className={styles.projectImgPh}>
                  <Bx name={project.icon} style={{ fontSize: "3.5rem", color: "var(--pink-soft)" }} />
                </div>
              </div>
              <div className={styles.projectBody}>
                <h3 className={styles.projectTitle}>{project.title}</h3>
                <p className={styles.projectDesc}>{project.description}</p>
                <div className={styles.projectTags}>
                  {project.tags.map((tag) => (
                    <span key={tag} className={styles.projectTag}>{tag}</span>
                  ))}
                </div>
              </div>
              <div className={styles.projectFooter}>
                {project.link !== "#" ? (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.btnPrimary}
                    style={{ fontSize: "0.82rem" }}
                  >
                    Ver projeto <Bx name="bx-link-external" />
                  </a>
                ) : (
                  <span className={styles.btnGhost}>
                    <Bx name="bx-check-circle" /> você já está aqui
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────
// CERTIFICADOS
// ─────────────────────────────────────────────
function CertsSection() {
  const [lightbox, setLightbox] = useState<string | null>(null);

  return (
    <section id="certificados" style={{ padding: "clamp(80px,10vw,130px) 0", background: "var(--bg-secondary)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 clamp(20px,5vw,60px)" }}>
        <SectionLabel>Conquistas</SectionLabel>
        <SectionTitle>Certificados & <em>reconhecimentos</em></SectionTitle>

        <div className={styles.certGrid}>
          {CERTS.map((cert) => (
            <div
              key={cert.id}
              className={styles.certCard}
              onClick={() => setLightbox(cert.file)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === "Enter" && setLightbox(cert.file)}
              aria-label={`Abrir ${cert.label}`}
            >
              <div className={styles.certPlaceholder}>
                <Bx name="bxs-medal" className={styles.certIcon} />
                <span>{cert.label}</span>
                <span style={{ fontSize: "0.76rem", opacity: 0.7, display: "flex", alignItems: "center", gap: 4 }}>
                  <Bx name="bx-zoom-in" /> Clique para ampliar
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {lightbox && (
        <div className={styles.lightbox} onClick={() => setLightbox(null)}>
          <div className={styles.lightboxInner} onClick={(e) => e.stopPropagation()}>
            <button className={styles.lightboxClose} onClick={() => setLightbox(null)}>
              <Bx name="bx-x" style={{ fontSize: "1.3rem" }} />
            </button>
            <img
              src={lightbox}
              alt="Certificado"
              className={styles.lightboxImg}
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300'%3E%3Crect width='400' height='300' fill='%23f5d0e2'/%3E%3C/svg%3E";
              }}
            />
          </div>
        </div>
      )}
    </section>
  );
}

// ─────────────────────────────────────────────
// EMABOT
// ─────────────────────────────────────────────
function EmaBot() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      from: "bot",
      text: "Olá! Sou a EmaBot, assistente da Emanuele. Escolha um tópico ou escreva sua dúvida!",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const addMessage = (from: "user" | "bot", text: string) => {
    setMessages((prev) => [...prev, { id: Date.now().toString(), from, text, timestamp: new Date() }]);
  };

  const handleOption = (key: string, label: string) => {
    addMessage("user", label);
    setTimeout(() => addMessage("bot", BOT_ANSWERS[key] || "Hmm, não tenho uma resposta para isso ainda!"), 500);
  };

  const handleSend = () => {
    const text = input.trim();
    if (!text) return;
    addMessage("user", text);
    setInput("");
    setTimeout(() => {
      const lower = text.toLowerCase();
      const key = Object.keys(BOT_ANSWERS).find((k) => lower.includes(k));
      if (key) addMessage("bot", BOT_ANSWERS[key]);
      else if (lower.match(/ola|oi|olá|hey|hi/)) addMessage("bot", BOT_ANSWERS["ola"]);
      else addMessage("bot", "Pode me perguntar sobre projetos, techs, contato ou trajetória!");
    }, 600);
  };

  const fmt = (d: Date) => d.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });

  return (
    <div className={styles.chatWrap}>
      <div className={styles.chatHeader}>
        <div className={styles.chatAvatar}>
          <Bx name="bx-bot" style={{ fontSize: "1.5rem", color: "#fff" }} />
        </div>
        <div className={styles.chatHeaderInfo}>
          <h4>EmaBot</h4>
          <p>Assistente da Emanuele &bull; Online</p>
        </div>
      </div>

      <div className={styles.chatMessages}>
        {messages.map((msg) => (
          <div key={msg.id}>
            <div className={`${styles.chatBubble} ${msg.from === "bot" ? styles.chatBubbleBot : styles.chatBubbleUser}`}>
              {msg.text}
              <span className={styles.chatTime}>{fmt(msg.timestamp)}</span>
            </div>
            {msg.from === "bot" && msg.id === "1" && (
              <div className={styles.chatOptions}>
                {BOT_OPTIONS.map((opt) => (
                  <button
                    key={opt.key}
                    className={styles.chatOptionBtn}
                    onClick={() => handleOption(opt.key, opt.label)}
                  >
                    <Bx name={opt.icon} /> {opt.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className={styles.chatInputRow}>
        <input
          className={styles.chatInput}
          placeholder="Escreva sua mensagem..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button className={styles.chatSendBtn} onClick={handleSend} aria-label="Enviar">
          <Bx name="bx-send" style={{ fontSize: "1.1rem" }} />
        </button>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// CONTATO
// ─────────────────────────────────────────────
function ContactSection() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sent" | "error">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
      return;
    }
    setStatus("sent");
    setForm({ name: "", email: "", message: "" });
    setTimeout(() => setStatus("idle"), 4000);
  };

  const socials = [
    { label: "LinkedIn", href: "https://www.linkedin.com/in/emanuelemds/", icon: "bxl-linkedin" },
    { label: "GitHub", href: "https://github.com/emanuuele", icon: "bxl-github" },
    { label: "Instagram", href: "https://www.instagram.com/emanuelecode/", icon: "bxl-instagram" },
    { label: "E-mail", href: "mailto:emanuele.mdsilva@gmail.com", icon: "bx-envelope" },
  ];

  return (
    <section id="contato" style={{ padding: "clamp(80px,10vw,130px) 0", background: "var(--bg-primary)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 clamp(20px,5vw,60px)" }}>
        <SectionLabel>Vamos conversar</SectionLabel>
        <SectionTitle>Entre em <em>contato</em></SectionTitle>

        <div className={styles.contactGrid}>
          <div>
            <form onSubmit={handleSubmit} className={styles.contactForm} noValidate>
              <div className={styles.inputGroup}>
                <label className={styles.inputLabel}>Nome</label>
                <input className={styles.input} placeholder="Seu nome completo" value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })} />
              </div>
              <div className={styles.inputGroup}>
                <label className={styles.inputLabel}>E-mail</label>
                <input className={styles.input} type="email" placeholder="seu@email.com" value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })} />
              </div>
              <div className={styles.inputGroup}>
                <label className={styles.inputLabel}>Mensagem</label>
                <textarea className={styles.textarea} placeholder="Conte-me sobre seu projeto ou oportunidade..."
                  value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
              </div>

              {status === "sent" && (
                <div style={{ padding: "12px 16px", background: "var(--pink-pale)", borderRadius: "var(--radius-md)", color: "var(--pink-vivid)", fontSize: "0.9rem", fontWeight: 600, display: "flex", alignItems: "center", gap: 8 }}>
                  <Bx name="bx-check-circle" /> Mensagem enviada! Responderei em breve.
                </div>
              )}
              {status === "error" && (
                <div style={{ padding: "12px 16px", background: "#fee2e2", borderRadius: "var(--radius-md)", color: "#dc2626", fontSize: "0.9rem", fontWeight: 600, display: "flex", alignItems: "center", gap: 8 }}>
                  <Bx name="bx-error" /> Preencha todos os campos antes de enviar.
                </div>
              )}

              <button type="submit" className={styles.btnPrimary} style={{ alignSelf: "flex-start" }}>
                Enviar mensagem <Bx name="bx-send" />
              </button>
            </form>

            <div style={{ marginTop: 32, display: "flex", flexWrap: "wrap", gap: 12 }}>
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target={s.href.startsWith("mailto") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  className={styles.btnGhost}
                >
                  <Bx name={s.icon} /> {s.label}
                </a>
              ))}
            </div>
          </div>

          <EmaBot />
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────
// FOOTER
// ─────────────────────────────────────────────
function Footer() {
  const links = [
    { label: "LinkedIn", href: "https://www.linkedin.com/in/emanuelemds/", icon: "bxl-linkedin" },
    { label: "GitHub", href: "https://github.com/emanuuele", icon: "bxl-github" },
    { label: "Instagram", href: "https://www.instagram.com/emanuelecode/", icon: "bxl-instagram" },
    { label: "E-mail", href: "mailto:emanuele.mdsilva@gmail.com", icon: "bx-envelope" },
  ];

  return (
    <footer className={styles.footer}>
      <div className={styles.footerInner}>
        <p style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", color: "var(--pink-vivid)" }}>
          ema<span style={{ color: "var(--text-primary)" }}>.</span>dev
        </p>
        <div className={styles.footerLinks}>
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.href.startsWith("mailto") ? undefined : "_blank"}
              rel="noopener noreferrer"
              className={styles.footerLink}
            >
              <Bx name={link.icon} style={{ fontSize: "1.1rem" }} /> {link.label}
            </a>
          ))}
        </div>
        <p className={styles.footerCopy}>
          © 2025 Emanuele Maria. Todos os direitos reservados.<br />
          Desenvolvido com <Bx name="bxs-heart" style={{ color: "var(--pink-vivid)" }} /> por Emanuele Maria
        </p>
      </div>
    </footer>
  );
}

// ─────────────────────────────────────────────
// FLOATING WHATSAPP
// ─────────────────────────────────────────────
function WhatsAppFloat() {
  return (
    <a
      href="https://wa.me/5581996376933"
      target="_blank"
      rel="noopener noreferrer"
      className={styles.whatsappFloat}
      aria-label="Fale no WhatsApp"
    >
      <Bx name="bxl-whatsapp" style={{ fontSize: "1.8rem" }} />
    </a>
  );
}

// ─────────────────────────────────────────────
// PAGE
// ─────────────────────────────────────────────
export default function Home() {
  const { dark, toggle } = useDarkMode();

  return (
    <div>
      <Header dark={dark} toggleDark={toggle} />
      <main>
        <HeroSection />
        <SobreSection />
        <TechsSection />
        <RoadMapSection />
        <ProjectsSection />
        <CertsSection />
        <ContactSection />
      </main>
      <Footer />
      <WhatsAppFloat />
    </div>
  );
}
