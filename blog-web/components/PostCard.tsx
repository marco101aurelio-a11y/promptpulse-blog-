import Link from 'next/link';
import Image from 'next/image';
import { Calendar, Clock, ArrowRight, Tag } from 'lucide-react';
import { Post } from '@/lib/posts';

interface PostCardProps {
  post: Post;
  priority?: boolean;
}

export default function PostCard({ post, priority = false }: PostCardProps) {
  return (
    <article className="group relative flex flex-col bg-neutral-900/60 hover:bg-neutral-900 border border-neutral-800/80 hover:border-neutral-700/80 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-indigo-500/10 hover:-translate-y-1">
      {/* Imagem de Capa */}
      <Link href={`/posts/${post.slug}`} className="relative aspect-[16/10] w-full overflow-hidden bg-neutral-950 block">
        <img
          src={post.coverImage}
          alt={post.title}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          loading={priority ? 'eager' : 'lazy'}
        />
        {/* Badge da Categoria */}
        <div className="absolute top-3 left-3">
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-neutral-950/80 backdrop-blur-md text-cyan-300 border border-cyan-500/30 shadow-sm">
            {post.category}
          </span>
        </div>
      </Link>

      {/* Conteúdo do Card */}
      <div className="flex flex-col flex-1 p-5 sm:p-6">
        {/* Metadados (Data e Leitura) */}
        <div className="flex items-center gap-4 text-xs text-neutral-400 mb-3">
          <span className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-neutral-500" />
            {post.date}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-neutral-500" />
            {post.readTime}
          </span>
        </div>

        {/* Título */}
        <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-cyan-400 transition-colors line-clamp-2 mb-3 leading-snug">
          <Link href={`/posts/${post.slug}`}>
            {post.title}
          </Link>
        </h3>

        {/* Resumo / Excerpt */}
        <p className="text-sm text-neutral-400 line-clamp-3 mb-6 flex-1 leading-relaxed">
          {post.excerpt}
        </p>

        {/* Rodapé do Card */}
        <div className="flex items-center justify-between pt-4 border-t border-neutral-800/80 mt-auto">
          {/* Autor */}
          <div className="flex items-center gap-2.5">
            <img
              src={post.author.avatar}
              alt={post.author.name}
              className="w-7 h-7 rounded-full object-cover border border-neutral-700"
            />
            <span className="text-xs font-medium text-neutral-300">
              {post.author.name}
            </span>
          </div>

          {/* Botão Ler Mais */}
          <Link
            href={`/posts/${post.slug}`}
            className="text-xs font-semibold text-cyan-400 group-hover:text-cyan-300 flex items-center gap-1 transition-all group-hover:translate-x-0.5"
          >
            Ler Artigo
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </article>
  );
}
