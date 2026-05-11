"use client";

import { useState, useEffect, useRef } from "react";
import styles from "./FreelancerPage.module.css";

// ─── Bx helper ───────────────────────────────────────────────
function Bx({ name, className, style }: { name: string; className?: string; style?: React.CSSProperties }) {
  return <i className={`bx ${name}${className ? " " + className : ""}`} style={style} aria-hidden="true" />;
}

// ─── Types ───────────────────────────────────────────────────
type StepId = "tipo" | "funcionalidades" | "prazo" | "orcamento" | "descricao" | "contato";

interface FormState {
  tipo: string[];
  funcionalidades: string[];
  prazo: string;
  orcamento: string;
  descricao: string;
  nome: string;
  whatsapp: string;
  email: string;
}

// ─── Dados ───────────────────────────────────────────────────
const TIPOS = [
  { id: "sistema",   label: "Sistema / SaaS",    icon: "bx-layer",               color: "#3b82f6" },
  { id: "webapp",    label: "Web App",            icon: "bx-window-alt",          color: "#06b6d4" },
  { id: "ecommerce", label: "E-commerce",         icon: "bx-cart",                color: "#8b5cf6" },
  { id: "landing",   label: "Landing Page",       icon: "bx-rocket",              color: "#f59e0b" },
  { id: "mobile",    label: "App Mobile",         icon: "bx-mobile-alt",          color: "#10b981" },
  { id: "dashboard", label: "Dashboard",          icon: "bx-chart",               color: "#ef4444" },
  { id: "api",       label: "API / Back-end",     icon: "bx-code-block",          color: "#a855f7" },
  { id: "outro",     label: "Outro",              icon: "bx-dots-horizontal-rounded", color: "#9ba8c8" },
];

const FUNCIONALIDADES = [
  { id: "auth",      label: "Login / Autenticação" },
  { id: "painel",    label: "Painel Administrativo" },
  { id: "pagamento", label: "Pagamentos Online" },
  { id: "relatorio", label: "Relatórios / Gráficos" },
  { id: "notif",     label: "Notificações" },
  { id: "chat",      label: "Chat / Mensagens" },
  { id: "estoque",   label: "Controle de Estoque" },
  { id: "agenda",    label: "Agendamento" },
  { id: "multiuser", label: "Multi-usuário" },
  { id: "api_int",   label: "Integração com API" },
  { id: "ia",        label: "Inteligência Artificial" },
  { id: "mobile_r",  label: "Responsivo / Mobile" },
];

const PRAZOS = [
  { id: "urgente",   label: "Urgente",   sub: "até 2 semanas",  icon: "bx-time" },
  { id: "normal",    label: "Normal",    sub: "1 a 2 meses",    icon: "bx-calendar" },
  { id: "tranquilo", label: "Tranquilo", sub: "2 a 4 meses",    icon: "bx-coffee" },
  { id: "flexivel",  label: "Flexível",  sub: "sem prazo fixo", icon: "bx-infinite" },
];

const ORCAMENTOS = [
  { id: "ate1k",   label: "Até R$ 1.000" },
  { id: "1k3k",    label: "R$ 1.000 – 3.000" },
  { id: "3k7k",    label: "R$ 3.000 – 7.000" },
  { id: "7k15k",   label: "R$ 7.000 – 15.000" },
  { id: "15kplus", label: "R$ 15.000+" },
  { id: "naosei",  label: "Ainda não sei" },
];

const STEPS: { id: StepId; label: string; icon: string }[] = [
  { id: "tipo",            label: "Projeto",     icon: "bx-layer" },
  { id: "funcionalidades", label: "Funções",     icon: "bx-list-check" },
  { id: "prazo",           label: "Prazo",       icon: "bx-time" },
  { id: "orcamento",       label: "Investimento",icon: "bx-dollar" },
  { id: "descricao",       label: "Ideia",       icon: "bx-edit" },
  { id: "contato",         label: "Contato",     icon: "bx-user" },
];

const STEP_ORDER: StepId[] = ["tipo", "funcionalidades", "prazo", "orcamento", "descricao", "contato"];

