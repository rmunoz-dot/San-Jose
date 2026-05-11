import React from 'react';
import { Users, HandHeart, Calendar, School } from 'lucide-react';

const ParentsCenter: React.FC = () => {
    const pillars = [
        {
            icon: <School size={32} />,
            title: "Colaboración Educativa",
            desc: "Apoyar la labor educativa del colegio, facilitando la comunicación y el entendimiento mutuo entre familias y escuela."
        },
        {
            icon: <HandHeart size={32} />,
            title: "Acción Social",
            desc: "Organizar y participar en iniciativas solidarias y de beneficencia en apoyo a familias de la comunidad que lo necesiten."
        },
        {
            icon: <Calendar size={32} />,
            title: "Participación en Actividades",
            desc: "Colaborar activamente en la organización de eventos escolares, actos cívicos y celebraciones institucionales."
        }
    ];

    return (
        <section className="py-20 bg-gray-50 min-h-screen">
            <div className="container mx-auto px-6 pt-10">
                <div className="text-center mb-16">
                    <span className="text-school-gold font-bold uppercase tracking-widest text-sm">Familia y Escuela</span>
                    <h1 className="font-heading text-4xl md:text-5xl font-bold text-school-navy mt-4 mb-6">Centro de Padres y Apoderados (CGPA)</h1>
                    <p className="text-gray-600 max-w-2xl mx-auto text-lg mb-10">
                        El Centro General de Padres y Apoderados es el organismo que representa a las familias de nuestro colegio. Su propósito es estrechar vínculos entre el hogar y el establecimiento, colaborando con la misión educativa y fomentando el compromiso de los padres en la formación de sus hijos.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {pillars.map((pillar, idx) => (
                        <div key={idx} className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 group text-center">
                            <div className="w-16 h-16 bg-blue-50 text-school-blue rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-school-navy group-hover:text-white transition-colors duration-300">
                                {pillar.icon}
                            </div>
                            <h3 className="font-bold text-xl text-gray-800 mb-4">{pillar.title}</h3>
                            <p className="text-gray-600 leading-relaxed">
                                {pillar.desc}
                            </p>
                        </div>
                    ))}
                </div>

                <div className="mt-16 bg-white p-8 rounded-xl shadow-sm border border-gray-100 max-w-4xl mx-auto">
                    <div className="flex flex-col md:flex-row items-center gap-8">
                        <div className="flex-shrink-0 p-6 bg-blue-50 rounded-full text-school-gold">
                            <Users size={48} />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-school-navy mb-4">Nuestro Compromiso</h2>
                            <p className="text-gray-700 leading-relaxed">
                                Creemos firmemente que la educación es una tarea compartida. Por ello, trabajamos para crear espacios de encuentro, formación y participación para todos los apoderados, velando siempre por el bienestar y desarrollo integral de nuestros estudiantes.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ParentsCenter;
