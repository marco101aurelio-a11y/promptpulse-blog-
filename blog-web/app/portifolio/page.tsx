import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import PortfolioClient from '@/components/PortfolioClient';

// Flag para ocultar completamente a página /portifolio do público.
// Mude para false quando quiser reativar a visualização da página.
const IS_PORTFOLIO_HIDDEN = true;

export const metadata: Metadata = {
  title: 'Página Não Encontrada | PromptPulse',
  robots: {
    index: false,
    follow: false,
  },
};

export default function PortifolioPage() {
  if (IS_PORTFOLIO_HIDDEN) {
    notFound();
  }

  return <PortfolioClient />;
}
