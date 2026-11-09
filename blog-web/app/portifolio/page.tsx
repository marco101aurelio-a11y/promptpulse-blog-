import type { Metadata } from 'next';
import PortfolioClient from '@/components/PortfolioClient';

export const metadata: Metadata = {
  title: 'Marco Aurélio | Portfólio Martech, Performance, Automações & IA',
  description:
    'Portfólio interativo de Marco Aurélio de Amorim Santos: Especialista em Marketing de Performance, Arquitetura de Conversão Offline (BPMN 2.0 / GCLID), Modelagem de DRE/CAC, WABA e Inteligência Artificial (MCP / Python).',
  keywords: [
    'Marco Aurélio Marketing',
    'Martech',
    'Growth Engineer',
    'Conversão Offline Google Ads',
    'BPMN 2.0 CRM',
    'Gestor de Tráfego Campo Grande MS',
    'MCP Marketing',
    'API Oficial WhatsApp WABA',
  ],
  alternates: {
    canonical: '/portifolio',
  },
  openGraph: {
    title: 'Marco Aurélio | Engenheiro de Growth, Performance & Martech',
    description:
      'Conheça os sistemas, arquiteturas BPMN 2.0 de atribuição offline, simuladores de DRE/CAC e resultados auditados (+R$ 879k em PDV e 38 clínicas sob gestão).',
    url: 'https://www.promptpulse.com.br/portifolio',
    type: 'profile',
  },
};

export default function PortifolioPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    mainEntity: {
      '@type': 'Person',
      name: 'Marco Aurélio de Amorim Santos',
      jobTitle: 'Especialista em Marketing, Performance, Automações & IA (Martech)',
      email: 'mailto:marcoaureliomkt3@gmail.com',
      telephone: '+55-67-99620-9923',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Campo Grande',
        addressRegion: 'MS',
        addressCountry: 'BR',
      },
      knowsAbout: [
        'Google Ads',
        'Meta Ads (Graph API v25.0)',
        'Offline Conversion Tracking (GCLID / Google Ads API)',
        'BPMN 2.0 Process Architecture',
        'Model Context Protocol (MCP Traffic Orchestrator)',
        'Google JAX Financial & DRE Modeling (Capvi IA)',
        'WhatsApp Business API (WABA)',
        'Python Automation & FastAPI',
        'SEO & Generative Engine Optimization (GEO)',
      ],
      sameAs: [
        'https://github.com/marco101aurelio-a11y',
        'https://github.com/marco101aurelio-a11y/mcp',
        'https://github.com/marco101aurelio-a11y/projetoseo2',
      ],
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PortfolioClient />
    </>
  );
}

