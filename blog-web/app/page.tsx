import { getAllPosts, getAllCategories } from '@/lib/posts';
import FeaturedHero from '@/components/FeaturedHero';
import PostCard from '@/components/PostCard';
import Newsletter from '@/components/Newsletter';
import AdSlot from '@/components/AdSlot';
import { Sparkles, TrendingUp, Cpu, Zap, Compass } from 'lucide-react';

export default function HomePage() {
  const allPosts = getAllPosts();
  // O artigo mais recente publicado (allPosts[0]) assume SEMPRE o grande Destaque Principal (Hero) da Home
  const featuredPost = allPosts[0];
  const regularPosts = allPosts.slice(1);
  const categories = getAllCategories();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Banner de Destaque / Hero */}
      {featuredPost && <FeaturedHero post={featuredPost} />}

      {/* AdSense Topo */}
      <AdSlot position="header" />

      {/* Seção Principal de Artigos */}
      <section id="artigos" className="my-12">
        {/* Cabeçalho da Seção com Filtros de Categoria */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10 pb-6 border-b border-neutral-800">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2">
              <TrendingUp className="w-6 h-6 text-cyan-400" />
              Últimas Publicações
            </h2>
            <p className="text-neutral-400 text-sm mt-1">
              Guias completos, análises de ferramentas e tutoriais práticos
            </p>
          </div>

          {/* Categorias Rápidas */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-neutral-900 text-white border border-cyan-500/40 cursor-pointer">
              Todos ({allPosts.length})
            </span>
            {categories.map((category) => (
              <span
                key={category}
                className="px-3 py-1.5 rounded-xl text-xs font-medium bg-neutral-900/60 hover:bg-neutral-800 text-neutral-400 hover:text-white border border-neutral-800 transition cursor-pointer"
              >
                {category}
              </span>
            ))}
          </div>
        </div>

        {/* Grid de Artigos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {regularPosts.map((post, index) => (
            <PostCard key={post.slug} post={post} priority={index === 0} />
          ))}
        </div>
      </section>

      {/* Seção Newsletter */}
      <Newsletter />

      {/* AdSense Rodapé */}
      <AdSlot position="footer" />
    </div>
  );
}
