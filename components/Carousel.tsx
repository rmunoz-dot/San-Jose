import React, { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CarouselProps {
    images: string[];
    autoPlayInterval?: number;
    className?: string;
    imageClassName?: string;
    indicatorsClassName?: string;
    overlay?: React.ReactNode;
}

const Carousel: React.FC<CarouselProps> = ({
    images,
    autoPlayInterval = 5000,
    className = "",
    imageClassName = "object-cover",
    indicatorsClassName = "absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20",
    overlay
}) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextSlide = useCallback(() => {
        setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, [images.length]);

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    };

    const goToSlide = (index: number) => {
        setCurrentIndex(index);
    };

    useEffect(() => {
        if (autoPlayInterval <= 0) return;
        const interval = setInterval(nextSlide, autoPlayInterval);
        return () => clearInterval(interval);
    }, [nextSlide, autoPlayInterval]);

    if (!images.length) return null;

    return (
        <div className={`w-full h-full overflow-hidden group ${className || 'relative'}`}>
            {/* Slides */}
            <div
                className="w-full h-full flex transition-transform duration-700 ease-in-out"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
                {images.map((src, index) => (
                    <div key={index} className="w-full h-full flex-shrink-0 relative">
                        <img
                            src={src}
                            alt={`Slide ${index + 1}`}
                            className={`w-full h-full ${imageClassName}`}
                        />
                        {overlay && <div className="absolute inset-0 z-10">{overlay}</div>}
                    </div>
                ))}
            </div>

            {/* Navigation Arrows */}
            <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/30 hover:bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-all z-20"
            >
                <ChevronLeft size={32} />
            </button>
            <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/30 hover:bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-all z-20"
            >
                <ChevronRight size={32} />
            </button>

            {/* Dots */}
            <div className={indicatorsClassName}>
                {images.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={`w-3 h-3 rounded-full transition-all ${currentIndex === index ? 'bg-white scale-110' : 'bg-white/50 hover:bg-white/80'
                            }`}
                    />
                ))}
            </div>
        </div>
    );
};

export default Carousel;
