'use client';

import Link from 'next/link';
import { Sparkles, Heart, Shield, FileText, Mail } from 'lucide-react';

export default function Footer() {
  const currentYear = 2026;

  return (
    <footer className="bg-neutral-950 border-t border-neutral-800 text-neutral-400 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Coluna 1: Sobre a Marca */}
          <div className="md:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-500 to-indigo-500 flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-lg text-white">
                Prompt<span className="text-cyan-400">Pulse</span>
              </span>
            </Link>
            <p className="text-sm text-neutral-400 max-w-md leading-relaxed">
              Seu portal definitivo sobre Inteligência Artificial, ferramentas de automação e estratégias práticas de produtividade para acelerar sua carreira e negócios.
            </p>
          </div>

          {/* Coluna 2: Navegação Rápida */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Navegação
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="hover:text-cyan-400 transition-colors">
                  Página Inicial
                </Link>
              </li>
              <li>
                <Link href="/#artigos" className="hover:text-cyan-400 transition-colors">
                  Últimos Artigos
                </Link>
              </li>
              <li>
                <Link href="/portifolio" className="text-cyan-400 hover:text-cyan-300 font-medium transition-colors">
                  Portfólio Martech (Marco Aurélio)
                </Link>
              </li>
              <li>
                <Link href="/sobre" className="hover:text-cyan-400 transition-colors">
                  Sobre Nós
                </Link>
              </li>
            </ul>
          </div>

          {/* Coluna 3: Legal & Privacidade (Obrigatório para AdSense) */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Legal & Políticas
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/politica-de-privacidade" className="hover:text-cyan-400 transition-colors flex items-center gap-1.5">
                  <Shield className="w-3.5 h-3.5" />
                  Política de Privacidade
                </Link>
              </li>
              <li>
                <Link href="/termos" className="hover:text-cyan-400 transition-colors flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5" />
                  Termos de Uso
                </Link>
              </li>
              <li>
                <Link href="/sobre#contato" className="hover:text-cyan-400 transition-colors flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5" />
                  Fale Conosco
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Linha Inferior de Direitos Autorais */}
        <div className="pt-8 border-t border-neutral-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-500 gap-4">
          <p>© {currentYear} PromptPulse. Todos os direitos reservados.</p>
          <p className="flex items-center gap-1">
            Feito para máxima velocidade & SEO
          </p>
        </div>
      </div>
    </footer>
  );
}
