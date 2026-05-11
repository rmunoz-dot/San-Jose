import React, { useMemo } from 'react';
import { School, GraduationCap, ArrowRight } from 'lucide-react';
import { useImages } from '../hooks/useImages';
import { Link } from 'react-router-dom';

const Establishments: React.FC = () => {
    const { getImage, getRandomBuilding } = useImages();

    const images = useMemo(() => {
        const colegioImg = getImage('frontis colegio.webp') || getRandomBuilding(1)[0];
        const parvulosImg = getImage('frontis parvulos.webp') || getRandomBuilding(1)[0];
        return [colegioImg, parvulosImg];
    }, []);

    const establishments = [
        {
            title: "Escuela Básica San José School",
            subtitle: "1º a 8º Básico",
            description: "Formación académica sólida y valórica, preparando a los estudiantes para los desafíos del futuro con un enfoque integral.",
            image: images[0],
            icon: <School className="text-school-navy" size={32} strokeWidth={1.5} />,
            color: "school-navy",
            link: "/escuela-basica"
        },
        {
            title: "Escuela de Párvulos San José School",
            subtitle: "Pre-Kínder y Kínder",
            description: "El inicio del camino. Un espacio seguro, inclusivo y estimulante dedicado exclusivamente al desarrollo de la primera infancia.",
            image: images[1],
            icon: <GraduationCap className="text-school-gold" size={32} strokeWidth={1.5} />,
            color: "school-gold",
            link: "/escuela-parvulos"
        }
    ];

    return (
        <section className="py-20 bg-gray-50">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16 max-w-2xl mx-auto">
                    <span className="text-school-gold font-bold uppercase tracking-widest text-sm">Nuestros Espacios</span>
                    <h2 className="font-heading text-4xl font-bold text-school-navy mt-2 mb-4">Dos Establecimientos, Una Misión</h2>
                    <p className="text-gray-600">
                        Bajo la Corporación Educacional San José School, ambos establecimientos comparten una misma visión: educación integral, inclusiva y gratuita para cada etapa del desarrollo.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
                    {establishments.map((est, index) => (
                        <Link to={est.link} key={index} className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col h-full border border-gray-100">
                            {/* Image Container */}
                            <div className="h-64 overflow-hidden relative">
                                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors z-10 duration-500"></div>
                                <img
                                    src={est.image}
                                    alt={est.title}
                                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                                />
                                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-3 rounded-xl shadow-md z-20">
                                    {est.icon}
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-8 flex flex-col flex-grow">
                                <div>
                                    <span className={`inline-block py-1 px-3 rounded-full bg-${est.color === 'school-gold' ? 'yellow-100 text-yellow-800' : 'blue-100 text-blue-800'} text-xs font-bold uppercase tracking-wide mb-3 shadow-sm`}>
                                        {est.subtitle}
                                    </span>
                                    <h3 className="font-heading text-2xl font-bold text-gray-900 mb-3 group-hover:text-school-navy transition-colors">
                                        {est.title}
                                    </h3>
                                    <p className="text-gray-600 mb-6 leading-relaxed">
                                        {est.description}
                                    </p>
                                </div>
                                <div className="mt-auto pt-4 border-t border-gray-50 flex items-center gap-2 text-school-navy font-bold text-sm tracking-wide group/btn hover:text-school-gold transition-colors">
                                    CONOCE MÁS
                                    <ArrowRight size={16} className="group-hover:translate-x-1.5 transition-transform" />
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Establishments;
