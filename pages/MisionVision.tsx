import React from 'react';
import { Target, Flag } from 'lucide-react';

const MisionVision: React.FC = () => {
    return (
        <section className="py-20 bg-gray-50 min-h-screen flex flex-col justify-center">
            <div className="container mx-auto px-6 pt-10">
                <div className="text-center mb-16 animate-fade-in-up">
                    <span className="text-school-gold font-bold uppercase tracking-widest text-sm">Nuestro Colegio</span>
                    <h1 className="font-heading text-4xl md:text-5xl font-bold text-school-navy mt-4 mb-6">Misión y Visión</h1>
                    <p className="text-gray-600 max-w-3xl mx-auto text-lg leading-relaxed">
                        El horizonte y el propósito que guían cada paso de nuestra comunidad educativa, formados bajo convicciones sólidas y de calidad.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 mb-16 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                    <div className="bg-white p-10 md:p-14 rounded-2xl shadow-lg border-t-4 border-school-gold hover:-translate-y-1 transition-transform">
                        <div className="flex items-center gap-4 mb-8">
                            <Target className="text-school-gold" size={48} />
                            <h2 className="text-4xl font-heading font-bold text-school-navy">Misión</h2>
                        </div>
                        <p className="text-gray-700 leading-relaxed text-lg italic">
                            "La Escuela Básica Particular San José School asume como misión enfrentar el desafío de brindar una educación de calidad, atendiendo a la diversidad y proporcionando a nuestros alumnos y alumnas los medios necesarios, para integrarlos efectivamente con conocimientos, habilidades, aptitudes y valores sólidos a esta sociedad. Nuestro sello la integración efectiva de todos los alumnos y alumnas independiente de sus capacidades o limitaciones, quienes serán atendidos en el marco de la equidad y la igualdad de oportunidades atendiendo sus NEE en nuestro proyecto de integración 'Juntos en la integración escolar'."
                        </p>
                    </div>

                    <div className="bg-white p-10 md:p-14 rounded-2xl shadow-lg border-t-4 border-school-blue hover:-translate-y-1 transition-transform">
                        <div className="flex items-center gap-4 mb-8">
                            <Flag className="text-school-blue" size={48} />
                            <h2 className="text-4xl font-heading font-bold text-school-navy">Visión</h2>
                        </div>
                        <p className="text-gray-700 leading-relaxed text-lg italic">
                            "La Escuela Básica Particular San José School propicia ambientes educativos que fomentan iniciativas emprendedoras de todos sus actores, con el compromiso de todos y cada uno en la formación de niños y niñas, en un proceso donde los padres, los educadores y los alumnos y alumnas del establecimiento trabajan mancomunadamente y cuyos resultados se orientan a una educación de calidad y a la formación con valores sólidos y capacidades y habilidades cognitivas, sociales, deportivas y afectivas consolidadas."
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default MisionVision;
