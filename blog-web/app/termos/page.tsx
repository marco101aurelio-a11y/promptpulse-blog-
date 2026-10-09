import { FileText } from 'lucide-react';

export const metadata = {
  title: 'Termos de Uso | PromptPulse',
  description: 'Termos e condições de uso do site PromptPulse.',
};

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16 text-neutral-300 leading-relaxed space-y-8">
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-xs font-semibold text-cyan-400 mb-4">
          <FileText className="w-3.5 h-3.5" />
          Termos e Condições
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Termos de Uso
        </h1>
        <p className="text-sm text-neutral-500 mt-2">Última atualização: Outubro de 2026</p>
      </div>

      <div className="space-y-6 bg-neutral-900/50 p-8 rounded-2xl border border-neutral-800">
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-white">1. Aceitação dos Termos</h2>
          <p>
            Ao acessar e utilizar o site PromptPulse (promptpulse.com.br), você concorda em cumprir e estar vinculado aos seguintes termos e condições de uso.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-white">2. Propriedade Intelectual</h2>
          <p>
            Todo o conteúdo publicado neste blog, incluindo textos, logotipos, tutoriais e análises, é protegido pelas leis de direitos autorais. O compartilhamento é permitido desde que atribuída a devida fonte com link direto para o artigo original.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-white">3. Isenção de Responsabilidade</h2>
          <p>
            As opiniões e recomendações expressas nos artigos têm caráter puramente informativo e educacional. Não garantimos resultados específicos com o uso de ferramentas de terceiros ou IAs mencionadas.
          </p>
        </section>
      </div>
    </div>
  );
}
