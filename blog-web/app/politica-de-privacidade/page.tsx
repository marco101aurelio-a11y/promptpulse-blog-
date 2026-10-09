import { Shield } from 'lucide-react';

export const metadata = {
  title: 'Política de Privacidade | PromptPulse',
  description: 'Conheça nossa política de privacidade e proteção de dados em conformidade com a LGPD e Google AdSense.',
};

export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16 text-neutral-300 leading-relaxed space-y-8">
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-xs font-semibold text-cyan-400 mb-4">
          <Shield className="w-3.5 h-3.5" />
          Transparência & LGPD
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Política de Privacidade
        </h1>
        <p className="text-sm text-neutral-500 mt-2">Última atualização: Outubro de 2026</p>
      </div>

      <div className="space-y-6 bg-neutral-900/50 p-8 rounded-2xl border border-neutral-800">
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-white">1. Informações Gerais</h2>
          <p>
            A sua privacidade é fundamental para a PromptPulse. Esta política descreve como coletamos, usamos e protegemos as informações fornecidas pelos visitantes ao navegar em nosso site (promptpulse.com.br).
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-white">2. Coleta de Informações e Cookies</h2>
          <p>
            Utilizamos cookies e tecnologias similares para melhorar sua experiência de navegação, entender como os usuários interagem com nosso conteúdo e exibir anúncios relevantes. Você pode desativar os cookies a qualquer momento nas configurações do seu navegador.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-white">3. Publicidade e Google AdSense</h2>
          <p>
            Nosso site pode exibir anúncios veiculados pelo Google AdSense ou parceiros terceirizados. O Google utiliza cookies (como o cookie DoubleClick) para veicular anúncios com base nas visitas anteriores dos usuários a este ou a outros sites na internet. Os usuários podem desativar a publicidade personalizada acessando as Configurações de Anúncios do Google.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-white">4. Newsletter e Dados de Contato</h2>
          <p>
            Ao se inscrever voluntariamente em nossa newsletter, coletamos apenas seu endereço de e-mail para envio de conteúdos e novidades semanais. Seus dados nunca serão vendidos ou compartilhados com terceiros para fins comerciais não autorizados.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-white">5. Contato</h2>
          <p>
            Para qualquer dúvida ou solicitação relacionada aos seus dados, entre em contato através de: <span className="text-cyan-400 font-mono">privacidade@promptpulse.com.br</span>.
          </p>
        </section>
      </div>
    </div>
  );
}
