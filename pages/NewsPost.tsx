import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getNews, NewsItem } from '../data/news';
import { Calendar, ArrowLeft, Tag, Loader } from 'lucide-react';
import DOMPurify from 'dompurify';

const NewsPost: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [post, setPost] = useState<NewsItem | undefined>();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchPost = async () => {
            setIsLoading(true);
            const allNews = await getNews();
            setPost(allNews.find(n => n.id === id));
            setIsLoading(false);
        };
        fetchPost();
    }, [id]);

    // Sanitize HTML content to prevent XSS attacks
    const sanitizedContent = post?.content
        ? DOMPurify.sanitize(post.content, {
            ALLOWED_TAGS: ['p', 'br', 'b', 'i', 'u', 'strong', 'em', 'ul', 'ol', 'li', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'a', 'img', 'blockquote', 'span', 'div'],
            ALLOWED_ATTR: ['href', 'src', 'alt', 'title', 'class', 'target', 'rel'],
            ALLOW_DATA_ATTR: false,
        })
        : '';

    if (isLoading) {
        return (
            <div className="min-h-screen pt-32 flex flex-col items-center gap-4 text-school-navy container mx-auto px-6 font-semibold text-lg">
                <Loader className="animate-spin text-school-gold" size={40} />
                Cargando noticia...
            </div>
        )
    }

    if (!post) {
        return (
            <div className="min-h-screen pt-32 text-center container mx-auto px-6">
                <h2 className="text-2xl font-bold text-gray-700">Noticia no encontrada</h2>
                <Link to="/#news" className="text-school-blue hover:underline mt-4 inline-block">Volver a Noticias</Link>
            </div>
        );
    }

    return (
        <article className="min-h-screen bg-gray-50 pt-28 pb-20">
            <div className="container mx-auto px-6">
                <Link to="/#news" className="inline-flex items-center gap-2 text-school-navy hover:text-school-gold font-semibold mb-8 transition-colors">
                    <ArrowLeft size={20} />
                    Volver a Noticias
                </Link>

                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden max-w-4xl mx-auto">
                    {/* Hero Image */}
                    <div className="w-full bg-gray-900 relative flex justify-center max-h-[500px] overflow-hidden rounded-t-2xl">
                        <img src={post.image} alt={post.title} className="w-full h-full object-contain max-h-[500px]" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none"></div>
                        <div className="absolute bottom-6 left-6 md:left-10 text-white pr-6 md:pr-10 z-10 w-full">
                            <span className="inline-flex items-center gap-1 bg-school-gold px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2">
                                <Tag size={12} /> {post.category}
                            </span>
                            <h1 className="font-heading text-3xl md:text-5xl font-bold leading-tight">{post.title}</h1>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="p-8 md:p-12">
                        <div className="flex items-center gap-2 text-gray-400 text-sm mb-8 border-b border-gray-100 pb-4">
                            <Calendar size={16} />
                            <span>Publicado el {post.date}</span>
                        </div>

                        <div className="prose prose-lg text-gray-600 max-w-none font-light leading-relaxed" dangerouslySetInnerHTML={{ __html: sanitizedContent }}></div>
                    </div>
                </div>
            </div>
        </article>
    );
};

export default NewsPost;
