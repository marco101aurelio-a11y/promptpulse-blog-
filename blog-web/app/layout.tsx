import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'PromptPulse | Inteligência Artificial & Produtividade no Trabalho',
  description: 'Descubra tutoriais práticos, ferramentas de IA, análises comparativas e estratégias de automação para transformar sua produtividade.',
  keywords: ['Inteligência Artificial', 'Produtividade', 'Automação', 'ChatGPT', 'DeepSeek', 'Prompts', 'Tecnologia'],
  authors: [{ name: 'Equipe PromptPulse' }],
  metadataBase: new URL('https://www.promptpulse.com.br'),
  openGraph: {
    title: 'PromptPulse | Inteligência Artificial & Produtividade',
    description: 'Tutoriais práticos, ferramentas de IA e estratégias para economizar tempo e alavancar sua carreira.',
    type: 'website',
    locale: 'pt_BR',
    siteName: 'PromptPulse',
    url: 'https://www.promptpulse.com.br',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={`${geistSans.variable} ${geistMono.variable} dark antialiased scroll-smooth`}>
      <body className="min-h-screen flex flex-col bg-neutral-950 text-neutral-100 selection:bg-cyan-500/30 selection:text-cyan-200">
        <Navbar />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
