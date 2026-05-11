import React from 'react';
import { Users, Lightbulb, MessageCircle, Heart } from 'lucide-react';

const StudentsCenter: React.FC = () => {
    const objectives = [
        {
            icon: <Lightbulb size={32} />,
            title: "Liderazgo y Participación",
            desc: "Fomentar el desarrollo de líderes positivos y la participación activa de todos los estudiantes en la vida escolar."
        },
        {
            icon: <MessageCircle size={32} />,
            title: "Voz Estudiantil",
            desc: "Representar las inquietudes, ideas y propuestas del alumnado ante las autoridades del colegio."
        },
        {
            icon: <Heart size={32} />,
            title: "Convivencia Escolar",
            desc: "Promover un ambiente de respeto, solidaridad y compañerismo entre todos los miembros de la comunidad educativa."
        }
    ];

    return (
        <section className="py-20 bg-gray-50 min-h-screen">
            <div className="container mx-auto px-6 pt-10">
                <div className="text-center mb-16">
                    <span className="text-school-gold font-bold uppercase tracking-widest text-sm">Comunidad Estudiantil</span>
                    <h1 className="font-heading text-4xl md:text-5xl font-bold text-school-navy mt-4 mb-6">Centro de Alumnos (CEAL)</h1>
                    <p className="text-gray-600 max-w-2xl mx-auto text-lg mb-10">
                        El Centro de Alumnos es la organización democrática que representa a todos los estudiantes de nuestro colegio. Su misión es canalizar las inquietudes y proyectos del alumnado, promoviendo el pensamiento crítico, la participación cívica y los valores institucionales.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {objectives.map((obj, idx) => (
                        <div key={idx} className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 group text-center">
                            <div className="w-16 h-16 bg-blue-50 text-school-blue rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-school-navy group-hover:text-white transition-colors duration-300">
                                {obj.icon}
                            </div>
                            <h3 className="font-bold text-xl text-gray-800 mb-4">{obj.title}</h3>
                            <p className="text-gray-600 leading-relaxed">
                                {obj.desc}
                            </p>
                        </div>
                    ))}
                </div>

                <div className="mt-16 bg-white p-8 rounded-xl shadow-sm border border-gray-100 max-w-4xl mx-auto text-center">
                    <div className="flex flex-col items-center gap-4">
                        <Users size={48} className="text-school-gold" />
                        <h2 className="text-2xl font-bold text-school-navy">Directiva Actual</h2>
                        <p className="text-gray-600">
                            La directiva del Centro de Alumnos es elegida democráticamente cada año por sus pares para liderar y organizar las actividades estudiantiles.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default StudentsCenter;
