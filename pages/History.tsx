import React, { useMemo } from 'react';
import { useImages } from '../hooks/useImages';
import { History as HistoryIcon, MapPin } from 'lucide-react';

const History: React.FC = () => {
    const { getImage } = useImages();

    const historyImage = useMemo(() => {
        return getImage('frontis colegio.webp') || 'https://picsum.photos/seed/school_frontis/800/600';
    }, []);

    const entornoMapSrc = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3326.8!2d-70.7042813!3d-33.4548055!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9662c4880361c04d%3A0xc2fd6a3ca27e97cf!2sSta.%20Petronila%203%2C%20Estaci%C3%B3n%20Central!5e1!3m2!1ses-419!2scl!4v1714422201201!5m2!1ses-419!2scl';

    return (
        <section className="py-20 bg-gray-50 min-h-screen">
            <div className="container mx-auto px-6 pt-10">
                <div className="text-center mb-16 animate-fade-in-up">
                    <span className="text-school-gold font-bold uppercase tracking-widest text-sm">Nuestro Colegio</span>
                    <h1 className="font-heading text-4xl md:text-5xl font-bold text-school-navy mt-4 mb-6">Nuestra Historia</h1>
                </div>

                <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden mb-20 animate-fade-in-up">
                    <div className="flex flex-col lg:flex-row">
                        <div className="lg:w-5/12 relative aspect-square lg:aspect-auto">
                            <img src={historyImage} alt="Frontis San José School" className="absolute inset-0 w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-school-navy/20"></div>
                        </div>
                        <div className="lg:w-7/12 p-8 md:p-12 flex flex-col justify-center">
                            <div className="flex items-center gap-3 mb-6">
                                <HistoryIcon className="text-school-gold" size={32} />
                                <h2 className="text-3xl font-heading font-bold text-school-navy">Reseña Histórica</h2>
                            </div>
                            <div className="space-y-4 text-gray-700 leading-relaxed">
                                <p>
                                    La Escuela básica San José School nace de la iniciativa de los profesores <strong>Carlos Arturo Navarro Serey</strong> y <strong>María Trinidad López Douglas</strong> el día 26 de octubre del año 1982. Ambos docentes dedicados toda la vida a enseñar, en ellos surge la convicción de aportar a la comunidad que los vio crecer, con educación de calidad y muy cercana, familiar y con valores y principios que demandaba la sociedad de la época. Inicialmente parten con cursos combinados de kínder a segundo básico para posteriormente ir ampliando a otros niveles, con la clara idea de incorporar todos los cursos de enseñanza básica.
                                </p>
                                <p>
                                    En el año 2016 se conforma la <strong>Corporación Educacional San José School</strong>, en el marco de la Reforma Educacional, cumpliendo así con los requerimientos que establece la Ley de Inclusión, que incorpora la gratuidad para los establecimientos educacionales que reciben aportes del estado.
                                </p>
                                <p>
                                    Actualmente el establecimiento funciona como escuela básica, gratuita con <strong>Proyecto de Integración Escolar (PIE)</strong> y atiende cursos de primero a octavo básico con una matrícula cercana a los 300 estudiantes.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                    <div className="flex flex-col lg:flex-row-reverse">
                        <div className="lg:w-5/12 relative aspect-square lg:aspect-auto overflow-hidden">
                            <iframe
                                src={entornoMapSrc}
                                width="100%"
                                height="100%"
                                style={{ border: 0, position: 'absolute', inset: 0 }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                title="Mapa del entorno San José School"
                            ></iframe>
                        </div>
                        <div className="lg:w-7/12 p-8 md:p-12 flex flex-col justify-center border-t border-gray-100 lg:border-t-0 lg:border-r">
                            <div className="flex items-center gap-3 mb-6">
                                <MapPin className="text-school-gold" size={32} />
                                <h2 className="text-3xl font-heading font-bold text-school-navy">Antecedentes del Entorno</h2>
                            </div>
                            <p className="text-gray-700 leading-relaxed">
                                La Escuela básica San José School se encuentra ubicada en una zona residencial de Estación Central, muy cercana a sistemas de transportes tales como; buses interurbanos, metro, ferrocarriles, Transantiago. El entorno ha experimentado un alto desarrollo inmobiliario y en general es un barrio tranquilo. Sin embargo en los alrededores se pueden observar algunas poblaciones que presentan índices altos de vulnerabilidad social.
                            </p>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default History;
