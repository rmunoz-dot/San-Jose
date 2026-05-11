import React, { useMemo } from 'react';
import { ArrowRight } from 'lucide-react';
import { useImages } from '../hooks/useImages';
import Carousel from './Carousel';
import logo from '../assets/logotransparente.png';

const Hero: React.FC = () => {
  const { getImage, getRandomBuilding, getRandomStudents } = useImages();

  const bgImages = useMemo(() => {
    const selected = [
      getImage('frontis colegio.webp'),
      getImage('estudiantes aula 24.webp'),
      getImage('biblioteca colegio.webp'),
      getImage('sala de computación colegio.webp'),
      getImage('estudiantes grupo.webp')
    ].filter(Boolean) as string[];

    if (selected.length > 0) return selected;
    return getRandomBuilding(5);
  }, []);

  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Carousel Background with Overlay */}
      <Carousel
        images={bgImages}
        className="absolute inset-0 z-0"
        autoPlayInterval={6000}
        overlay={<div className="absolute inset-0 bg-black/20" />}
      />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-white flex flex-col md:flex-row items-stretch justify-between gap-12">
        <div className="max-w-3xl animate-fade-in-up md:w-1/2 flex flex-col justify-center">
          <h2 className="font-heading text-5xl md:text-7xl font-bold leading-tight mb-6">
            Educación con <br />
            <span className="text-school-light">Propósito</span>
          </h2>
          <p className="text-lg md:text-xl text-gray-200 mb-16 leading-relaxed max-w-2xl font-light">
            Desde 1982, San José School ofrece una formación integral y gratuita, acompañando a sus estudiantes desde la <strong>Escuela de Párvulos</strong> hasta la <strong>Enseñanza Básica</strong>. Educamos con valores, inclusión y compromiso para el futuro.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <a href="https://www.sistemadeadmisionescolar.cl/" target="_blank" rel="noopener noreferrer" className="group flex items-center justify-center gap-2 bg-gray-900 hover:bg-school-gold text-white px-8 py-4 rounded font-bold uppercase tracking-wider transition-all duration-300 w-fit">
              Postulaciones
              <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} strokeWidth={1.5} />
            </a>
          </div>
        </div>

        <div className="hidden md:flex md:w-1/2 justify-center lg:justify-end lg:pr-12 items-center animate-fade-in-up py-4" style={{ animationDelay: '200ms' }}>
          <img
            src={logo}
            alt="Logo San José"
            className="w-auto h-full max-h-[480px] scale-[1.15] object-contain drop-shadow-[0_0_25px_rgba(255,255,255,0.2)]"
          />
        </div>
      </div>


    </section>
  );
};

export default Hero;
