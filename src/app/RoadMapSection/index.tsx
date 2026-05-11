"use client";

import { useState, useEffect, useRef } from "react";
import Image, { StaticImageData } from "next/image";
import styles from "./RoadMapSection.module.css";

import PrimeiroPasso from "../../assets/primeiro_passo.webp";
import Diploma from "../../assets/diploma.webp";
import PrimeiraOpor from "../../assets/primeira_opor.webp";
import Engenharia from "../../assets/engenharia.webp";
import Producao from "../../assets/producao.webp";
import DevJunior from "../../assets/dev_junior.webp";
import Excelencia from "../../assets/excelencia.webp";

function Bx({ name, style }: { name: string; style?: React.CSSProperties }) {
  return <i className={`bx ${name}`} style={style} aria-hidden="true" />;
}

interface RoadmapItem {
  year: string;
  title: string;
  description: string;
  icon: string;
  highlight: boolean;
  image: StaticImageData;
  category: "Educação" | "Conquista" | "Carreira" | "Acadêmico" | "Marco";
  accentColor: string;
}

const ROADMAP: RoadmapItem[] = [
  {
    year: "2019",
    title: "O primeiro passo",
    description:
      "Início do curso Técnico em Informática no IFPE de Garanhuns. O começo de tudo — linhas de código que mudaram minha vida.",
    icon: "bx-leaf",
    highlight: false,
    image: PrimeiroPasso,
    category: "Educação",
    accentColor: "#3B82F6",
  },
  {
    year: "2022",
    title: "Diploma conquistado",
    description:
      "Conclusão do diploma de Técnica em Informática pelo IFPE. Três anos de aprendizado intenso transformados em papel e orgulho.",
    icon: "bxs-graduation",
    highlight: false,
    image: Diploma,
    category: "Conquista",
    accentColor: "#22C55E",
  },
  {
    year: "Jan 2023",
    title: "Primeira oportunidade",
    description:
      "Conquista do primeiro estágio na área — o sonho começando a se tornar realidade. Do código ao mundo profissional.",
    icon: "bx-briefcase-alt-2",
    highlight: false,
    image: PrimeiraOpor,
    category: "Carreira",
    accentColor: "#C0356A",
  },
  {
    year: "Ago 2023",
    title: "Engenharia de Software",
    description:
      "Início da graduação em Engenharia de Software na UPE de Surubim. Aprofundando fundamentos e expandindo horizontes.",
    icon: "bxs-school",
    highlight: false,
    image: Engenharia,
    category: "Educação",
    accentColor: "#3B82F6",
  },
  {
    year: "2024",
    title: "Produção Acadêmica",
    description:
      'Escrita do artigo "A utopia do mercado": relação entre mercado de trabalho e empregabilidade do profissional de tecnologia.',
    icon: "bx-file",
    highlight: false,
    image: Producao,
    category: "Acadêmico",
    accentColor: "#F59E0B",
  },
  {
    year: "Abr 2024",
    title: "Desenvolvedora JR efetivada",
    description:
      "Efetivação como Desenvolvedora Júnior — marco de crescimento e reconhecimento profissional. Do estágio à carteira assinada.",
    icon: "bx-rocket",
    highlight: false,
    image: DevJunior,
    category: "Carreira",
    accentColor: "#C0356A",
  },
  {
    year: "2026",
    title: "Excelência técnica",
    description:
      "Homologação aprovada na Stone — marco de excelência técnica e maturidade como desenvolvedora.",
    icon: "bxs-star",
    highlight: true,
    image: Excelencia,
    category: "Marco",
    accentColor: "#C0356A",
  },
];

/* ── Hook IntersectionObserver ───────────────────────────── */
function useInView(threshold = 0.18) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

