import React from 'react';
import { ArrowRight, User } from 'lucide-react';
import { Link } from 'react-router-dom';

interface StaffMember {
    name: string;
    role: string;
    image?: string;
}

import mariaImg from '../images/staff/Maria Trinidad Lopez close.webp';
import carlosImg from '../images/staff/Carlos Navarro close.webp';
import constanzaImg from '../images/staff/CONSTANZA DEL CARMEN GUADALUPE CERRA close.webp';
import ximenaImg from '../images/staff/XIMENA ROSSANA LARENAS MONDACA close.webp';
import robinImg from '../images/staff/ROBIN MAURICIO GAJARDO GONZALEZ close.webp';
import lauraImg from '../images/staff/LAURA JAVIERA MOLINARI TRONCOSO close.webp';
import rubenImg from '../images/staff/Ruben Muñoz close.webp';

const Staff: React.FC = () => {

    const staffList: StaffMember[] = [
        { name: 'María Trinidad del Carmen López Douglas', role: 'Directora', image: mariaImg },
        { name: 'Carlos Arturo Navarro Serey', role: 'Representante Legal', image: carlosImg },
        { name: 'Pamela Alicia Navarro López', role: 'Jefa UTP' },
        { name: 'Constanza del Carmen Guadalupe Cerra', role: 'Encargada de Convivencia', image: constanzaImg },
        { name: 'Ximena Rossana Larenas Moncada', role: 'Docente de Aula', image: ximenaImg },
        { name: 'Robin Mauricio Gajardo González', role: 'Docente de Aula', image: robinImg },
        { name: 'Laura Javiera Molinari Troncoso', role: 'Docente de Aula', image: lauraImg },
        { name: 'Rubén Iván Muñoz Badilla', role: 'Administrador', image: rubenImg },
    ];

    return (
        <section className="py-20 bg-gray-50" id="staff">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="font-heading text-4xl font-bold text-gray-900 mb-4">Nuestro Equipo Destacado</h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Conoce a parte de los profesionales comprometidos con la formación integral de cada estudiante.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
                    {staffList.map((member, idx) => (
                        <div key={idx} className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all hover:-translate-y-2 duration-300">
                            <div className="h-64 overflow-hidden relative group bg-gray-100 flex items-center justify-center">
                                {member.image ? (
                                    <img
                                        src={member.image}
                                        alt={member.name}
                                        className="w-full h-full object-cover object-top hover:scale-105 transition-all duration-500"
                                    />
                                ) : (
                                    <User className="text-gray-400" size={64} strokeWidth={1} />
                                )}
                                <div className="absolute inset-0 bg-school-navy/20 group-hover:bg-transparent transition-colors"></div>
                            </div>
                            <div className="p-6 text-center">
                                <h3 className="font-heading text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
                                <p className="text-school-blue font-medium text-sm uppercase tracking-wide">{member.role}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="flex justify-center">
                    <Link to="/equipo" className="group flex items-center gap-2 bg-school-navy hover:bg-school-gold text-white px-8 py-4 rounded-full font-bold uppercase tracking-wider transition-all duration-300 transform hover:scale-105 shadow-xl">
                        Ver todo el equipo
                        <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default Staff;
