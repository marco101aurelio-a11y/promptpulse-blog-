import type { Metadata } from 'next';
import Script from 'next/script';
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
  title: 'PromptPulse | IA, MCP, Prompts, Tráfego Pago e Automação',
  description:
    'Guias práticos de Inteligência Artificial, MCP (Model Context Protocol), Prompts & Skills, Google Workspace, WhatsApp e auditoria de lucro real em Meta Ads e Google Ads para empresas.',
  keywords: [
    'PromptPulse',
    'MCP Model Context Protocol',
    'Inteligência Artificial para Empresas',
    'Prompts e Skills de IA',
    'Automação WhatsApp com IA',
    'Meta Ads e Lucro Real DRE',
    'Google Workspace com Gemini',
    'Automação Empresarial Campo Grande MS',
  ],
  authors: [{ name: 'Marco Aurélio', url: 'https://www.promptpulse.com.br/sobre' }],
  metadataBase: new URL('https://www.promptpulse.com.br'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'PromptPulse | IA, MCP, Prompts e Automação de Lucro Real',
    description:
      'Infraestrutura prática de IA, MCP, Prompts & Skills e automação conectando anúncios, WhatsApp, Google Workspace e gestão financeira para empresas.',
    type: 'website',
    locale: 'pt_BR',
    siteName: 'PromptPulse',
    url: 'https://www.promptpulse.com.br',
  },
  other: {
    'google-adsense-account': 'ca-pub-7250158547119594',
  },
};

const organizationSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': 'https://www.promptpulse.com.br/#organization',
      name: 'PromptPulse',
      alternateName: 'Prompt Pulse',
      url: 'https://www.promptpulse.com.br',
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.promptpulse.com.br/marco-aurelio.jpg',
      },
      description:
        'Hub brasileiro de Inteligência Artificial aplicada a negócios, MCP (Model Context Protocol), Prompts & Skills operacionais, automação de WhatsApp, Google Workspace e inteligência de lucro real (DRE) em tráfego pago.',
      founder: {
        '@id': 'https://www.promptpulse.com.br/#author',
      },
      areaServed: {
        '@type': 'Country',
        name: 'Brasil',
      },
      knowsAbout: [
        'Model Context Protocol (MCP)',
        'Inteligência Artificial para Empresas',
        'Engenharia de Prompts e Agent Skills',
        'Auditoria de Meta Ads e Google Ads',
        'Automação Comercial no WhatsApp (WABA)',
        'DRE e Lucro Real em Tráfego Pago',
        'Google Workspace e Gemini',
      ],
    },
    {
      '@type': 'Person',
      '@id': 'https://www.promptpulse.com.br/#author',
      name: 'Marco Aurélio',
      jobTitle: 'Fundador da PromptPulse | Especialista em IA, MCP & Performance',
      url: 'https://www.promptpulse.com.br/sobre',
      image: 'https://www.promptpulse.com.br/marco-aurelio.jpg',
      worksFor: {
        '@id': 'https://www.promptpulse.com.br/#organization',
      },
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Campo Grande',
        addressRegion: 'MS',
        addressCountry: 'BR',
      },
    },
    {
      '@type': 'WebSite',
      '@id': 'https://www.promptpulse.com.br/#website',
      url: 'https://www.promptpulse.com.br',
      name: 'PromptPulse',
      inLanguage: 'pt-BR',
      publisher: {
        '@id': 'https://www.promptpulse.com.br/#organization',
      },
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={`${geistSans.variable} ${geistMono.variable} dark antialiased scroll-smooth`}>
      <head>
        {/* Google Tag Manager (GTM-MCVPZWBB) */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-MCVPZWBB');`,
          }}
        />
        {/* Google AdSense */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7250158547119594"
          crossOrigin="anonymous"
        />
        {/* Entity & GEO Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-neutral-950 text-neutral-100 selection:bg-cyan-500/30 selection:text-cyan-200">
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-MCVPZWBB"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        {/* Google Analytics (gtag.js) */}
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-37BX3JQLY4"
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
        >
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-37BX3JQLY4');
          `}
        </Script>
        <Navbar />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
