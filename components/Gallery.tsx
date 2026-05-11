
import React, { useState, useMemo } from 'react';
import { X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';
import { useImages } from '../hooks/useImages';

const Gallery: React.FC = () => {
  // 1. Dynamic import of images via hook
  const { getAllGallery } = useImages();

  const images = useMemo(() => {
    return getAllGallery();
  }, []);

  // 2. State for pagination and lightbox
  const [visibleCount, setVisibleCount] = useState(12);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const visibleImages = images.slice(0, visibleCount);
  const hasMore = visibleCount < images.length;

  const handleLoadMore = () => {
    setVisibleCount((prev) => Math.min(prev + 12, images.length));
  };

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);

  const nextImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setLightboxIndex((prev) => (prev === null || prev === images.length - 1 ? 0 : prev + 1));
  };

  const prevImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setLightboxIndex((prev) => (prev === null || prev === 0 ? images.length - 1 : prev - 1));
  };

  return (
    <section className="py-20 bg-gray-900 text-white" id="galeria">
      <div className="container mx-auto px-6 mb-12 text-center">
        <h2 className="font-heading text-4xl font-bold mb-4">Nuestra Galería</h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Momentos destacados de nuestra vida escolar, eventos y comunidad.
        </p>
      </div>

      <div className="container mx-auto px-6">
        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {visibleImages.map((src, index) => (
            <div
              key={index}
              className="group relative aspect-square overflow-hidden rounded-xl bg-gray-800 cursor-pointer"
              onClick={() => openLightbox(index)}
            >
              <img
                src={src}
                alt={`Galería ${index + 1} `}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 duration-300">
                <ZoomIn className="w-8 h-8 text-white drop-shadow-lg" />
              </div>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        {hasMore && (
          <div className="mt-12 text-center">
            <button
              onClick={handleLoadMore}
              className="px-8 py-3 bg-school-blue hover:bg-school-blue/90 text-white font-semibold rounded-full transition-all hover:scale-105 active:scale-95 shadow-lg shadow-school-blue/20"
            >
              Ver más fotos
            </button>
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm"
          onClick={closeLightbox}
        >
          <button
            className="absolute top-4 right-4 p-2 text-white/70 hover:text-white transition-colors"
            onClick={closeLightbox}
          >
            <X size={32} />
          </button>

          <button
            className="absolute left-4 p-4 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-all"
            onClick={prevImage}
          >
            <ChevronLeft size={40} />
          </button>

          <div
            className="relative max-w-7xl max-h-[90vh] w-full p-4 flex justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={images[lightboxIndex]}
              alt={`Vista completa ${lightboxIndex + 1} `}
              className="max-h-[85vh] max-w-full object-contain rounded-lg shadow-2xl"
            />
            <div className="absolute bottom-[-30px] text-white/50 text-sm">
              {lightboxIndex + 1} / {images.length}
            </div>
          </div>

          <button
            className="absolute right-4 p-4 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-all"
            onClick={nextImage}
          >
            <ChevronRight size={40} />
          </button>
        </div>
      )}
    </section>
  );
};

export default Gallery;