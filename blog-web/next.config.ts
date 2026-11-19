import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  async redirects() {
    return [
      {
        source: '/portfolio',
        destination: '/portifolio',
        permanent: true,
      },
      {
        source: '/posts/do-keep-ao-relatorio-final-como-integrar-tarefas-drive-docs-e-spark-no-piloto-automatico',
        destination: '/posts/do-keep-ao-relatorio-final-como-integrar-tarefas-drive-docs-e-conversa-no-piloto-automatico',
        permanent: true,
      },
      {
        source: '/posts/google-sheets-com-gemini-e-spark-como-automatizar-relatorios-formulas-e-dashboards-sem-escrever-codigo',
        destination: '/posts/google-sheets-com-gemini-e-tarefas-como-automatizar-relatorios-formulas-e-dashboards-sem-escrever-codigo',
        permanent: true,
      },
      {
        source: '/posts/google-spark-e-gemini-como-criar-automacoes-nativas-conectando-keep-tarefas-e-calendario',
        destination: '/posts/google-tarefas-e-conversa-com-gemini-como-criar-automacoes-nativas-conectando-keep-tarefas-e-calendario',
        permanent: true,
      },
    ];
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
