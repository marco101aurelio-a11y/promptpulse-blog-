import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'content/posts');

export interface Post {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  coverImage: string;
  category: string;
  author: {
    name: string;
    avatar: string;
    role: string;
  };
  tags: string[];
  readTime: string;
  content: string;
  featured?: boolean;
}

export function getAllPosts(): Post[] {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames
    .filter((fileName) => fileName.endsWith('.md'))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, '');
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data, content } = matter(fileContents);

      // Calcular tempo de leitura estimado (aprox. 200 palavras por minuto)
      const wordCount = content.split(/\s+/).length;
      const calculatedReadTime = `${Math.ceil(wordCount / 200)} min de leitura`;

      return {
        slug,
        title: data.title || slug,
        date: data.date || '2026-10-08',
        excerpt: data.excerpt || content.slice(0, 160).replace(/[#*`]/g, '') + '...',
        coverImage: data.coverImage || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
        category: data.category || 'Inteligência Artificial',
        author: data.author || {
          name: 'Marco Aurélio',
          avatar: '/marco-aurelio.jpg',
          role: 'Especialista em IA & Produtividade'
        },
        tags: data.tags || ['IA', 'Tecnologia', 'Produtividade'],
        readTime: data.readTime || calculatedReadTime,
        content,
        featured: Boolean(data.featured)
      } as Post;
    });

  // Ordenar por data decrescente
  return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPostBySlug(slug: string): Post | null {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.md`);
    if (!fs.existsSync(fullPath)) return null;

    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    const wordCount = content.split(/\s+/).length;
    const calculatedReadTime = `${Math.ceil(wordCount / 200)} min de leitura`;

    return {
      slug,
      title: data.title || slug,
      date: data.date || '2026-10-08',
      excerpt: data.excerpt || content.slice(0, 160).replace(/[#*`]/g, '') + '...',
      coverImage: data.coverImage || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
      category: data.category || 'Inteligência Artificial',
      author: data.author || {
        name: 'Marco Aurélio',
        avatar: '/marco-aurelio.jpg',
        role: 'Especialista em IA & Produtividade'
      },
      tags: data.tags || ['IA', 'Tecnologia', 'Produtividade'],
      readTime: data.readTime || calculatedReadTime,
      content,
      featured: Boolean(data.featured)
    } as Post;
  } catch {
    return null;
  }
}

export function getAllCategories(): string[] {
  const posts = getAllPosts();
  const categories = new Set(posts.map((p) => p.category));
  return Array.from(categories);
}
