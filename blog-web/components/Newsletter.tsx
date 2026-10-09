'use client';

import { useState } from 'react';
import { Mail, Sparkles, CheckCircle2 } from 'lucide-react';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <section id="newsletter" className="my-16 relative overflow-hidden rounded-3xl bg-gradient-to-b from-neutral-900 via-neutral-900 to-neutral-950 border border-neutral-800 p-8 sm:p-12">
      {/* Luz ambiente de fundo */}
      <div className="absolute -top-24 -right-24 w-80 h-80 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-cyan-500/20 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-2xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-neutral-800/80 border border-neutral-700 text-xs font-medium text-cyan-300 mb-6">
          <Sparkles className="w-3.5 h-3.5" />
          Newsletter VIP Semanal
        </div>

        <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-4">
          Receba as principais novidades de <span className="bg-gradient-to-r from-cyan-400 to-indigo-400 bg-clip-text text-transparent">IA & Produtividade</span>
        </h2>
        <p className="text-neutral-400 text-sm sm:text-base leading-relaxed mb-8">
          Junte-se a mais de 10.000 profissionais que recebem resumos práticos, novos prompts e ferramentas para economizar tempo todas as semanas.
        </p>

        {subscribed ? (
          <div className="flex items-center justify-center gap-2 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-sm font-medium animate-fadeIn">
            <CheckCircle2 className="w-5 h-5" />
            Inscrição confirmada com sucesso! Bem-vindo à lista VIP.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <div className="relative flex-1">
              <Mail className="w-5 h-5 text-neutral-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Seu melhor e-mail profissional"
                className="w-full pl-11 pr-4 py-3 rounded-xl bg-neutral-950 border border-neutral-800 text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition"
              />
            </div>
            <button
              type="submit"
              className="px-6 py-3 rounded-xl font-semibold text-sm text-white bg-gradient-to-r from-indigo-500 to-cyan-500 hover:from-indigo-600 hover:to-cyan-600 shadow-lg shadow-indigo-500/20 active:scale-95 transition-all"
            >
              Inscrever Grátis
            </button>
          </form>
        )}

        <p className="text-[11px] text-neutral-500 mt-4">
          Respeitamos sua privacidade. Cancele a qualquer momento com 1 clique.
        </p>
      </div>
    </section>
  );
}