const STEP_META: Record<StepId, { title: string; accent: string; hint: string }> = {
  tipo:            { title: "Que tipo de",  accent: "projeto é esse?",     hint: "Pode marcar mais de um 👇" },
  funcionalidades: { title: "Quais são as", accent: "funcionalidades?",    hint: "Selecione tudo que faz sentido para o projeto." },
  prazo:           { title: "Qual o",       accent: "prazo ideal?",        hint: "Escolha a opção que melhor representa sua expectativa." },
  orcamento:       { title: "Faixa de",     accent: "investimento?",       hint: "Informação confidencial — usada só para alinhar escopo." },
  descricao:       { title: "Me conta",     accent: "sua ideia.",          hint: "Quanto mais detalhes, mais preciso será o orçamento." },
  contato:         { title: "Quase lá —",   accent: "como te encontro?",   hint: "Seus dados não são compartilhados com terceiros." },
};

// ─── WhatsApp message builder ─────────────────────────────────
const TIPO_LABELS: Record<string, string> = {
  sistema: "Sistema / SaaS", webapp: "Web App", ecommerce: "E-commerce",
  landing: "Landing Page", mobile: "App Mobile", dashboard: "Dashboard",
  api: "API / Back-end", outro: "Outro",
};
const FUNC_LABELS: Record<string, string> = {
  auth: "Login / Autenticação", painel: "Painel Administrativo", pagamento: "Pagamentos Online",
  relatorio: "Relatórios / Gráficos", notif: "Notificações", chat: "Chat / Mensagens",
  estoque: "Controle de Estoque", agenda: "Agendamento", multiuser: "Multi-usuário",
  api_int: "Integração com API", ia: "Inteligência Artificial", mobile_r: "Responsivo / Mobile",
};
const PRAZO_LABELS: Record<string, string> = {
  urgente: "Urgente (até 2 semanas)", normal: "Normal (1 a 2 meses)",
  tranquilo: "Tranquilo (2 a 4 meses)", flexivel: "Flexível (sem prazo fixo)",
};
const ORC_LABELS: Record<string, string> = {
  ate1k: "Até R$ 1.000", "1k3k": "R$ 1.000 – 3.000", "3k7k": "R$ 3.000 – 7.000",
  "7k15k": "R$ 7.000 – 15.000", "15kplus": "R$ 15.000+", naosei: "Ainda não sei",
};

function buildWhatsApp(form: FormState): string {
  const tipos = form.tipo.map(t => TIPO_LABELS[t] ?? t).join(", ") || "Não informado";
  const funcs = form.funcionalidades.map(f => FUNC_LABELS[f] ?? f).join(", ") || "Nenhuma";
  return (
    `Olá, Emanuele! 👋\n\n` +
    `Vim pelo seu portfólio e tenho um projeto para te apresentar:\n\n` +
    `📌 *Tipo de projeto:* ${tipos}\n` +
    `⚙️ *Funcionalidades:* ${funcs}\n` +
    `⏱️ *Prazo desejado:* ${PRAZO_LABELS[form.prazo] ?? "Não informado"}\n` +
    `💰 *Investimento previsto:* ${ORC_LABELS[form.orcamento] ?? "Não informado"}\n\n` +
    `💡 *Ideia do projeto:*\n${form.descricao}\n\n` +
    `👤 *Nome:* ${form.nome}\n` +
    `📧 *E-mail:* ${form.email || "Não informado"}`
  );
}

// ─── Hook useInView ───────────────────────────────────────────
function useInView(threshold = 0.2) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

// ─── Steps ───────────────────────────────────────────────────

