import React, { useMemo } from 'react';
import { useImages } from '../hooks/useImages';
import Carousel from './Carousel';

const Facilities: React.FC = () => {
    const { getImage, getRandomBuilding } = useImages();
    // Take a large subset for the carousel
    const displayImages = useMemo(() => {
        const selected = [
            getImage('frontis colegio.webp'),
            getImage('cancha o patio aereo colegio.webp'),
            getImage('sala de computación colegio.webp'),
            getImage('biblioteca colegio.webp'),
            getImage('interior colegio.webp'),
            getImage('aula parvulos.webp')
        ].filter(Boolean) as string[];

        return selected.length > 0 ? selected : getRandomBuilding(10);
    }, []);

    return (
        <section className="py-20 bg-white" id="infraestructura">
            <div className="container mx-auto px-6">
                <div className="flex flex-col lg:flex-row gap-12 items-center">

                    <div className="lg:w-1/2">
                        <h4 className="text-school-gold font-bold uppercase tracking-widest text-sm mb-2">Infraestructura</h4>
                        <h2 className="font-heading text-4xl font-bold text-gray-900 mb-6">
                            Espacios diseñados para el aprendizaje
                        </h2>
                        <p className="text-gray-600 text-lg leading-relaxed mb-6">
                            Contamos con instalaciones modernas y seguras que fomentan el desarrollo académico, deportivo y social de nuestros alumnos.
                        </p>
                        <ul className="text-gray-600 space-y-2 mb-8">
                            <li>• Amplias salas de clases</li>
                            <li>• Sala de computación</li>
                            <li>• Biblioteca CRA</li>
                            <li>• Gimnasio techado</li>
                            <li>• Patio y multicancha aérea</li>
                            <li>• Amplios espacios para el deporte y la recreación</li>
                        </ul>
                    </div>

                    <div className="lg:w-1/2 w-full">
                        <div className="rounded-2xl overflow-hidden shadow-2xl h-[400px]">
                            <Carousel images={displayImages} autoPlayInterval={4000} />
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default Facilities;
