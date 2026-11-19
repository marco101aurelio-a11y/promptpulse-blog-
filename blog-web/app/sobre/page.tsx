import { Sparkles, Cpu, Target, ShieldCheck, Mail, BarChart3 } from 'lucide-react';

export const metadata = {
  title: 'Sobre o PromptPulse | IA, MCP, Prompts e Lucro Real',
  description:
    'Conheça o PromptPulse, fundado por Marco Aurélio em Campo Grande - MS: autoridade prática em MCP (Model Context Protocol), Prompts & Skills, automação de WhatsApp, Google Workspace e lucro real em anúncios.',
  alternates: {
    canonical: '/sobre',
  },
};

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-xs font-semibold text-cyan-400 mb-4">
          <Sparkles className="w-3.5 h-3.5" />
          Nossa História, Tese & Autoridade
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Sobre o <span className="bg-gradient-to-r from-cyan-400 via-indigo-400 to-fuchsia-400 bg-clip-text text-transparent">PromptPulse</span>
        </h1>
        <p className="mt-4 text-base sm:text-lg text-neutral-400 max-w-2xl mx-auto">
          Transformando Inteligência Artificial, <strong>Prompts & Skills</strong> e o protocolo <strong>MCP</strong> em autonomia operacional e lucro real no caixa de pequenas e médias empresas no Brasil.
        </p>
      </div>

      <div className="space-y-10 text-neutral-300 leading-relaxed">
        <section className="p-8 rounded-2xl bg-neutral-900/60 border border-neutral-800 space-y-4">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Target className="w-5 h-5 text-cyan-400" />
            Nossa Tese Editorial & Prática
          </h2>
          <p>
            A maioria dos conteúdos sobre Inteligência Artificial na internet para na superfície: prompts soltos que geram textos genéricos, mas não movem o ponteiro financeiro da empresa. O <strong>PromptPulse</strong> nasceu em <strong>Campo Grande - MS</strong>, liderado por <strong>Marco Aurélio</strong>, com o propósito oposto: traduzir engenharia de IA, <strong>Model Context Protocol (MCP)</strong> e automação comercial em sistemas que geram resultado mensurável.
          </p>
          <p>
            Acreditamos que o empresário não precisa virar programador nem ficar refém de relatórios obscuros para saber onde o dinheiro está vazando — seja no atendimento do WhatsApp, nas campanhas de Meta Ads e Google Ads, no controle financeiro (DRE) ou na rotina diária do Google Workspace.
          </p>
        </section>

        <section className="p-8 rounded-2xl bg-neutral-900/60 border border-neutral-800 space-y-4">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Cpu className="w-5 h-5 text-indigo-400" />
            Nossos 4 Pilares de Conteúdo
          </h2>
          <ul className="list-disc list-inside space-y-2.5 text-neutral-300">
            <li>
              <strong>MCP (Model Context Protocol) & Agentes Autônomos:</strong> Como conectar modelos como Claude e Google Gemini a sistemas reais (ERPs, CRMs, WhatsApp e bancos de dados) com governança e segurança.
            </li>
            <li>
              <strong>Tráfego Pago, WhatsApp & Lucro Real (DRE):</strong> Como ir além de métricas de vaidade como &ldquo;conversa iniciada&rdquo; no Meta Ads e Google Ads, auditando o funil do clique até a margem líquida no caixa.
            </li>
            <li>
              <strong>Engenharia de Prompts & Agent Skills:</strong> Frameworks, System Prompts blindados e Skills reutilizáveis prontos para aplicar em vendas, gestão, metas e operação.
            </li>
            <li>
              <strong>Produtividade Executiva no Google Workspace:</strong> Fluxos nativos integrando Google Gemini, Keep, Tarefas, Planilhas, Docs e Agenda em ciclos semanais e mensais automatizados.
            </li>
          </ul>
        </section>

        <section className="p-8 rounded-2xl bg-neutral-900/60 border border-neutral-800 space-y-4">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            Compromisso de Governança (Zero Hype)
          </h2>
          <p>
            Todo guia publicado no PromptPulse segue três princípios: aplicabilidade real para pequenos e médios negócios brasileiros, respeito à segurança de dados e LGPD (com supervisão <em>Human-in-the-Loop</em>) e foco implacável em retorno prático sobre o tempo e o capital investido.
          </p>
        </section>

        <section className="p-8 rounded-2xl bg-neutral-900/60 border border-neutral-800 flex flex-col sm:flex-row items-center gap-6">
          <img
            src="/marco-aurelio.jpg"
            alt="Marco Aurélio — Fundador do PromptPulse"
            className="w-20 h-20 rounded-full object-cover border-2 border-cyan-500/40 shrink-0"
          />
          <div className="space-y-2 text-center sm:text-left">
            <h2 className="text-lg font-bold text-white flex items-center justify-center sm:justify-start gap-2">
              <BarChart3 className="w-4 h-4 text-cyan-400" />
              Quem Escreve: Marco Aurélio
            </h2>
            <p className="text-sm text-neutral-400">
              Especialista em Marketing de Performance, Arquitetura de Dados/DRE, Automação Comercial via WhatsApp (WABA) e Inteligência Artificial aplicada a negócios (MCP, Claude e Google Gemini). Atua a partir de Campo Grande - MS atendendo e educando empresários e gestores em todo o Brasil.
            </p>
          </div>
        </section>

        <section id="contato" className="p-8 rounded-2xl bg-gradient-to-r from-indigo-950/40 to-neutral-900 border border-indigo-500/30 space-y-4">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Mail className="w-5 h-5 text-fuchsia-400" />
            Fale Conosco
          </h2>
          <p className="text-sm text-neutral-400">
            Dúvidas, sugestões de pautas, convites ou parcerias estratégicas? Fale diretamente com nossa equipe:
          </p>
          <div className="inline-block px-4 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-cyan-400 font-mono text-sm">
            contato@promptpulse.com.br
          </div>
        </section>
      </div>
    </div>
  );
}
