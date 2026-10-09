import Link from 'next/link';
import { Calendar, Clock, ArrowRight, Sparkles } from 'lucide-react';
import { Post } from '@/lib/posts';

interface FeaturedHeroProps {
  post: Post;
}

export default function FeaturedHero({ post }: FeaturedHeroProps) {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-neutral-900 via-neutral-900/90 to-neutral-950 border border-neutral-800 p-6 sm:p-10 mb-16 shadow-2xl">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Lado Esquerdo: Textos e Chamada */}
        <div className="lg:col-span-7 flex flex-col justify-center space-y-5">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
              <Sparkles className="w-3.5 h-3.5" />
              Destaque da Semana
            </span>
            <span className="text-xs text-neutral-400 font-medium">
              {post.category}
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight hover:text-cyan-400 transition-colors">
            <Link href={`/posts/${post.slug}`}>
              {post.title}
            </Link>
          </h1>

          <p className="text-neutral-400 text-sm sm:text-base leading-relaxed line-clamp-3">
            {post.excerpt}
          </p>

          <div className="flex flex-wrap items-center gap-5 text-xs text-neutral-400 pt-2">
            <div className="flex items-center gap-2">
              <img
                src={post.author.avatar}
                alt={post.author.name}
                className="w-8 h-8 rounded-full object-cover border border-neutral-700"
              />
              <span className="text-neutral-300 font-medium">{post.author.name}</span>
            </div>
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-neutral-500" />
              {post.date}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-neutral-500" />
              {post.readTime}
            </span>
          </div>

          <div className="pt-3">
            <Link
              href={`/posts/${post.slug}`}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm text-white bg-gradient-to-r from-cyan-500 via-indigo-500 to-fuchsia-500 hover:opacity-95 shadow-lg shadow-indigo-500/20 active:scale-95 transition-all"
            >
              Ler Artigo Completo
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Lado Direito: Imagem Imersiva */}
        <div className="lg:col-span-5">
          <Link href={`/posts/${post.slug}`} className="block relative aspect-[4/3] rounded-2xl overflow-hidden group shadow-xl border border-neutral-800">
            <img
              src={post.coverImage}
              alt={post.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </Link>
        </div>
      </div>
    </div>
  );
}