function StepTipo({ value, onChange }: { value: string[]; onChange: (v: string[]) => void }) {
  const toggle = (id: string) => onChange(value.includes(id) ? value.filter(x => x !== id) : [...value, id]);
  return (
    <div className={styles.tipoGrid}>
      {TIPOS.map(t => (
        <button
          key={t.id}
          type="button"
          className={`${styles.tipoCard} ${value.includes(t.id) ? styles.tipoCardActive : ""}`}
          style={{ "--tipo-color": t.color } as React.CSSProperties}
          onClick={() => toggle(t.id)}
        >
          <span className={styles.tipoIcon}>
            <Bx name={t.icon} style={{ fontSize: "1.5rem", color: t.color }} />
          </span>
          <span className={styles.tipoLabel}>{t.label}</span>
          {value.includes(t.id) && (
            <span className={styles.tipoCheck}>
              <Bx name="bx-check" style={{ fontSize: "0.8rem" }} />
            </span>
          )}
        </button>
      ))}
    </div>
  );
}

function StepFuncionalidades({ value, onChange }: { value: string[]; onChange: (v: string[]) => void }) {
  const toggle = (id: string) => onChange(value.includes(id) ? value.filter(x => x !== id) : [...value, id]);
  return (
    <div className={styles.funcGrid}>
      {FUNCIONALIDADES.map(f => (
        <button
          key={f.id}
          type="button"
          className={`${styles.funcChip} ${value.includes(f.id) ? styles.funcChipActive : ""}`}
          onClick={() => toggle(f.id)}
        >
          {value.includes(f.id) && <Bx name="bx-check" style={{ fontSize: "0.85rem" }} />}
          {f.label}
        </button>
      ))}
    </div>
  );
}

function StepPrazo({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <div className={styles.prazoGrid}>
      {PRAZOS.map(p => (
        <button
          key={p.id}
          type="button"
          className={`${styles.prazoCard} ${value === p.id ? styles.prazoCardActive : ""}`}
          onClick={() => onChange(p.id)}
        >
          <span className={styles.prazoIcon}>
            <Bx name={p.icon} style={{ fontSize: "1.4rem" }} />
          </span>
          <strong className={styles.prazoLabel}>{p.label}</strong>
          <span className={styles.prazSub}>{p.sub}</span>
          {value === p.id && <span className={styles.prazoTick}><Bx name="bx-check" /></span>}
        </button>
      ))}
    </div>
  );
}

function StepOrcamento({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <div className={styles.orcGrid}>
      {ORCAMENTOS.map(o => (
        <button
          key={o.id}
          type="button"
          className={`${styles.orcBtn} ${value === o.id ? styles.orcBtnActive : ""}`}
          onClick={() => onChange(o.id)}
        >
          <span className={styles.orcRadio}>
            {value === o.id
              ? <Bx name="bxs-circle" style={{ fontSize: "0.7rem" }} />
              : <Bx name="bx-circle" style={{ fontSize: "0.7rem" }} />
            }
          </span>
          {o.label}
        </button>
      ))}
    </div>
  );
}

function StepDescricao({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <div className={styles.descWrap}>
      <textarea
        className={styles.textarea}
        placeholder="Ex: Quero um sistema para minha barbearia. O barbeiro vê os agendamentos do dia, o cliente agenda pelo celular, e tem um painel financeiro no final do mês..."
        value={value}
        onChange={e => onChange(e.target.value)}
        rows={7}
      />
      <div className={styles.charCount}>
        <span style={{ color: value.length >= 20 ? "var(--pink-vivid)" : "var(--text-muted)" }}>
          {value.length} caracteres {value.length >= 20 ? "✓" : "(mín. 20)"}
        </span>
      </div>
    </div>
  );
}

function StepContato({
  nome, whatsapp, email,
  onNome, onWhatsapp, onEmail,
}: {
  nome: string; whatsapp: string; email: string;
  onNome: (v: string) => void; onWhatsapp: (v: string) => void; onEmail: (v: string) => void;
}) {
  return (
    <div className={styles.contatoFields}>
      <div className={styles.field}>
        <label className={styles.fieldLabel}><Bx name="bx-user" /> Nome completo *</label>
        <input className={styles.input} type="text" placeholder="Seu nome" value={nome} onChange={e => onNome(e.target.value)} />
      </div>
      <div className={styles.field}>
        <label className={styles.fieldLabel}><Bx name="bxl-whatsapp" /> WhatsApp *</label>
        <input className={styles.input} type="tel" placeholder="(81) 99999-9999" value={whatsapp} onChange={e => onWhatsapp(e.target.value)} />
      </div>
      <div className={styles.field}>
        <label className={styles.fieldLabel}><Bx name="bx-envelope" /> E-mail (opcional)</label>
        <input className={styles.input} type="email" placeholder="seu@email.com" value={email} onChange={e => onEmail(e.target.value)} />
      </div>
    </div>
  );
}

