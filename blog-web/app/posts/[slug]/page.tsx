import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getAllPosts, getPostBySlug } from '@/lib/posts';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Calendar, Clock, ArrowLeft, Share2, Tag, CheckCircle2 } from 'lucide-react';
import AdSlot from '@/components/AdSlot';
import PostCard from '@/components/PostCard';
import Newsletter from '@/components/Newsletter';

interface PostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: PostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {
      title: 'Artigo não encontrado | PromptPulse',
    };
  }

  return {
    title: `${post.title} | PromptPulse`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [post.coverImage],
      type: 'article',
      publishedTime: post.date,
      authors: [post.author.name],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: [post.coverImage],
    },
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const allPosts = getAllPosts();
  const relatedPosts = allPosts.filter((p) => p.slug !== post.slug).slice(0, 2);

  // Schema.org JSON-LD para Google Rich Snippets e Recomendação por IAs (GEO)
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://www.promptpulse.com.br/posts/${post.slug}`,
    },
    headline: post.title,
    description: post.excerpt,
    image: post.coverImage,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      '@type': 'Person',
      name: post.author.name,
      jobTitle: post.author.role,
    },
    publisher: {
      '@type': 'Organization',
      name: 'PromptPulse',
      url: 'https://www.promptpulse.com.br',
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.promptpulse.com.br/favicon.ico',
      },
    },
  };

  return (
    <article className="min-h-screen pb-20">
      {/* Script estruturado para SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Header do Artigo */}
      <div className="relative pt-8 pb-12 bg-neutral-950 border-b border-neutral-800/80">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          {/* Voltar */}
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-semibold text-neutral-400 hover:text-cyan-400 mb-6 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar para todos os artigos
          </Link>

          {/* Categoria */}
          <div className="mb-4">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
              {post.category}
            </span>
          </div>

          {/* Título Principal */}
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight mb-6">
            {post.title}
          </h1>

          {/* Resumo */}
          <p className="text-base sm:text-lg text-neutral-400 leading-relaxed mb-8">
            {post.excerpt}
          </p>

          {/* Informações do Autor e Metadados */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-neutral-800">
            <div className="flex items-center gap-3">
              <img
                src={post.author.avatar}
                alt={post.author.name}
                className="w-10 h-10 rounded-full object-cover border border-neutral-700"
              />
              <div>
                <p className="text-sm font-semibold text-white">{post.author.name}</p>
                <p className="text-xs text-neutral-400">{post.author.role}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 text-xs text-neutral-400">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-neutral-500" />
                {post.date}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-neutral-500" />
                {post.readTime}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Conteúdo Principal do Artigo */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-10">
        {/* Imagem de Capa em Alta Resolução */}
        <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden mb-10 shadow-2xl border border-neutral-800">
          <img
            src={post.coverImage}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* AdSense Slot no Topo do Artigo */}
        <AdSlot position="in-article" />

        {/* Corpo do Artigo Renderizado em Markdown com Tipografia Rica */}
        <div className="prose-content max-w-none text-neutral-300 leading-relaxed text-base sm:text-lg">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {post.content}
          </ReactMarkdown>
        </div>

        {/* Tags do Artigo */}
        {post.tags && post.tags.length > 0 && (
          <div className="mt-12 pt-6 border-t border-neutral-800 flex flex-wrap items-center gap-2">
            <span className="text-xs text-neutral-400 font-semibold flex items-center gap-1 mr-2">
              <Tag className="w-3.5 h-3.5" />
              Tópicos relacionados:
            </span>
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 rounded-lg text-xs font-medium bg-neutral-900 border border-neutral-800 text-neutral-300 hover:border-cyan-500/40 hover:text-cyan-400 transition cursor-default"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* AdSense Slot no Final do Artigo */}
        <AdSlot position="in-article" />

        {/* Bio do Autor */}
        <div className="my-12 p-6 sm:p-8 rounded-2xl bg-neutral-900/60 border border-neutral-800 flex flex-col sm:flex-row items-center sm:items-start gap-5 text-center sm:text-left">
          <img
            src={post.author.avatar}
            alt={post.author.name}
            className="w-16 h-16 rounded-full object-cover border-2 border-indigo-500/40"
          />
          <div className="space-y-2">
            <h4 className="text-base font-bold text-white flex items-center justify-center sm:justify-start gap-2">
              Escrito por {post.author.name}
              <CheckCircle2 className="w-4 h-4 text-cyan-400" />
            </h4>
            <p className="text-sm text-neutral-400 leading-relaxed">
              Criador de conteúdo apaixonado por produtividade, inteligência artificial e automações para transformar tarefas do dia a dia em fluxos inteligentes.
            </p>
          </div>
        </div>

        {/* Inscrição na Newsletter */}
        <Newsletter />

        {/* Artigos Relacionados */}
        {relatedPosts.length > 0 && (
          <div className="mt-16 pt-12 border-t border-neutral-800">
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-8">
              Você também pode gostar
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {relatedPosts.map((related) => (
                <PostCard key={related.slug} post={related} />
              ))}
            </div>
          </div>
        )}
      </div>
    </article>
  );
}
