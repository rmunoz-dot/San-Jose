import React, { useMemo } from 'react';
import { CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useImages } from '../hooks/useImages';

const About: React.FC = () => {
  const { getRandomStudents } = useImages();

  const aboutImage = useMemo(() => {
    const imgs = getRandomStudents(1);
    return imgs.length > 0 ? imgs[0] : 'https://picsum.photos/seed/school_gym_01/800/600';
  }, []);

  return (
    <section id="about" className="py-20 md:py-28 bg-white">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-16">

          {/* Text Content */}
          <div className="lg:w-1/2 order-2 lg:order-1">
            <h4 className="text-school-gold font-bold uppercase tracking-widest text-sm mb-2">Sobre Nosotros</h4>
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Educación con tradición
            </h2>
            <p className="text-gray-600 text-lg mb-6 leading-relaxed">
              Desde 1982, San José School entrega a sus alumnos y alumnas una educación integral y de alta calidad, fundamentada en la igualdad, la equidad y la atención a la diversidad.
            </p>
            <p className="text-gray-600 mb-8 leading-relaxed">
              Nuestro propósito es formar individuos autónomos, con pensamiento crítico y espíritu de superación, en un ambiente que se percibe como familiar y seguro. Contamos con un equipo multidisciplinario altamente comprometido con cada estudiante.
            </p>

            <ul className="space-y-4 mb-8">
              {[
                'Educación gratuita y de calidad',
                'Programa de Integración Escolar (PIE) inclusivo',
                'Formación valórica sólida y ambiente familiar'
              ].map((item, idx) => (
                <li key={idx} className="flex items-center gap-3">
                  <CheckCircle2 className="text-school-gold flex-shrink-0" size={20} strokeWidth={1.5} />
                  <span className="text-gray-700 font-medium">{item}</span>
                </li>
              ))}
            </ul>

            <Link to="/historia" className="inline-block text-school-navy font-bold border-b-2 border-school-navy pb-1 hover:text-school-gold hover:border-school-gold transition-colors">
              Leer Historia Completa
            </Link>
          </div>

          {/* Image Content */}
          <div className="lg:w-1/2 order-1 lg:order-2 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={aboutImage}
                alt="Instalaciones del colegio"
                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-school-navy/10 hover:bg-transparent transition-colors duration-300"></div>
            </div>
            {/* Badge floating */}
            <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-lg shadow-xl border-l-4 border-school-gold max-w-xs hidden md:block">
              <p className="font-heading font-bold text-school-navy text-4xl mb-1">40+</p>
              <p className="text-sm text-gray-500 font-medium uppercase tracking-wider">Años de experiencia educando</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default About;