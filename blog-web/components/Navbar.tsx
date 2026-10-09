'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Sparkles, Menu, X, Cpu, Zap, Search, Bookmark } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-neutral-950/80 border-b border-neutral-800/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 via-indigo-500 to-fuchsia-500 p-0.5 shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform duration-300">
              <div className="w-full h-full bg-neutral-950 rounded-[10px] flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-cyan-400 group-hover:rotate-12 transition-transform duration-300" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-lg tracking-tight text-white flex items-center gap-1.5">
                Prompt<span className="bg-gradient-to-r from-cyan-400 via-indigo-400 to-fuchsia-400 bg-clip-text text-transparent">Pulse</span>
              </span>
              <span className="text-[10px] text-neutral-400 font-medium tracking-wider uppercase -mt-1">
                IA & Produtividade
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="/"
              className="text-sm font-medium text-neutral-300 hover:text-white transition-colors flex items-center gap-1.5"
            >
              Início
            </Link>
            <Link
              href="/#artigos"
              className="text-sm font-medium text-neutral-300 hover:text-white transition-colors flex items-center gap-1.5"
            >
              <Cpu className="w-4 h-4 text-cyan-400" />
              Inteligência Artificial
            </Link>
            <Link
              href="/#artigos"
              className="text-sm font-medium text-neutral-300 hover:text-white transition-colors flex items-center gap-1.5"
            >
              <Zap className="w-4 h-4 text-amber-400" />
              Produtividade
            </Link>
            <Link
              href="/sobre"
              className="text-sm font-medium text-neutral-300 hover:text-white transition-colors"
            >
              Sobre Nós
            </Link>
          </nav>

          {/* Action CTA */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              href="#newsletter"
              className="px-4 py-2 rounded-lg text-xs font-semibold text-white bg-gradient-to-r from-indigo-500 to-cyan-500 hover:from-indigo-600 hover:to-cyan-600 shadow-md shadow-indigo-500/20 hover:shadow-indigo-500/30 transition-all active:scale-95"
            >
              Receber Dicas VIP
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition"
              aria-label="Menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6 text-white" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="md:hidden bg-neutral-900/95 border-b border-neutral-800 px-4 pt-3 pb-5 space-y-3">
          <Link
            href="/"
            onClick={() => setIsOpen(false)}
            className="block px-3 py-2 rounded-lg text-base font-medium text-white hover:bg-neutral-800"
          >
            Início
          </Link>
          <Link
            href="/#artigos"
            onClick={() => setIsOpen(false)}
            className="block px-3 py-2 rounded-lg text-base font-medium text-neutral-300 hover:text-white hover:bg-neutral-800"
          >
            Artigos de IA
          </Link>
          <Link
            href="/sobre"
            onClick={() => setIsOpen(false)}
            className="block px-3 py-2 rounded-lg text-base font-medium text-neutral-300 hover:text-white hover:bg-neutral-800"
          >
            Sobre o Blog
          </Link>
          <Link
            href="#newsletter"
            onClick={() => setIsOpen(false)}
            className="block w-full text-center px-4 py-2.5 rounded-lg text-sm font-semibold text-white bg-gradient-to-r from-indigo-500 to-cyan-500"
          >
            Assinar Newsletter Grátis
          </Link>
        </div>
      )}
    </header>
  );
}
