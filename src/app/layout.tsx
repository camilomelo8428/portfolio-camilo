import type { Metadata } from "next";
import { Barlow_Condensed, IBM_Plex_Sans } from "next/font/google";
import { Header } from "@/components/Header";
import { Providers } from "@/components/Providers";
import { WhatsAppFloating } from "@/components/WhatsAppFloating";
import "./globals.css";

const display = Barlow_Condensed({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const body = IBM_Plex_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Camilo Lessa | Desenvolvedor Full Stack & Supervisor de TI",
  description:
    "Portfólio de Camilo Lessa de Melo — desenvolvimento full stack, infraestrutura, IoT industrial e sistemas corporativos em produção.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${display.variable} ${body.variable} h-full`}>
      <body className="min-h-full antialiased">
        <Providers>
          <Header />
          {children}
          <WhatsAppFloating />
        </Providers>
      </body>
    </html>
  );
}
