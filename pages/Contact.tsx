
import React from 'react';
import { Mail, Phone, MapPin, Clock, Facebook, Instagram } from 'lucide-react';
import ContactForm from '../components/ContactForm';

const Contact: React.FC = () => {
    return (
        <div className="min-h-screen bg-gray-50 pt-32 pb-20">
            <div className="container mx-auto px-6">
                <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in-up">
                    <span className="text-school-gold font-bold uppercase tracking-widest text-sm">Contacto</span>
                    <h1 className="text-4xl md:text-5xl font-heading font-bold text-school-navy mt-4 mb-6">Estamos aquí para ayudarte</h1>
                    <p className="text-lg text-gray-600 leading-relaxed">
                        Si tienes dudas sobre el proceso de admisión, certificados, o necesitas información general sobre nuestro colegio, no dudes en escribirnos.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                    {/* Contact Info Sidebar */}
                    <div className="lg:col-span-5 space-y-8 animate-fade-in-left">
                        <div className="bg-school-navy text-white p-8 md:p-10 rounded-3xl shadow-xl relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-school-gold/10 rounded-full -mr-16 -mt-16 transition-transform duration-500 group-hover:scale-110"></div>
                            
                            <h2 className="text-2xl font-bold mb-8 relative z-10">Información de Contacto</h2>
                            
                            <ul className="space-y-8 relative z-10">
                                <li className="flex items-start gap-5">
                                    <div className="bg-white/10 p-3 rounded-xl text-school-gold shrink-0 mt-1">
                                        <MapPin size={24} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-school-gold text-xs uppercase tracking-wider mb-1">Dirección Básica</h4>
                                        <p className="text-gray-100">Santa Petronila Nº3, Estación Central, Santiago</p>
                                    </div>
                                </li>
                                <li className="flex items-start gap-5">
                                    <div className="bg-white/10 p-3 rounded-xl text-school-gold shrink-0 mt-1">
                                        <MapPin size={24} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-school-gold text-xs uppercase tracking-wider mb-1">Dirección Jardín</h4>
                                        <p className="text-gray-100">Santa Petronila Nº17, Estación Central, Santiago</p>
                                    </div>
                                </li>
                                <li className="flex items-start gap-5">
                                    <div className="bg-white/10 p-3 rounded-xl text-school-gold shrink-0 mt-1">
                                        <Phone size={24} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-school-gold text-xs uppercase tracking-wider mb-1">Teléfonos de contacto</h4>
                                        <p className="text-gray-100">+56 2 2517 6548</p>
                                    </div>
                                </li>
                                <li className="flex items-start gap-5">
                                    <div className="bg-white/10 p-3 rounded-xl text-school-gold shrink-0 mt-1">
                                        <Mail size={24} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-school-gold text-xs uppercase tracking-wider mb-1">Correo Electrónico</h4>
                                        <p className="text-gray-100">contacto@sanjoseschool.cl</p>
                                    </div>
                                </li>
                                <li className="flex items-start gap-5">
                                    <div className="bg-white/10 p-3 rounded-xl text-school-gold shrink-0 mt-1">
                                        <Clock size={24} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-school-gold text-xs uppercase tracking-wider mb-1">Horario de Atención</h4>
                                        <p className="text-gray-100">Lunes a Viernes: 08:00 - 17:00 hrs</p>
                                    </div>
                                </li>
                            </ul>

                            <div className="mt-12 pt-8 border-t border-white/10 flex gap-4">
                                <a href="https://www.facebook.com/profile.php?id=100057686138539" target="_blank" rel="noopener noreferrer" className="p-3 bg-white/10 rounded-xl hover:bg-school-gold hover:text-school-navy transition-all">
                                    <Facebook size={24} />
                                </a>
                                <a href="https://www.instagram.com/sanjoseschool_cl/" target="_blank" rel="noopener noreferrer" className="p-3 bg-white/10 rounded-xl hover:bg-school-gold hover:text-school-navy transition-all">
                                    <Instagram size={24} />
                                </a>
                            </div>
                        </div>

                        {/* Map or additional info can go here */}
                        <div className="rounded-3xl overflow-hidden shadow-lg border border-gray-200 h-64">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d831.7!2d-70.7042813!3d-33.4548055!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9662c4880361c04d%3A0xc2fd6a3ca27e97cf!2sSta.%20Petronila%203%2C%20Estaci%C3%B3n%20Central!5e0!3m2!1ses-419!2scl!4v1714422201201!5m2!1ses-419!2scl"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                title="Mapa Colegio San José"
                            ></iframe>
                        </div>
                    </div>

                    {/* Form Area */}
                    <div className="lg:col-span-7 animate-fade-in-right">
                        <ContactForm />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