// ─── Tela de sucesso ──────────────────────────────────────────
function SuccessScreen({ onReset }: { onReset: () => void }) {
  return (
    <div className={styles.successWrap}>
      <div className={styles.successOrb} aria-hidden="true" />
      <div className={styles.successIcon}>
        <Bx name="bxl-whatsapp" style={{ fontSize: "2.2rem" }} />
      </div>
      <h2 className={styles.successTitle}>
        Briefing enviado com <em>sucesso!</em>
      </h2>
      <p className={styles.successSub}>
        O WhatsApp vai abrir em instantes com tudo organizado.
        Responderei assim que possível — normalmente em até 24h!
      </p>
      <div className={styles.successTags}>
        <span><Bx name="bx-check" /> Briefing estruturado</span>
        <span><Bx name="bx-check" /> Orçamento personalizado</span>
        <span><Bx name="bx-check" /> Resposta rápida</span>
      </div>
      <button className={styles.restartBtn} onClick={onReset}>
        <Bx name="bx-refresh" /> Enviar outro projeto
      </button>
    </div>
  );
}

// ─── Hero da página ───────────────────────────────────────────
function FreelancerHero() {
  const { ref, inView } = useInView(0.15);
  const services = [
    { icon: "bx-code-alt",       label: "Front-end",      color: "#3b82f6" },
    { icon: "bx-server",         label: "Back-end",        color: "#10b981" },
    { icon: "bx-mobile-alt",     label: "Mobile",          color: "#8b5cf6" },
    { icon: "bx-data",           label: "APIs & Banco",    color: "#f59e0b" },
    { icon: "bx-paint",          label: "UI / UX",         color: "#ef4444" },
    { icon: "bx-shield-quarter", label: "Consultoria",     color: "#06b6d4" },
  ];

  return (
    <section className={styles.hero}>
      <div className={styles.heroBg} aria-hidden="true">
        <div className={styles.heroBgOrb1} />
        <div className={styles.heroBgOrb2} />
        <div className={styles.heroBgGrid} />
      </div>

      <div
        ref={ref}
        className={`${styles.heroInner} ${inView ? styles.heroInnerVisible : ""}`}
      >
        {/* Badge */}
        <span className={styles.heroBadge}>
          <span className={styles.heroBadgeDot} />
          Disponível para novos projetos
        </span>

        {/* Título */}
        <h1 className={styles.heroTitle}>
          Transformo sua ideia<br />
          em <em>produto real.</em>
        </h1>

        <p className={styles.heroSub}>
          Sou Emanuele — desenvolvedora Full-Stack com +7 anos de experiência.
          Trabalho com React, Next.js, Spring Boot e muito mais. Me conta seu projeto
          e te dou um orçamento honesto, rápido e sem enrolação.
        </p>

        {/* Serviços */}
        <div className={styles.serviceGrid}>
          {services.map(s => (
            <div key={s.label} className={styles.serviceItem}>
              <span className={styles.serviceIcon} style={{ "--svc-color": s.color } as React.CSSProperties}>
                <Bx name={s.icon} style={{ fontSize: "1.1rem", color: s.color }} />
              </span>
              <span className={styles.serviceLabel}>{s.label}</span>
            </div>
          ))}
        </div>

        {/* Stats rápidas */}
        <div className={styles.heroStats}>
          {[
            { n: "7+",  l: "Anos de experiência" },
            { n: "14",  l: "Tecnologias" },
            { n: "4+",  l: "Projetos entregues" },
            { n: "24h", l: "Tempo de resposta" },
          ].map(s => (
            <div key={s.l} className={styles.heroStat}>
              <span className={styles.heroStatNum}>{s.n}</span>
              <span className={styles.heroStatLabel}>{s.l}</span>
            </div>
          ))}
        </div>

        {/* CTA scroll */}
        <a href="#briefing" className={styles.heroScroll}>
          Me conta seu projeto <Bx name="bx-down-arrow-alt" />
        </a>
      </div>
    </section>
  );
}

