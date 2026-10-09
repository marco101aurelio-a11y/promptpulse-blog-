import { Sparkles, Cpu, Target, ShieldCheck, Mail } from 'lucide-react';

export const metadata = {
  title: 'Sobre Nós | PromptPulse',
  description: 'Conheça a missão do PromptPulse: democratizar a inteligência artificial e a automação de produtividade para todos.',
};

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-xs font-semibold text-cyan-400 mb-4">
          <Sparkles className="w-3.5 h-3.5" />
          Nossa História & Propósito
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Sobre o <span className="bg-gradient-to-r from-cyan-400 via-indigo-400 to-fuchsia-400 bg-clip-text text-transparent">PromptPulse</span>
        </h1>
        <p className="mt-4 text-base sm:text-lg text-neutral-400 max-w-2xl mx-auto">
          Capacitando profissionais e empreendedores a alcançarem seu potencial máximo através de Inteligência Artificial e automações inteligentes.
        </p>
      </div>

      <div className="space-y-12 text-neutral-300 leading-relaxed">
        <section className="p-8 rounded-2xl bg-neutral-900/60 border border-neutral-800 space-y-4">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Target className="w-5 h-5 text-cyan-400" />
            Nossa Missão
          </h2>
          <p>
            A inteligência artificial não veio para substituir o ser humano, mas para potencializar o que fazemos de melhor. Acreditamos que qualquer profissional, independentemente do nível técnico, pode economizar horas preciosas toda semana ao adotar as ferramentas certas.
          </p>
        </section>

        <section className="p-8 rounded-2xl bg-neutral-900/60 border border-neutral-800 space-y-4">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Cpu className="w-5 h-5 text-indigo-400" />
            O que Publicamos
          </h2>
          <ul className="list-disc list-inside space-y-2 text-neutral-300">
            <li>Análises comparativas de modelos de IA (OpenAI, DeepSeek, Claude, Google Gemini).</li>
            <li>Templates e engenharia de prompts prontos para copiar e colar.</li>
            <li>Guias práticos de automação sem código (Zapier, Make, Notion).</li>
            <li>Estratégias comprovadas para aumento de foco e produtividade.</li>
          </ul>
        </section>

        <section id="contato" className="p-8 rounded-2xl bg-gradient-to-r from-indigo-950/40 to-neutral-900 border border-indigo-500/30 space-y-4">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Mail className="w-5 h-5 text-fuchsia-400" />
            Fale Conosco
          </h2>
          <p className="text-sm text-neutral-400">
            Dúvidas, sugestões de pautas ou parcerias comerciais? Entre em contato pelo e-mail:
          </p>
          <div className="inline-block px-4 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-cyan-400 font-mono text-sm">
            contato@promptpulse.com.br
          </div>
        </section>
      </div>
    </div>
  );
}
