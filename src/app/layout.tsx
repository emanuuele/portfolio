import type { Metadata } from "next";
import { Epilogue, DM_Serif_Display } from 'next/font/google';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'boxicons/css/boxicons.min.css'
import "./globals.css";

const epilogue = Epilogue({
  subsets: ['latin'],
  variable: '--font-epilogue',
  display: 'swap',
});

const dmSerif = DM_Serif_Display({
  weight: ['400'],
  subsets: ['latin'],
  variable: '--font-dm-serif',
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Emanuele Maria — Desenvolvedora Full-Stack",
  icons: {
    icon: "/logo.png",
  },
  description:
    "Portfólio de Emanuele Maria, desenvolvedora Full-Stack especialista em React, Next.js, Spring Boot e muito mais.",
  keywords: ["desenvolvedora", "full-stack", "react", "next.js", "spring boot", "portfólio"],
  authors: [{ name: "Emanuele Maria" }],
  openGraph: {
    title: "Emanuele Maria — Desenvolvedora Full-Stack",
    description: "Portfólio de Emanuele Maria, desenvolvedora Full-Stack.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        {/* Script inline para evitar flash de tema errado */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme') || 'light';
                  document.documentElement.setAttribute('data-theme', theme);
                } catch(e) {}
              })();
            `,
          }}
        />
      </head>
      <body className={`${epilogue.variable} ${dmSerif.variable}`}>{children}</body>
    </html>
  );
}
