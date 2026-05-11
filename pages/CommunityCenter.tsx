import React from 'react';
import { Users, HandHeart, Calendar, School, Lightbulb, MessageCircle, Heart } from 'lucide-react';

const CommunityCenter: React.FC = () => {
    const parentsPillars = [
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

    const studentsPillars = [
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
                {/* Page Header */}
                <div className="text-center mb-20">
                    <span className="text-school-gold font-bold uppercase tracking-widest text-sm">Nuestra Comunidad</span>
                    <h1 className="font-heading text-4xl md:text-5xl font-bold text-school-navy mt-4 mb-6">Organizaciones Comunitarias</h1>
                    <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                        Nuestra comunidad educativa se fortalece a través de la participación activa de padres y estudiantes, quienes trabajan en conjunto por la formación integral.
                    </p>
                </div>

                {/* ===== CENTRO DE PADRES ===== */}
                <div id="padres" className="mb-24">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="h-1 w-12 bg-school-gold"></div>
                        <h2 className="font-heading text-3xl md:text-4xl font-bold text-school-navy">Centro de Padres y Apoderados</h2>
                    </div>
                    <p className="text-gray-600 max-w-3xl text-lg mb-10 leading-relaxed">
                        El Centro General de Padres y Apoderados es el organismo que representa a las familias de nuestro colegio. Su propósito es estrechar vínculos entre el hogar y el establecimiento, colaborando con la misión educativa y fomentando el compromiso de los padres en la formación de sus hijos.
                    </p>

                    <div className="grid md:grid-cols-3 gap-8 max-w-6xl">
                        {parentsPillars.map((pillar, idx) => (
                            <div key={idx} className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 group text-center">
                                <div className="w-16 h-16 bg-blue-50 text-school-blue rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-school-navy group-hover:text-white transition-colors duration-300">
                                    {pillar.icon}
                                </div>
                                <h3 className="font-bold text-xl text-gray-800 mb-4">{pillar.title}</h3>
                                <p className="text-gray-600 leading-relaxed">{pillar.desc}</p>
                            </div>
                        ))}
                    </div>

                    <div className="mt-10 bg-white p-8 rounded-xl shadow-sm border border-gray-100 max-w-4xl">
                        <div className="flex flex-col md:flex-row items-center gap-8">
                            <div className="flex-shrink-0 p-6 bg-blue-50 rounded-full text-school-gold">
                                <Users size={48} />
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-school-navy mb-4">Nuestro Compromiso</h3>
                                <p className="text-gray-700 leading-relaxed">
                                    Creemos firmemente que la educación es una tarea compartida. Por ello, trabajamos para crear espacios de encuentro, formación y participación para todos los apoderados, velando siempre por el bienestar y desarrollo integral de nuestros estudiantes.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Separator */}
                <div className="border-t-2 border-school-gold/20 my-16 w-3/4 mx-auto"></div>

                {/* ===== CENTRO DE ALUMNOS ===== */}
                <div id="alumnos">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="h-1 w-12 bg-school-gold"></div>
                        <h2 className="font-heading text-3xl md:text-4xl font-bold text-school-navy">Centro de Alumnos (CEAL)</h2>
                    </div>
                    <p className="text-gray-600 max-w-3xl text-lg mb-10 leading-relaxed">
                        El Centro de Alumnos es la organización democrática que representa a todos los estudiantes de nuestro colegio. Su misión es canalizar las inquietudes y proyectos del alumnado, promoviendo el pensamiento crítico, la participación cívica y los valores institucionales.
                    </p>

                    <div className="grid md:grid-cols-3 gap-8 max-w-6xl">
                        {studentsPillars.map((obj, idx) => (
                            <div key={idx} className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 group text-center">
                                <div className="w-16 h-16 bg-blue-50 text-school-blue rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-school-navy group-hover:text-white transition-colors duration-300">
                                    {obj.icon}
                                </div>
                                <h3 className="font-bold text-xl text-gray-800 mb-4">{obj.title}</h3>
                                <p className="text-gray-600 leading-relaxed">{obj.desc}</p>
                            </div>
                        ))}
                    </div>

                    <div className="mt-10 bg-white p-8 rounded-xl shadow-sm border border-gray-100 max-w-4xl text-center mx-auto md:mx-0 md:text-left">
                        <div className="flex flex-col md:flex-row items-center gap-6">
                            <Users size={48} className="text-school-gold flex-shrink-0" />
                            <div>
                                <h3 className="text-2xl font-bold text-school-navy mb-2">Directiva Actual</h3>
                                <p className="text-gray-600">
                                    La directiva del Centro de Alumnos es elegida democráticamente cada año por sus pares para liderar y organizar las actividades estudiantiles.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CommunityCenter;