/* ── Card ────────────────────────────────────────────────── */
function RoadmapCard({
  item,
  index,
  side,
}: {
  item: RoadmapItem;
  index: number;
  side: "left" | "right";
}) {
  const { ref, inView } = useInView();

  return (
    <article
      ref={ref}
      className={[
        styles.card,
        side === "left" ? styles.cardLeft : styles.cardRight,
        inView ? styles.cardVisible : "",
        item.highlight ? styles.cardHighlight : "",
      ].join(" ")}
      style={{
        "--accent": item.accentColor,
        "--delay": `${index * 0.06}s`,
      } as React.CSSProperties}
    >
      {/* Linha accent lateral */}
      <div className={styles.sideAccent} />

      {/* Imagem com next/image */}
      <div className={styles.cardImgWrap}>
        {/* Camada de fundo — desfocada e esfumada */}
        <Image
          src={item.image}
          alt=""
          fill
          aria-hidden="true"
          sizes="(max-width: 980px) 90vw, 45vw"
          className={styles.cardImgBg}
          placeholder="blur"
        />
        {/* Imagem principal — contain, centralizada */}
        <Image
          src={item.image}
          alt={item.title}
          fill
          sizes="(max-width: 980px) 90vw, 45vw"
          className={styles.cardImg}
          placeholder="blur"
          priority={index < 2}
        />
        {/* Gradiente inferior */}
        <div className={styles.cardImgOverlay} />

        {/* Número flutuante */}
        <span className={styles.indexNum}>
          {String(index + 1).padStart(2, "0")}
        </span>

        {/* Chip de categoria */}
        <span className={styles.chip}>
          {item.category}
        </span>
      </div>

      {/* Corpo */}
      <div className={styles.cardBody}>
        <div className={styles.cardMeta}>
          <time className={styles.cardYear}>{item.year}</time>
          <span className={styles.cardIconWrap}>
            <Bx name={item.icon} style={{ fontSize: "0.95rem" }} />
          </span>
        </div>
        <h4 className={styles.cardTitle}>{item.title}</h4>
        <p className={styles.cardDesc}>{item.description}</p>
      </div>

      {/* Barra shimmer apenas no highlight */}
      {item.highlight && <div className={styles.shimmerBar} />}
    </article>
  );
}

/* ── Nó central ──────────────────────────────────────────── */
function Node({ item, visible }: { item: RoadmapItem; visible: boolean }) {
  return (
    <div className={`${styles.nodeWrap} ${visible ? styles.nodeVisible : ""}`}>
      {item.highlight && (
        <span
          className={styles.nodeRing}
          style={{ "--accent": item.accentColor } as React.CSSProperties}
        />
      )}
      <div
        className={`${styles.nodeDot} ${item.highlight ? styles.nodeDotActive : ""}`}
        style={{ "--accent": item.accentColor } as React.CSSProperties}
      >
        <Bx name={item.icon} style={{ fontSize: "1.05rem" }} />
      </div>
    </div>
  );
}

/* ── Linha da timeline ───────────────────────────────────── */
function TimelineRow({
  item,
  index,
  side,
}: {
  item: RoadmapItem;
  index: number;
  side: "left" | "right";
}) {
  const { ref, inView } = useInView(0.12);

  return (
    <div ref={ref} className={styles.row}>
      <div className={styles.rowDesktopLeft}>
        {side === "left" && <RoadmapCard item={item} index={index} side="left" />}
      </div>

      <div className={styles.rowCenter}>
        <Node item={item} visible={inView} />
      </div>

      <div className={styles.rowDesktopRight}>
        {side === "right" && <RoadmapCard item={item} index={index} side="right" />}
      </div>

      {/* Mobile */}
      <div className={styles.rowMobile}>
        <RoadmapCard item={item} index={index} side="right" />
      </div>
    </div>
  );
}

/* ── Seção principal ─────────────────────────────────────── */
export default function RoadMapSection() {
  const { ref: headerRef, inView: headerVisible } = useInView(0.2);

  return (
    <section id="roadmap" className={styles.section}>
      {/* Background decorativo */}
      <div className={styles.bg} aria-hidden="true">
        <div className={styles.bgOrb1} />
        <div className={styles.bgOrb2} />
        <div className={styles.bgGrid} />
      </div>

      <div className={styles.container}>
        {/* Header */}
        <header
          ref={headerRef}
          className={`${styles.header} ${headerVisible ? styles.headerVisible : ""}`}
        >
          <p className={styles.eyebrow}>
            <span className={styles.eyebrowLine} />
            Trajetória
            <span className={styles.eyebrowLine} />
          </p>
          <h2 className={styles.sectionTitle}>
            A minha <em>jornada</em>
          </h2>
          <p className={styles.sectionSub}>
            Cada marco, uma conquista. Cada ano, uma nova versão de mim.
          </p>

          <div className={styles.legend}>
            {[
              { label: "Educação", color: "#3B82F6" },
              { label: "Conquista", color: "#22C55E" },
              { label: "Carreira", color: "#C0356A" },
              { label: "Acadêmico", color: "#F59E0B" },
            ].map(({ label, color }) => (
              <span key={label} className={styles.legendItem}>
                <span className={styles.legendDot} style={{ background: color }} />
                {label}
              </span>
            ))}
          </div>
        </header>

        {/* Timeline */}
        <div className={styles.timeline}>
          <div className={styles.timelineLine}>
            <div className={styles.timelineLineFill} />
          </div>

          {ROADMAP.map((item, i) => (
            <TimelineRow
              key={`${item.year}-${i}`}
              item={item}
              index={i}
              side={i % 2 === 0 ? "right" : "left"}
            />
          ))}
        </div>
      </div>
    </section>
  );
}