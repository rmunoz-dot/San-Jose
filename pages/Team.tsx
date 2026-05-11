import React, { useMemo } from 'react';
import { useImages } from '../hooks/useImages';
import mariaImg from '../images/staff/Maria Trinidad Lopez close.webp';
import carlosImg from '../images/staff/Carlos Navarro close.webp';
import constanzaImg from '../images/staff/CONSTANZA DEL CARMEN GUADALUPE CERRA close.webp';
import ximenaImg from '../images/staff/XIMENA ROSSANA LARENAS MONDACA close.webp';
import lauraImg from '../images/staff/LAURA JAVIERA MOLINARI TRONCOSO close.webp';
import robinImg from '../images/staff/ROBIN MAURICIO GAJARDO GONZALEZ close.webp';
import jorgeImg from '../images/staff/JORGE RODRIGO MUÑOZ SÁNCHEZ close.webp';
import mabelImg from '../images/staff/MABEL SOLEDAD MUNDACA JARA close.webp';
import rubenImg from '../images/staff/Ruben Muñoz close.webp';
import gabrielaImg from '../images/staff/GABRIELA ANDREA CIFUENTES VÉLIZ close.webp';
import germanImg from '../images/staff/GERMAN FERNANDO NICOLÁS MUÑOZ NAVARRO close.webp';
import directivaImg from '../images/staff/Directiva.webp';
import grupoImg1 from '../images/staff/foto grupal.webp';
import grupoImg2 from '../images/staff/foto grupal 2.webp';
import grupoImg3 from '../images/staff/foto grupal 3.webp';
import lissetteImg from '../images/staff/Lissette del Carmen Lucaveche Carreño Close.webp';
import franciscaImg from '../images/staff/Francisca Mariela Carvajal Baeza close.webp';
import rominaImg from '../images/staff/Romina Daniela Tudela Carvajal close.webp';
import tiareImg from '../images/staff/Tiare Emilse Sandoval Núñez close.webp';
import tamaraImg from '../images/staff/Tamara Carolina Rojas Castillo close.webp';
import cristinaImg from '../images/staff/Cristina Céspedes Triana close 1.webp';
import sofiaImg from '../images/staff/Sofía Francisca Molinari Troncoso close.webp';
import Carousel from '../components/Carousel';
import { User, Mail, GraduationCap } from 'lucide-react';

