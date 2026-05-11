import React from 'react';
import { MapPin, Clock, Phone, Mail, Sparkles, Navigation } from 'lucide-react';
import { useImages } from '../hooks/useImages';

const EscuelaParvulos: React.FC = () => {
    const { getImage, students, building } = useImages();

    // Getting some relevant images
    const heroImage = getImage('frontis parvulos.webp') || 'https://picsum.photos/seed/parvulo/1920/1080';
    // Parvulos often have specific filenames if any, but since we don't know we just use some students images
    const gallery = students.filter(img => img.includes('parvulo')).slice(0, 3);
    if (gallery.length < 3) gallery.push(...students.slice(0, 3 - gallery.length));

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            {/* Hero Section */}
            <section className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img
                        src={heroImage}
                        alt="Escuela de Párvulos San José"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-school-navy/70 mix-blend-multiply"></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-80"></div>
                </div>

                <div className="container mx-auto px-6 relative z-10 text-center animate-fade-in-up">
                    <span className="inline-block py-1 px-4 rounded-full bg-white/20 backdrop-blur-sm text-yellow-300 font-bold tracking-widest uppercase text-sm mb-6 border border-yellow-300/30">
                        Pre-Kínder y Kínder
                    </span>
                    <h1 className="text-4xl md:text-6xl font-heading font-bold text-white mb-6 leading-tight max-w-4xl mx-auto shadow-sm">
                        Escuela de Párvulos San José
                    </h1>
                    <p className="text-xl text-gray-100 max-w-2xl mx-auto font-light leading-relaxed">
                        El inicio del camino. Un espacio seguro, inclusivo y estimulante dedicado exclusivamente al desarrollo de la primera infancia.
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
                                <h2 className="text-3xl font-heading font-bold text-school-navy mb-6">El Primer Paso Educativo</h2>
                                <p className="text-gray-600 leading-relaxed text-lg mb-6">
                                    Nuestra Escuela de Párvulos opera con administración independiente, contando con su propia infraestructura especialmente diseñada para acoger a nuestros niños y niñas de Pre-Kínder y Kínder en un espacio seguro y resguardado que estimula su alegría y curiosidad innata.
                                </p>
                                <p className="text-gray-600 leading-relaxed text-lg mb-8">
                                    Entendemos que la primera infancia es crucial. Por eso contamos con educadoras especialistas comprometidas con entregar herramientas lúdicas, emocionales y cognitivas. Además, mantenemos convenios de salud como las atenciones dentales a través de JUNAEB, velando por el bienestar integral de cada niño.
                                </p>

                                <div className="grid sm:grid-cols-2 gap-4">
                                    {[
                                        "Infraestructura a Escala Infantil",
                                        "Patios de Juegos Seguros",
                                        "Educadoras de Párvulos Especializadas",
                                        "Convenio Salud Dental JUNAEB",
                                        "Desarrollo Socioemocional",
                                        "Estimulación Temprana del Lenguaje"
                                    ].map((item, idx) => (
                                        <div key={idx} className="flex items-start gap-3 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                                            <Sparkles className="text-school-gold shrink-0 mt-0.5" size={20} />
                                            <span className="text-gray-800 font-semibold text-sm">{item}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Gallery */}
                            {gallery.length > 0 && (
                                <div className="pt-8 border-t border-gray-200">
                                    <h3 className="text-2xl font-bold font-heading text-gray-800 mb-6">Un Vistazo al Interior</h3>
                                    <div className="grid grid-cols-3 gap-4">
                                        {gallery.map((img, i) => (
                                            <div key={i} className="aspect-square rounded-2xl overflow-hidden shadow-sm hover:-translate-y-2 transition-transform duration-300">
                                                <img src={img} alt={"Parvulitas " + (i + 1)} className="w-full h-full object-cover" />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Contact & Map Sidebar */}
                        <div className="lg:col-span-5 relative">
                            <div className="bg-white rounded-3xl shadow-xl overflow-hidden sticky top-32 border border-yellow-100">
                                <div className="p-8">
                                    <h3 className="text-2xl font-bold text-school-navy mb-6 font-heading">Información de Contacto</h3>

                                    <ul className="space-y-6">
                                        <li className="flex items-start gap-4">
                                            <div className="bg-yellow-50 p-3 rounded-full text-yellow-600">
                                                <MapPin size={24} />
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-gray-900">Dirección Párvulos</h4>
                                                <p className="text-gray-600 mt-1">Sta. Petronila 17, 9170364 Santiago, Estación Central, Región Metropolitana</p>
                                            </div>
                                        </li>
                                        <li className="flex items-start gap-4">
                                            <div className="bg-yellow-50 p-3 rounded-full text-yellow-600">
                                                <Clock size={24} />
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-gray-900">Horario de Atención</h4>
                                                <p className="text-gray-600 mt-1">Lunes a Viernes: 08:00 - 17:00 hrs</p>
                                            </div>
                                        </li>
                                        <li className="flex items-start gap-4">
                                            <div className="bg-yellow-50 p-3 rounded-full text-yellow-600">
                                                <Phone size={24} />
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-gray-900">Teléfono</h4>
                                                <p className="text-gray-600 mt-1">+56 2 2517 6548</p>
                                            </div>
                                        </li>
                                    </ul>
                                </div>

                                {/* Map */}
                                <div className="h-64 w-full relative bg-gray-200">
                                    <iframe
                                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d831.7!2d-70.7044375!3d-33.4541875!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9662c462aed0bf81%3A0xa1f1f5c7cd9e0e20!2sSta.%20Petronila%2017%2C%20Estaci%C3%B3n%20Central!5e0!3m2!1ses-419!2scl!4v1714422201202!5m2!1ses-419!2scl"
                                        width="100%"
                                        height="100%"
                                        style={{ border: 0 }}
                                        allowFullScreen
                                        loading="lazy"
                                        referrerPolicy="no-referrer-when-downgrade"
                                        title="Mapa Escuela Párvulos San José"
                                        className=""
                                    ></iframe>
                                    <a
                                        href="https://www.google.com/maps/place/Sta.+Petronila+17,+9170364+Estaci%C3%B3n+Central,+Regi%C3%B3n+Metropolitana/@-33.4541875,-70.7044375,17z"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="absolute bottom-4 right-4 bg-yellow-400 text-yellow-900 font-bold px-4 py-2 rounded shadow-lg hover:bg-yellow-500 hover:text-white transition-colors flex items-center gap-2 text-sm z-10"
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

export default EscuelaParvulos;
