"use client";
import { useState } from "react";
import styles from "./page.module.css";
import MenuOutlined from "@ant-design/icons/lib/icons/MenuOutlined";
import { CloseCircleOutlined } from "@ant-design/icons";
import * as TECHS_TYPES from "@/type/techs";
import techsData from '../techs/techs.json';
import { Carousel } from "antd";

export const techsArray: TECHS_TYPES.Techs[] = [
  "SPRING_BOOT",
  "REACT",
  "NODE_JS",
  "DOCKER",
  "TYPESCRIPT",
  "JAVA",
  "JAVASCRIPT",
  "REACT_NATIVE",
  "MYSQL",
  "POSTGRESQL",
  "LARAVEL",
  "PHP",
  "CODEIGNITER",
  "NEXT_JS"
];

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [techSelected, setTechSelected] = useState<TECHS_TYPES.Techs | null>(null);
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <header className={styles.header}>
          <section className={styles.intro}>
            <ul className={styles.menu} onBlur={() => setIsMenuOpen(false)} tabIndex={0}>
              <li className={styles.menuItem} onClick={() => setIsMenuOpen(!isMenuOpen)}>{isMenuOpen ? <CloseCircleOutlined /> : <MenuOutlined />}</li>
              {isMenuOpen && (
                <>
                  <li className={styles.menuItem} onClick={() => setIsMenuOpen(false)}><a className={styles.link} href="#sobre">Sobre</a></li>
                  <li className={styles.menuItem} onClick={() => setIsMenuOpen(false)}><a className={styles.link} href="#techs">Techs</a></li>
                  <li className={styles.menuItem} onClick={() => setIsMenuOpen(false)}><a className={styles.link} href="#projetos">Projetos</a></li>
                  <li className={styles.menuItem} onClick={() => setIsMenuOpen(false)}><a className={styles.link} href="#contato">Contato</a></li>
                </>
              )}
            </ul>
          </section>
        </header>
        <section className={styles.hero} id="sobre">
          <h1 className={styles.title}>Sobre Emanuele Maria</h1>
          <div className={styles.container} >
            <div className={styles.textContainer}>
              <p>Lembro-me da primeira entrevista com meu primeiro chefe, ele me perguntou onde eu queria chegar e eu disse: “quero ser programadora Full-stack”. Posso dizer que atingi esse meu primeiro objetivo 😉. Comecei a programar em 2019, quando entrei no IFPE de Garanhuns em Técnico de Informática. Hoje em dia, sou desenvolvedora e faço Engenharia de Software na UPE de Surubim.</p>
            </div>
            <div className={styles.imageContainer}>
            </div>
          </div>
        </section>
        <section className={styles.techs} id="techs">
          <h2 className={styles.title}>Techs trabalhadas</h2>
          <article className={styles.container}>
            <div className={styles.techList}>
              {techsArray.map((tech) => (
                <div key={tech} onClick={() => setTechSelected(tech)} className={styles.techItem}>
                  <div className={styles.techInfo}>
                    {techSelected === tech ? (
                      <p>{techsData[tech]}</p>
                    ) : (
                      <img src={tech == "NEXT_JS" ? "/next_js.svg" : `/${tech.toLowerCase()}.png`} alt={tech} width={100} />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </article>
        </section>
        <section className={styles.projects} id="projetos">
          <h2 className={styles.title}>Projetos</h2>
          <article className={styles.container}>
            <div className={styles.projectList}>

              <div className={styles.projectItem}>
                <div className={styles.projectImage}>
                  <img src="/ttravel.png" alt="" />
                </div>
                <div className={styles.projectInfo}>
                  <h2>TTRAVEL</h2>
                  <p>Site que calcula o custo de combustível em viagens, integrando APIs do IBGE e
                    OpenRouteService. O framework utilizado foi o Next.js.</p>
                </div>
                <div className={styles.projectLink}><a href="https://ttravelling.netlify.app/">ver projeto aqui</a></div>
              </div>
              <div className={styles.projectItem}>
                <div className={styles.projectImage}>
                  <img src="/academia.png" alt="" />
                </div>
                <div className={styles.projectInfo}>
                  <h2>Ah, cadê mia?</h2>
                  <p>Sistema de gerenciamento de academia desenvolvido com React.js, Node.js e Postgres.</p>
                </div>
                <div className={styles.projectLink}><a href="https://front-academia-augusto.vercel.app/">ver projeto aqui</a></div>
              </div> 
                <div className={styles.projectItem}>
                  <div className={styles.projectImage}>
                    <img src="/blog.png" alt="" />
                  </div>
                  <div className={styles.projectInfo}>
                    <h2>Blog</h2>
                    <p>Projeto completo de blog com painel administrativo, autenticação e CRUD.</p>
                  </div>
                  <div className={styles.projectLink}><a href="https://blog-3bk5.onrender.com/">ver projeto aqui</a></div>
                </div>
              <div className={styles.projectItem}>
                <div className={styles.projectImage}>
                  <img src="/portfolio.png" alt="" />
                </div>
                <div className={styles.projectInfo}>
                  <h2><a href="#">Portfólio</a></h2>
                  <p>Este portfólio foi desenvolvido utilizando Next.js e TypeScript, com foco em performance e SEO. Futuramente pretendo adicionar mensageria para contato.</p>
                </div>
                <div className={styles.projectLink}><a href="#">você já está aqui 😅 </a></div>
              </div>
            </div>
          </article>
        </section>
      </main>
      <footer id="contato" className={styles.footer}>
        <section className={styles.contact}>
          <div><p>LinkedIn: <a className={styles.link} href="https://www.linkedin.com/in/emanuelemds/" target="_blank" rel="noopener noreferrer">emanuelemds</a></p></div>
          <div><p>GitHub: <a className={styles.link} href="https://github.com/emanuuele" target="_blank" rel="noopener noreferrer">emanuuele</a></p></div>
          <div><p>Instagram: <a className={styles.link} href="https://www.instagram.com/emanuelecode/" target="_blank" rel="noopener noreferrer">emanuelecode</a></p></div>
          <div><p>E-mail: <a className={styles.link} href="mailto:emanuele.mdsilva@gmail.com">emanuele.mdsilva@gmail.com</a></p></div>
        </section>
        <div><p>© 2025 Emanuele Maria. Todos os direitos reservados.</p></div>
        <div><p>Desenvolvido com ❤️ por Emanuele Maria</p></div>
      </footer>
    </div>
  );
}