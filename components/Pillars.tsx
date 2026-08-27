import React, { useMemo } from 'react';
import { useImages } from '../hooks/useImages';

interface PillarProps {
  title: string;
  description: string;
  image: string;
}

const PillarCard: React.FC<PillarProps> = ({ title, description, image }) => (
  <div className="flex flex-col items-center text-center group">
    {/* Rounded Rectangle Image Container */}
    <div className="w-full h-64 md:h-80 overflow-hidden rounded-3xl shadow-lg mb-8 relative">
      <div className="absolute inset-0 bg-school-navy/20 group-hover:bg-school-navy/0 transition-colors z-10 duration-500"></div>
      <img
        src={image}
        alt={title}
        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
      />
    </div>

    <h3 className="font-heading text-2xl font-bold text-school-navy mb-4 group-hover:text-school-gold transition-colors">
      {title}
    </h3>
    <p className="text-gray-600 leading-relaxed px-4">
      {description}
    </p>
  </div>
);

const Pillars: React.FC = () => {
  const { getImage } = useImages();

  const pillarImages = useMemo(() => {
    return [
      getImage('educacionintegral.webp') || 'https://picsum.photos/seed/school_learning/600/800',
      getImage('ambiente propicio.webp') || 'https://picsum.photos/seed/school_environment/600/800',
      getImage('estudiantes grupo 2.webp') || 'https://picsum.photos/seed/school_participation/600/800',
      getImage('inclusividad.webp') || 'https://picsum.photos/seed/school_inclusion/600/800',
    ];
  }, []);

  const pillars = [
    {
      title: 'Educación Integral',
      description: 'Integra formación académica, valores sólidos y desarrollo emocional para formar líderes.',
      image: pillarImages[0],
    },
    {
      title: 'Ambiente Propicio',
      description: 'Entorno inclusivo, seguro y estimulante donde los estudiantes desarrollan su potencial.',
      image: pillarImages[1],
    },
    {
      title: 'Participación',
      description: 'Fomentamos la integración, donde todos colaboran, aprenden y crecen juntos.',
      image: pillarImages[2],
    },
    {
      title: 'Inclusividad',
      description: 'Promovemos el respeto y apoyo, asegurando que todos sean valorados por igual.',
      image: pillarImages[3],
    },
  ];

  return (
    <section className="py-20 bg-school-light/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <h2 className="font-heading text-4xl font-bold text-gray-900 mb-4">Nuestros Pilares</h2>
          <div className="h-1 w-20 bg-school-gold mx-auto mb-6"></div>
          <p className="text-gray-600">
            Fundamentos que guían nuestra labor educativa diaria para formar personas íntegras.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {pillars.map((pillar, index) => (
            <PillarCard key={index} {...pillar} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pillars;