const Team: React.FC = () => {
    const directiva = [
        {
            name: 'María Trinidad del Carmen López Douglas',
            role: 'Directora',
            title: 'Titulada en Educación Básica con mención en Educación Física',
            desc: '"Liderar esta comunidad educativa es un honor y un compromiso diario con el futuro de cada uno de nuestros estudiantes."',
            image: mariaImg
        },
        {
            name: 'Carlos Arturo Navarro Serey',
            role: 'Representante Legal',
            title: 'Titulado en Educación Básica',
            desc: '"Vasta experiencia en gestión educativa y administración escolar."',
            image: carlosImg
        },
        {
            name: 'Pamela Alicia Navarro López',
            role: 'Jefa UTP',
            title: 'Titulada en Educación Básica',
            desc: '"Buscamos la mejora continua a través de estrategias innovadoras."'
        },
        {
            name: 'Constanza del Carmen Guadalupe Cerra',
            role: 'Encargada de Convivencia',
            title: 'Titulado en Educación Básica con mención en Inglés',
            desc: '"Fomentando el aprendizaje integral y el dominio de nuevas lenguas."',
            image: constanzaImg
        }
    ];

    const docentes = [
        { name: 'Ximena Rossana Larenas Moncada', role: 'Docente de Aula', title: 'Titulada en Educación Básica', image: ximenaImg },
        { name: 'Laura Javiera Molinari Troncoso', role: 'Docente de Aula', title: 'Titulada en Educación Básica con mención en trastornos de aprendizaje', image: lauraImg },
        { name: 'Robin Mauricio Gajardo González', role: 'Docente de Aula', title: 'Titulado en Educación Básica y Media. Especialidad Educación Física', image: robinImg },
        { name: 'Jorge Rodrigo Muñoz Sánchez', role: 'Docente de Aula', title: 'Titulado en Educación Diferencial. Especialidad Trastornos del Lenguaje', image: jorgeImg },
        { name: 'Mabel Soledad Mundaca Jara', role: 'Docente de Aula', title: 'Titulada en Educación Básica con mención en Ciencias Sociales', image: mabelImg },
        { name: 'Yanitza Carolina Pérez Salinas', role: 'Docente de Aula', title: 'Titulada en Educación Básica con mención en Matemática', },
        { name: 'Lissette del Carmen Lucaveche Carreño', role: 'Docente de Aula', title: 'Titulada en Educación Diferencial, especialidad Trastornos del Aprendizaje', image: lissetteImg },
        { name: 'María José Grado Leiva', role: 'Docente de Aula', title: 'Titulada en Educación Básica con mención en Educación Física' },
        { name: 'Annelle Angélica González Veas', role: 'Docente de Aula', title: 'Titulada en Educación Básica con mención en Ciencias Sociales' },
        { name: 'Sofía Francisca Molinari Troncoso', role: 'Docente de Aula', title: 'Titulada en Educación Diferencial', image: sofiaImg },
    ];

    const asistentes = [
        { name: 'Rubén Iván Muñoz Badilla', role: 'Administrador', title: 'Ingeniero Ejecución', image: rubenImg },
        { name: 'Gabriela Andrea Cifuentes Véliz', role: 'Inspector/a / Secretario/a', title: 'Secretariado', image: gabrielaImg },
        { name: 'Germán Fernando Nicolás Muñoz Navarro', role: 'Asistente Administrativo', title: '', image: germanImg },
        { name: 'Carmen Rebeca de la Paz Granifo Acevedo', role: 'Psicólogo/a', title: 'Psicólogo' },
        { name: 'Pamela Eugenia Morales Henríquez', role: 'Psicólogo/a', title: 'Psicólogo' },
        { name: 'Francisca Mariela Carvajal Baeza', role: 'Fonoaudiólogo/a', title: 'Fonoaudiólogo', image: franciscaImg },
        { name: 'Regina Isabel González Valenzuela', role: '', title: '' },
        { name: 'Julia Gilda Navarro Serey', role: 'Auxiliar de Aseo', title: '' },
        { name: 'Deyanira del Carmen Soto Mora', role: 'Auxiliar de Aseo', title: '' },
    ];

    const parvularioHead = [
        {
            name: 'Lorena Andrea Navarro López',
            role: 'Directora',
            title: 'Educadora de Párvulos',
            desc: '"Comprometidos con el desarrollo integral de nuestros niños y niñas."',
            image: undefined
        }
    ];

    const parvularioDocentes = [
        { name: 'Robin Gajardo González', role: 'Docente de Aula', title: 'Profesor de Ed. Física', image: robinImg },
        { name: 'Romina Tudela Carvajal', role: 'Docente de Aula', title: 'Educadora de Párvulos', image: rominaImg },
        { name: 'Tiare Sandoval Núñez', role: 'Docente de Aula', title: 'Educadora de Párvulos', image: tiareImg },
    ];

    const parvularioAsistentes = [
        { name: 'Tamara Rojas Castillo', role: 'Asistente Párvulos', title: 'Técnico de Párvulos', image: tamaraImg },
        { name: 'Cristina Céspedes Triana', role: 'Asistente Párvulos', title: 'Técnico de Párvulos', image: cristinaImg },
        { name: 'Jocelyn Espinoza Frigerio', role: 'Auxiliar de Aseo', title: '' },
    ];


    return (
        <section className="py-20 bg-white min-h-screen">
            <div className="container mx-auto px-6 pt-10">
                <div className="text-center mb-16 animate-fade-in-up">
                    <span className="text-school-gold font-bold uppercase tracking-widest text-sm">Nuestra Comunidad Educativa</span>
                    <h1 className="font-heading text-4xl md:text-5xl font-bold text-school-navy mt-4 mb-6">Nuestro Equipo</h1>
                    <p className="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed">
                        Nuestra institución se compone de dos grandes establecimientos: el <strong>Colegio San José</strong> y el <strong>Parvulario San José</strong>.
                        Ambos trabajan unidos bajo una misma administración y visión, comprometidos con la formación integral en cada etapa del desarrollo.
                    </p>
                </div>

                {/* =========================================
                    SECCIÓN: COLEGIO SAN JOSÉ
                   ========================================= */}
                <div className="mb-32">
                    <div className="flex items-center gap-4 mb-12">
                        <div className="h-1 w-12 bg-school-gold"></div>
                        <h2 className="font-heading text-3xl md:text-4xl font-bold text-school-navy">Colegio San José</h2>
                        <span className="text-gray-500 font-medium">Enseñanza Básica</span>
                    </div>

                    {/* Carousel remains here as it showcases the community */}
                    <div className="mb-16 rounded-2xl overflow-hidden shadow-xl aspect-[3/2] md:aspect-[16/9] lg:aspect-[3/2] relative mx-auto max-w-5xl">
                        <Carousel
                            images={[directivaImg, grupoImg1, grupoImg2, grupoImg3]}
                            autoPlayInterval={5000}
                            imageClassName="object-contain"
                            indicatorsClassName="absolute bottom-16 left-1/2 -translate-x-1/2 flex gap-2 z-20"
                        />
                        <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/70 to-transparent p-6 pointer-events-none z-10">
                            <p className="text-center text-white italic text-lg drop-shadow-md">Nuestra Comunidad Educativa</p>
                        </div>
                    </div>

                    {/* Directiva Colegio */}
                    <div className="mb-20">
                        <h3 className="text-2xl font-heading font-bold text-gray-900 mb-8 border-l-4 border-school-gold pl-4">
                            Equipo Directivo
                        </h3>
                        <div className="grid lg:grid-cols-2 gap-8">
                            {directiva.map((member, idx) => (
                                <div key={idx} className="flex flex-col md:flex-row gap-8 items-start bg-gray-50 p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                                    <div className="w-full md:w-1/3 flex-shrink-0">
                                        <div className="aspect-[3/4] rounded-xl overflow-hidden shadow-lg bg-gray-200 flex items-center justify-center">
                                            {member.image ? (
                                                <img src={member.image} alt={member.name} className="w-full h-full object-cover object-top" />
                                            ) : (
                                                <User className="text-gray-400" size={64} strokeWidth={1} />
                                            )}
                                        </div>
                                    </div>
                                    <div className="w-full md:w-2/3">
                                        <h3 className="text-2xl font-bold text-school-navy mb-1">{member.name}</h3>
                                        <p className="text-school-gold font-bold uppercase text-sm tracking-wider mb-2">{member.role}</p>

                                        <div className="space-y-3 text-gray-600">
                                            <div className="flex gap-3">
                                                <GraduationCap className="text-school-blue flex-shrink-0 mt-1" size={20} />
                                                <div>
                                                    <p className="font-semibold text-gray-800 text-sm">Formación</p>
                                                    <p className="text-sm">{member.title}</p>
                                                </div>
                                            </div>
                                            {member.desc && (
                                                <p className="text-sm italic border-l-2 border-gray-300 pl-4 py-1">
                                                    {member.desc}
                                                </p>
                                            )}
                                            <button className="flex items-center gap-2 text-school-blue hover:text-school-navy font-semibold text-sm mt-2 transition-colors">
                                                <Mail size={16} />
                                                contacto@sanjoseschool.cl
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Docentes Colegio */}
                    <div className="mb-20">
                        <h3 className="text-2xl font-heading font-bold text-gray-900 mb-12 border-l-4 border-school-gold pl-4">
                            Cuerpo Docente
                        </h3>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {docentes.map((docente, idx) => (
                                <div key={idx} className="bg-white border border-gray-100 p-6 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 group">
                                    <div className="flex items-center gap-6">
                                        <div className="w-24 h-24 flex-shrink-0 rounded-full overflow-hidden border-2 border-gray-100 group-hover:border-school-gold transition-colors bg-gray-100 flex items-center justify-center">
                                            {docente.image ? (
                                                <img src={docente.image} alt={docente.name} className="w-full h-full object-cover object-top" />
                                            ) : (
                                                <User className="text-gray-400" size={48} strokeWidth={1} />
                                            )}
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-lg text-gray-800 group-hover:text-school-navy transition-colors">{docente.name}</h3>
                                            <p className="text-school-blue font-medium text-xs uppercase mb-1">{docente.role}</p>
                                            <p className="text-gray-500 text-xs line-clamp-3">{docente.title}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Asistentes Colegio */}
                    <div>
                        <h3 className="text-2xl font-heading font-bold text-gray-900 mb-12 border-l-4 border-school-gold pl-4">
                            Asistentes de la Educación
                        </h3>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {asistentes.map((asistente, idx) => (
                                <div key={idx} className="bg-white border border-gray-100 p-6 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 group">
                                    <div className="flex items-center gap-6">
                                        <div className="w-24 h-24 flex-shrink-0 rounded-full overflow-hidden border-2 border-gray-100 group-hover:border-school-gold transition-colors bg-gray-100 flex items-center justify-center">
                                            {asistente.image ? (
                                                <img src={asistente.image} alt={asistente.name} className="w-full h-full object-cover object-top" />
                                            ) : (
                                                <User className="text-gray-400" size={48} strokeWidth={1} />
                                            )}
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-lg text-gray-800 group-hover:text-school-navy transition-colors">{asistente.name}</h3>
                                            <p className="text-school-blue font-medium text-xs uppercase mb-1">{asistente.role}</p>
                                            <p className="text-gray-500 text-xs line-clamp-2">{asistente.title}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* SEPARATOR */}
                <div className="border-t-2 border-school-gold/20 my-16 w-3/4 mx-auto"></div>

                {/* =========================================
                    SECCIÓN: ESCUELA DE PÁRVULOS SAN JOSÉ SCHOOL
                   ========================================= */}
                <div>
                    <div className="flex items-center gap-4 mb-12">
                        <div className="h-1 w-12 bg-school-gold"></div>
                        <h2 className="font-heading text-3xl md:text-4xl font-bold text-school-navy">Escuela de Párvulos San José School</h2>
                        <span className="text-gray-500 font-medium">Educación Parvularia</span>
                    </div>

                    <div className="text-center mb-16 px-4">
                        <p className="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed italic">
                            "Profesionales especializados en la primera infancia, dedicados a entregar amor y educación de calidad a nuestros más pequeños."
                        </p>
                    </div>

                    {/* Encargada */}
                    <div className="mb-20">
                        <h3 className="text-2xl font-heading font-bold text-gray-900 mb-8 border-l-4 border-school-gold pl-4">
                            Encargada del Establecimiento
                        </h3>
                        <div className="grid lg:grid-cols-2 gap-8">
                            {parvularioHead.map((member, idx) => (
                                <div key={idx} className="flex flex-col md:flex-row gap-8 items-start bg-gray-50 p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                                    <div className="w-full md:w-1/3 flex-shrink-0">
                                        <div className="aspect-[3/4] rounded-xl overflow-hidden shadow-lg bg-gray-200 flex items-center justify-center">
                                            {/* @ts-ignore - checking for image existence */}
                                            {member.image ? (
                                                <img src={member.image} alt={member.name} className="w-full h-full object-cover object-top" />
                                            ) : (
                                                <User className="text-gray-400" size={64} strokeWidth={1} />
                                            )}
                                        </div>
                                    </div>
                                    <div className="w-full md:w-2/3">
                                        <h3 className="text-2xl font-bold text-school-navy mb-1">{member.name}</h3>
                                        <p className="text-school-gold font-bold uppercase text-sm tracking-wider mb-2">{member.role}</p>

                                        <div className="space-y-3 text-gray-600">
                                            <div className="flex gap-3">
                                                <GraduationCap className="text-school-blue flex-shrink-0 mt-1" size={20} />
                                                <div>
                                                    <p className="font-semibold text-gray-800 text-sm">Formación</p>
                                                    <p className="text-sm">{member.title}</p>
                                                </div>
                                            </div>
                                            {member.desc && (
                                                <p className="text-sm italic border-l-2 border-gray-300 pl-4 py-1">
                                                    {member.desc}
                                                </p>
                                            )}
                                            <button className="flex items-center gap-2 text-school-blue hover:text-school-navy font-semibold text-sm mt-2 transition-colors">
                                                <Mail size={16} />
                                                contacto@sanjoseschool.cl
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Docentes Parvulario */}
                    <div className="mb-20">
                        <h3 className="text-2xl font-heading font-bold text-gray-900 mb-12 border-l-4 border-school-gold pl-4">
                            Docentes
                        </h3>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {parvularioDocentes.map((docente, idx) => (
                                <div key={idx} className="bg-white border border-gray-100 p-6 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 group">
                                    <div className="flex items-center gap-6">
                                        <div className="w-24 h-24 flex-shrink-0 rounded-full overflow-hidden border-2 border-gray-100 group-hover:border-school-gold transition-colors bg-gray-100 flex items-center justify-center">
                                            {docente.image ? (
                                                <img src={docente.image} alt={docente.name} className="w-full h-full object-cover object-top" />
                                            ) : (
                                                <User className="text-gray-400" size={48} strokeWidth={1} />
                                            )}
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-lg text-gray-800 group-hover:text-school-navy transition-colors">{docente.name}</h3>
                                            <p className="text-school-blue font-medium text-xs uppercase mb-1">{docente.role}</p>
                                            <p className="text-gray-500 text-xs line-clamp-3">{docente.title}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Asistentes Parvulario */}
                    <div>
                        <h3 className="text-2xl font-heading font-bold text-gray-900 mb-12 border-l-4 border-school-gold pl-4">
                            Asistentes de la Educación
                        </h3>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {parvularioAsistentes.map((asistente, idx) => (
                                <div key={idx} className="bg-white border border-gray-100 p-6 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 group">
                                    <div className="flex items-center gap-6">
                                        <div className="w-24 h-24 flex-shrink-0 rounded-full overflow-hidden border-2 border-gray-100 group-hover:border-school-gold transition-colors bg-gray-100 flex items-center justify-center">
                                            {asistente.image ? (
                                                <img src={asistente.image} alt={asistente.name} className="w-full h-full object-cover object-top" />
                                            ) : (
                                                <User className="text-gray-400" size={48} strokeWidth={1} />
                                            )}
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-lg text-gray-800 group-hover:text-school-navy transition-colors">{asistente.name}</h3>
                                            <p className="text-school-blue font-medium text-xs uppercase mb-1">{asistente.role}</p>
                                            <p className="text-gray-500 text-xs line-clamp-2">{asistente.title}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
export default Team;
