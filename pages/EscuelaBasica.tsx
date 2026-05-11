import React from 'react';
import { MapPin, Clock, Phone, Mail, CheckCircle2, Navigation } from 'lucide-react';
import { useImages } from '../hooks/useImages';

const EscuelaBasica: React.FC = () => {
    const { getImage, students, building } = useImages();

    // Getting some relevant images
    const heroImage = getImage('frontis colegio.webp') || 'https://picsum.photos/seed/colegio/1920/1080';

    // Get random students or use all students but limited.
    const gallery = students.slice(0, 3);
    if (gallery.length < 3) gallery.push(...building.slice(0, 3 - gallery.length));

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            {/* Hero Section */}
            <section className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img
                        src={heroImage}
                        alt="Escuela Básica San José"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-school-navy/80 mix-blend-multiply"></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-80"></div>
                </div>

                <div className="container mx-auto px-6 relative z-10 text-center animate-fade-in-up">
                    <span className="inline-block py-1 px-4 rounded-full bg-school-gold/20 backdrop-blur-sm text-school-gold font-bold tracking-widest uppercase text-sm mb-6 border border-school-gold/30">
                        1º a 8º Básico
                    </span>
                    <h1 className="text-4xl md:text-6xl font-heading font-bold text-white mb-6 leading-tight max-w-4xl mx-auto shadow-sm">
                        Escuela Básica San José School
                    </h1>
                    <p className="text-xl text-gray-200 max-w-2xl mx-auto font-light leading-relaxed">
                        Formación académica sólida y valórica, preparando a los estudiantes para los desafíos del futuro con un enfoque integral.
                    </p>
                </div>
            </section>

            {/* Main Content */}
            <section className="py-20 flex-grow">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">

                        {/* Info Section */}
                        <div className="lg:col-span-7 space-y-12">
                            <div>
                                <h2 className="text-3xl font-heading font-bold text-school-navy mb-6">Nuestra Esencia Escolar</h2>
                                <p className="text-gray-600 leading-relaxed text-lg mb-6">
                                    Fundada en 1982 por los docentes Carlos Navarro Serey y María Trinidad López Douglas, nuestra Escuela Básica mantiene un curso por nivel desde 1° a 8° Básico, con un promedio de 30 alumnos por aula y régimen de Jornada Escolar Completa (JEC). Nuestras salas de clases, laboratorios y recintos deportivos están diseñados para fomentar el saber académico y los valores que caracterizan a los estudiantes del San José School.
                                </p>
                                <p className="text-gray-600 leading-relaxed text-lg mb-8">
                                    Creemos profundamente en el modelo educativo inclusivo. Nuestro Programa de Integración Escolar (PIE) cuenta con un equipo multidisciplinario de psicólogos y educadores diferenciales que trabajan en co-docencia con los profesores de aula, atendiendo las necesidades educativas especiales de cada estudiante.
                                </p>

                                <div className="grid sm:grid-cols-2 gap-4">
                                    {[
                                        "Jornada Escolar Completa (JEC)",
                                        "Programa de Integración Escolar (PIE)",
                                        "Talleres Extraescolares y Deportivos",
                                        "Equipo Docente Altamente Calificado",
                                        "Acompañamiento Psicoeducativo",
                                        "Infraestructura Tecnológica"
                                    ].map((item, idx) => (
                                        <div key={idx} className="flex items-start gap-3">
                                            <CheckCircle2 className="text-school-gold shrink-0 mt-1" size={20} />
                                            <span className="text-gray-700 font-medium">{item}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Gallery */}
                            {gallery.length > 0 && (
                                <div className="pt-8 border-t border-gray-200">
                                    <h3 className="text-2xl font-bold font-heading text-gray-800 mb-6">Nuestros Espacios</h3>
                                    <div className="grid grid-cols-3 gap-4">
                                        {gallery.map((img, i) => (
                                            <div key={i} className="aspect-square rounded-xl overflow-hidden shadow-sm">
                                                <img src={img} alt={"Instalación " + (i + 1)} className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Contact & Map Sidebar */}
                        <div className="lg:col-span-5 relative">
                            <div className="bg-white rounded-2xl shadow-xl overflow-hidden sticky top-32 border border-gray-100">
                                <div className="p-8">
                                    <h3 className="text-2xl font-bold text-school-navy mb-6 font-heading">Información de Contacto</h3>

                                    <ul className="space-y-6">
                                        <li className="flex items-start gap-4">
                                            <div className="bg-school-light p-3 rounded-full text-school-blue">
                                                <MapPin size={24} />
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-gray-900">Dirección</h4>
                                                <p className="text-gray-600 mt-1">Sta. Petronila 3, 9170383 Estación Central, Región Metropolitana</p>
                                            </div>
                                        </li>
                                        <li className="flex items-start gap-4">
                                            <div className="bg-school-light p-3 rounded-full text-school-blue">
                                                <Clock size={24} />
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-gray-900">Horario de Atención</h4>
                                                <p className="text-gray-600 mt-1">Lunes a Viernes: 08:00 - 17:00 hrs</p>
                                            </div>
                                        </li>
                                        <li className="flex items-start gap-4">
                                            <div className="bg-school-light p-3 rounded-full text-school-blue">
                                                <Phone size={24} />
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-gray-900">Teléfono</h4>
                                                <p className="text-gray-600 mt-1">+56 2 2517 6548</p>
                                            </div>
                                        </li>
                                        <li className="flex items-start gap-4">
                                            <div className="bg-school-light p-3 rounded-full text-school-blue">
                                                <Mail size={24} />
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-gray-900">Correo Electrónico</h4>
                                                <p className="text-gray-600 mt-1">contacto@sanjoseschool.cl</p>
                                            </div>
                                        </li>
                                    </ul>
                                </div>

                                {/* Map */}
                                <div className="h-64 w-full relative bg-gray-200">
                                    <iframe
                                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d831.7!2d-70.7042813!3d-33.4548055!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9662c4880361c04d%3A0xc2fd6a3ca27e97cf!2sSta.%20Petronila%203%2C%20Estaci%C3%B3n%20Central!5e0!3m2!1ses-419!2scl!4v1714422201201!5m2!1ses-419!2scl"
                                        width="100%"
                                        height="100%"
                                        style={{ border: 0 }}
                                        allowFullScreen
                                        loading="lazy"
                                        referrerPolicy="no-referrer-when-downgrade"
                                        title="Mapa Escuela Básica San José"
                                        className=""
                                    ></iframe>
                                    <a
                                        href="https://www.google.com/maps/place/Sta.+Petronila+3,+9170383+Estaci%C3%B3n+Central,+Regi%C3%B3n+Metropolitana/@-33.4548055,-70.7042813,17z"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="absolute bottom-4 right-4 bg-white text-school-navy font-bold px-4 py-2 rounded shadow-lg hover:bg-school-gold hover:text-white transition-colors flex items-center gap-2 text-sm z-10"
                                    >
                                        <Navigation size={16} /> Abrir en Maps
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default EscuelaBasica;
