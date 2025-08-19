"use client";
import { useEffect, useState } from "react";
import styles from "./page.module.css";
import MenuOutlined from "@ant-design/icons/lib/icons/MenuOutlined";

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <header className={styles.header}>
          <section className={styles.intro}>
            <ul className={styles.menu}>
              <li className={styles.menuItem} onClick={() => setIsMenuOpen(!isMenuOpen)}><MenuOutlined /></li>
              {isMenuOpen && (
                <>
                  <li className={styles.menuItem}><a className={styles.link} href="#sobre">Sobre</a></li>
                  <li className={styles.menuItem}><a className={styles.link} href="#techs">Techs</a></li>
                  <li className={styles.menuItem}><a className={styles.link} href="#projetos">Projetos</a></li>
                  <li className={styles.menuItem}><a className={styles.link} href="#contato">Contato</a></li>
                </>
              )}
            </ul>
          </section>
        </header>

        <section className={styles.hero} id="sobre">
          <h1 className={styles.title}>Sobre Emanuele Maria</h1>
          <div className={styles.textContainer}>
            <p>Lembro-me da primeira entrevista com meu primeiro chefe, ele me perguntou onde eu queria chegar e eu disse: “quero ser programadora Full-stack”. Posso dizer que atingi esse meu primeiro objetivo 😉. Comecei a programar em 2019, quando entrei no IFPE de Garanhuns em Técnico de Informática. Hoje em dia, sou desenvolvedora e faço Engenharia de Software na UPE de Surubim.</p>
          </div>
        </section>

        <section className={styles.techs} id="techs">
          <h2 className={styles.title}>Techs trabalhadas</h2>
          <article className={styles.container}>
            <div className={styles.techList}>
              <div className={styles.techItem}>
                <img src="/spring.png" alt="" width={100} />
              </div>
              <div className={styles.techItem}>
                <img src="/react.png" alt="" width={100} />
              </div>
              <div className={styles.techItem}>
                <img src="/node.png" alt="" width={100} />
              </div>
              <div className={styles.techItem}>
                <img src="/docker.png" alt="" width={100} />
              </div>
              <div className={styles.techItem}>
                <img src="/typescript.png" alt="" width={100} />
              </div>
              <div className={styles.techItem}>
                <img src="/java.png" alt="" width={100} />
              </div>
              <div className={styles.techItem}>
                <img src="/javascript.png" alt="" width={100} />
              </div>
              <div className={styles.techItem}>
                <img src="/react-native.png" alt="" width={100} />
              </div>
              <div className={styles.techItem}>
                <img src="/mysql.png" alt="" width={100} />
              </div>
              <div className={styles.techItem}>
                <img src="/postgresql.png" alt="" width={100} />
              </div>
              <div className={styles.techItem}>
                <img src="/laravel.png" alt="" width={100} />
              </div>
              <div className={styles.techItem}>
                <img src="/php.png" alt="" width={100} />
              </div>
              <div className={styles.techItem}>
                <img src="/codeigniter.png" alt="" width={100} />
              </div>
              <div className={styles.techItem}>
                <img src="/next.svg" alt="" width={100} />
              </div>
            </div>
          </article>
        </section>
        <section className={styles.projects} id="projetos">
          <h2 className={styles.title}>Projetos</h2>
          <article className={styles.container}>
            <div className={styles.projectList}>
              <a href="https://ttravelling.netlify.app/">

                <div className={styles.projectItem}>
                  <div className={styles.projectImage}>
                    <img src="/ttravel.png" alt="" />
                  </div>
                  <h2>TTRAVEL</h2>
                  <p>Site que calcula o custo de combustível em viagens, integrando APIs do IBGE e
                    OpenRouteService. O framework utilizado foi o Next.js.</p>
                </div>
              </a>
              <a href="https://front-academia-augusto.vercel.app/">
                <div className={styles.projectItem}>
                  <div className={styles.projectImage}>
                    <img src="/academia.png" alt="" />
                  </div>
                  <h2>Ah, cadê mia?</h2>
                  <p>Sistema de gerenciamento de academia desenvolvido com React.js, Node.js e Postgres.</p>
                </div>
              </a>
              <a href="https://blog-3bk5.onrender.com/">
                <div className={styles.projectItem}>
                  <div className={styles.projectImage}>
                    <img src="/blog.png" alt="" />
                  </div>
                  <h2>Blog</h2>
                  <p>Projeto completo de blog com painel administrativo, autenticação e CRUD.</p>
                </div>
              </a>
              <div className={styles.projectItem}>
                <div className={styles.projectImage}>
                  <img src="/portfolio.png" alt="" />
                </div>
                <h2><a href="#">Portfólio</a></h2>
                <p>Este portfólio foi desenvolvido utilizando Next.js e TypeScript, com foco em performance e SEO. Futuramente pretendo adicionar mensageria para contato.</p>
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
