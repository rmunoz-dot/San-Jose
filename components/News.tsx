import React from 'react';
import { Calendar, ArrowRight } from 'lucide-react';

import { getNews, NewsItem } from '../data/news';
import { Link } from 'react-router-dom';

const NewsCard: React.FC<NewsItem> = ({ id, title, date, category, image }) => (
  <Link to={`/noticias/${id}`} className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow overflow-hidden group border border-gray-100 flex flex-col h-full">
    <div className="relative h-48 overflow-hidden">
      <div className="absolute top-4 left-4 z-10 bg-school-gold text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
        {category}
      </div>
      <img
        src={image}
        alt={title}
        className="w-full h-full object-cover object-top transform group-hover:scale-105 transition-transform duration-500"
      />
    </div>
    <div className="p-6 flex flex-col flex-grow">
      <div className="flex items-center gap-2 text-gray-400 text-sm mb-3">
        <Calendar size={14} strokeWidth={1.5} />
        <span>{date}</span>
      </div>
      <h3 className="font-heading font-bold text-xl text-gray-800 mb-3 line-clamp-2 group-hover:text-school-navy transition-colors">
        {title}
      </h3>
      <div className="mt-auto pt-4">
        <span className="text-school-navy font-semibold text-sm flex items-center gap-2 group-hover:gap-3 transition-all">
          Leer más <ArrowRight size={16} strokeWidth={1.5} />
        </span>
      </div>
    </div>
  </Link>
);

const News: React.FC = () => {
  const [newsItems, setNewsItems] = React.useState<NewsItem[]>([]);

  React.useEffect(() => {
    const fetchLatestNews = async () => {
      const allNews = await getNews();
      setNewsItems(allNews.slice(0, 3));
    };
    fetchLatestNews();
  }, []);

  return (
    <section id="news" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
          <div>
            <h4 className="text-school-gold font-bold uppercase tracking-widest text-sm mb-2">Actualidad</h4>
            <h2 className="font-heading text-4xl font-bold text-gray-900">Noticias y Circulares</h2>
          </div>
          <Link to="/noticias" className="px-6 py-2 border-2 border-school-navy text-school-navy font-bold rounded hover:bg-school-navy hover:text-white transition-colors">
            Ver Todas
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {newsItems.map((item, index) => (
            <NewsCard key={index} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default News;