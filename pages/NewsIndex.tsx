import React, { useState, useEffect } from 'react';
import { getNews, NewsItem } from '../data/news';
import { Link } from 'react-router-dom';
import { Calendar, ArrowRight, Search, Loader } from 'lucide-react';

const NewsIndex: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('Todas');
    const [newsData, setNewsData] = useState<NewsItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchNews = async () => {
            setIsLoading(true);
            const fetchedNews = await getNews();
            // Sort by ID essentially gives chronological descending order if using timestamp or auto ID, 
            // but realistically you'd sort by a `createdAt` field in the future.
            setNewsData(fetchedNews);
            setIsLoading(false);
        };
        fetchNews();
    }, []);

    // Extract unique categories
    const categories = ['Todas', ...new Set(newsData.map(item => item.category))];

    // Filter logic
    const filteredNews = newsData.filter(item => {
        const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'Todas' || item.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    return (
        <section className="py-20 bg-gray-50 min-h-screen">
            <div className="container mx-auto px-6 pt-10">
                <div className="text-center mb-16 animate-fade-in-up">
                    <span className="text-school-gold font-bold uppercase tracking-widest text-sm">Actualidad Institucional</span>
                    <h1 className="font-heading text-4xl md:text-5xl font-bold text-school-navy mt-4 mb-6">Noticias y Circulares</h1>
                    <p className="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed">
                        Mantente informado de todas las actividades, logros y comunicados de nuestra comunidad educativa.
                    </p>
                </div>

                {/* Filters */}
                <div className="mb-12 flex flex-col md:flex-row gap-4 items-center justify-between bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                    <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto">
                        {categories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                className={`px-4 py-2 rounded-lg text-sm font-bold whitespace-nowrap transition-colors ${selectedCategory === cat
                                    ? 'bg-school-navy text-white'
                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                    <div className="relative w-full md:w-64">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input
                            type="text"
                            placeholder="Buscar noticia..."
                            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-school-gold/50"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                {/* Grid */}
                {isLoading ? (
                    <div className="flex justify-center items-center py-20 gap-4 text-school-navy">
                        <Loader className="animate-spin" size={32} />
                        <span className="font-semibold text-lg">Cargando noticias...</span>
                    </div>
                ) : filteredNews.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredNews.map((item) => (
                            <Link to={`/noticias/${item.id}`} key={item.id} className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group border border-gray-100 flex flex-col h-full transform hover:-translate-y-1">
                                <div className="relative h-56 overflow-hidden">
                                    <div className="absolute top-4 left-4 z-10 bg-school-gold text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                                        {item.category}
                                    </div>
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        className="w-full h-full object-cover object-top transform group-hover:scale-105 transition-transform duration-500"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                </div>
                                <div className="p-6 flex flex-col flex-grow">
                                    <div className="flex items-center gap-2 text-gray-400 text-sm mb-3">
                                        <Calendar size={14} strokeWidth={1.5} />
                                        <span>{item.date}</span>
                                    </div>
                                    <h3 className="font-heading font-bold text-xl text-gray-800 mb-3 line-clamp-2 group-hover:text-school-navy transition-colors">
                                        {item.title}
                                    </h3>
                                    <div className="mt-auto pt-4 flex items-center justify-between border-t border-gray-50">
                                        <span className="text-school-navy font-semibold text-sm flex items-center gap-2 group-hover:gap-3 transition-all">
                                            Leer noticia <ArrowRight size={16} strokeWidth={1.5} />
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20">
                        <p className="text-gray-500 text-lg">No se encontraron noticias que coincidan con tu búsqueda.</p>
                        <button
                            onClick={() => { setSearchTerm(''); setSelectedCategory('Todas'); }}
                            className="text-school-blue font-bold mt-2 hover:underline"
                        >
                            Limpiar filtros
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
}
export default NewsIndex;