// ─── Componente principal do wizard ──────────────────────────
export default function FreelancerPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [submitted, setSubmitted]     = useState(false);
  const [sending, setSending]         = useState(false);
  const formRef = useRef<HTMLDivElement>(null);

  const [form, setForm] = useState<FormState>({
    tipo: [], funcionalidades: [], prazo: "", orcamento: "",
    descricao: "", nome: "", whatsapp: "", email: "",
  });

  const stepId   = STEP_ORDER[currentStep];
  const isLast   = currentStep === STEP_ORDER.length - 1;
  const progress = (currentStep / (STEP_ORDER.length - 1)) * 100;

  const set = <K extends keyof FormState>(key: K) => (val: FormState[K]) =>
    setForm(f => ({ ...f, [key]: val }));

  const canAdvance = (): boolean => {
    if (stepId === "tipo")            return form.tipo.length > 0;
    if (stepId === "funcionalidades") return form.funcionalidades.length > 0;
    if (stepId === "prazo")           return !!form.prazo;
    if (stepId === "orcamento")       return !!form.orcamento;
    if (stepId === "descricao")       return form.descricao.trim().length >= 20;
    if (stepId === "contato")         return !!(form.nome && form.whatsapp);
    return true;
  };

  const scrollToForm = () => formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });

  const next = () => { setCurrentStep(s => s + 1); scrollToForm(); };
  const back = () => { setCurrentStep(s => s - 1); scrollToForm(); };

  const handleSubmit = async () => {
    setSending(true);
    const msg    = buildWhatsApp(form);
    const waNum  = "5581996376933"; // ← número da Emanuele
    const waUrl  = `https://wa.me/${waNum}?text=${encodeURIComponent(msg)}`;
    setSending(false);
    setSubmitted(true);
    setTimeout(() => window.open(waUrl, "_blank"), 700);
  };

  const reset = () => {
    setSubmitted(false);
    setCurrentStep(0);
    setForm({ tipo: [], funcionalidades: [], prazo: "", orcamento: "", descricao: "", nome: "", whatsapp: "", email: "" });
  };

  const meta = STEP_META[stepId];

  return (
    <div className={styles.page}>
      {/* ── Hero ── */}
      <FreelancerHero />

      {/* ── Briefing wizard ── */}
      <section id="briefing" className={styles.wizardSection}>
        <div className={styles.wizardBg} aria-hidden="true">
          <div className={styles.wizardBgOrb} />
        </div>

        <div className={styles.wizardContainer}>

          {/* Título da seção */}
          <div className={styles.wizardHeader}>
            <p className={styles.sectionLabel}>Vamos começar</p>
            <h2 className={styles.wizardTitle}>
              Conte seu <em>projeto</em>
            </h2>
            <p className={styles.wizardSub}>
              Responda em menos de 3 minutos e receba um orçamento via WhatsApp.
            </p>
          </div>

          {/* Shell do wizard */}
          <div ref={formRef} className={styles.wizardShell}>

            {submitted ? (
              <SuccessScreen onReset={reset} />
            ) : (
              <>
                {/* Progress bar */}
                <div className={styles.progressBar}>
                  <div
                    className={styles.progressFill}
                    style={{ width: `${progress}%` }}
                  />
                </div>

                {/* Stepper */}
                <div className={styles.stepper}>
                  {STEPS.map((s, i) => (
                    <button
                      key={s.id}
                      type="button"
                      className={[
                        styles.stepDot,
                        i === currentStep ? styles.stepDotActive : "",
                        i < currentStep  ? styles.stepDotDone   : "",
                      ].join(" ")}
                      onClick={() => i < currentStep && setCurrentStep(i)}
                      title={s.label}
                    >
                      {i < currentStep
                        ? <Bx name="bx-check" style={{ fontSize: "0.85rem" }} />
                        : <Bx name={s.icon}   style={{ fontSize: "0.85rem" }} />
                      }
                      <span className={styles.stepDotLabel}>{s.label}</span>
                    </button>
                  ))}
                </div>

                {/* Conteúdo da etapa */}
                <div className={styles.stepBody}>
                  <div className={styles.stepHead}>
                    <span className={styles.stepCount}>
                      {currentStep + 1} / {STEP_ORDER.length}
                    </span>
                    <h3 className={styles.stepTitle}>
                      {meta.title}{" "}
                      <em>{meta.accent}</em>
                    </h3>
                    <p className={styles.stepHint}>{meta.hint}</p>
                  </div>

                  <div className={styles.stepContent}>
                    {stepId === "tipo"            && <StepTipo            value={form.tipo}            onChange={set("tipo")} />}
                    {stepId === "funcionalidades" && <StepFuncionalidades value={form.funcionalidades} onChange={set("funcionalidades")} />}
                    {stepId === "prazo"           && <StepPrazo           value={form.prazo}           onChange={set("prazo")} />}
                    {stepId === "orcamento"       && <StepOrcamento       value={form.orcamento}       onChange={set("orcamento")} />}
                    {stepId === "descricao"       && <StepDescricao       value={form.descricao}       onChange={set("descricao")} />}
                    {stepId === "contato"         && (
                      <StepContato
                        nome={form.nome} whatsapp={form.whatsapp} email={form.email}
                        onNome={set("nome")} onWhatsapp={set("whatsapp")} onEmail={set("email")}
                      />
                    )}
                  </div>
                </div>

                {/* Ações */}
                <div className={styles.actions}>
                  {currentStep > 0 && (
                    <button type="button" className={styles.btnBack} onClick={back}>
                      <Bx name="bx-arrow-back" /> Voltar
                    </button>
                  )}
                  <div className={styles.actionsSpacer} />
                  {!isLast ? (
                    <button
                      type="button"
                      className={styles.btnNext}
                      disabled={!canAdvance()}
                      onClick={next}
                    >
                      Continuar <Bx name="bx-right-arrow-alt" />
                    </button>
                  ) : (
                    <button
                      type="button"
                      className={styles.btnSubmit}
                      disabled={!canAdvance() || sending}
                      onClick={handleSubmit}
                    >
                      {sending
                        ? <><Bx name="bx-loader-alt" className="bx-spin" /> Enviando...</>
                        : <><Bx name="bxl-whatsapp" /> Enviar via WhatsApp</>
                      }
                    </button>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* ── Depoimentos / trust ── */}
      <section className={styles.trustSection}>
        <div className={styles.trustContainer}>
          <p className={styles.sectionLabel}>Por que me contratar</p>
          <h2 className={styles.trustTitle}>Código com <em>responsabilidade</em></h2>
          <div className={styles.trustGrid}>
            {[
              { icon: "bx-code-alt",    title: "Código limpo",     desc: "Entrego código documentado, escalável e fácil de manter por qualquer time." },
              { icon: "bx-time-five",   title: "Prazo real",        desc: "Sem promessas vazias. Combino o que consigo entregar e cumpro o que combino." },
              { icon: "bx-message-dots",title: "Comunicação clara", desc: "Updates frequentes, linguagem acessível e sem sumiços durante o projeto." },
              { icon: "bx-shield-quarter", title: "Qualidade testada", desc: "Testes, revisões e QA fazem parte do processo — não são extras." },
            ].map(c => (
              <div key={c.title} className={styles.trustCard}>
                <span className={styles.trustIcon}>
                  <Bx name={c.icon} style={{ fontSize: "1.3rem" }} />
                </span>
                <h4 className={styles.trustCardTitle}>{c.title}</h4>
                <p className={styles.trustCardDesc}>{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
