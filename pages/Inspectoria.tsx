import React from 'react';
import { ShieldCheck, CheckCircle, User, Users, ClipboardList, Clock, AlertTriangle, Eye } from 'lucide-react';
import gabrielaImg from '../images/staff/GABRIELA ANDREA CIFUENTES VÉLIZ close.webp';

const Inspectoria: React.FC = () => {
    const functions = [
        "Controlar el cumplimiento de los horarios de los docentes en sus clases y actividades.",
        "Velar por la buena presentación personal de los estudiantes y el uso correcto del uniforme escolar.",
        "Resguardar el orden y la disciplina del alumnado, especialmente en los recreos, formaciones y actos.",
        "Controlar la asistencia diaria de los estudiantes e informar oportunamente a los apoderados ante inasistencias reiteradas.",
        "Supervisar el comportamiento de los estudiantes en pasillos, patios, casino y otros espacios comunes.",
        "Registrar y gestionar los atrasos e inasistencias de los alumnos, manteniendo un archivo actualizado.",
        "Atender a los apoderados en situaciones de retiro anticipado, justificaciones y temas de convivencia.",
        "Coordinar los turnos de cuidado y vigilancia del establecimiento durante la jornada escolar.",
        "Colaborar en la aplicación del Reglamento Interno y los protocolos de actuación del colegio.",
        "Velar por la seguridad e integridad física de los estudiantes dentro del establecimiento.",
        "Coordinar los procedimientos de evacuación y simulacros del Plan Integral de Seguridad Escolar (PISE).",
        "Mantener actualizado el registro de matrícula y la documentación de los estudiantes."
    ];

    return (
        <section className="py-20 bg-gray-50 min-h-screen">
            <div className="container mx-auto px-6 pt-10">
                {/* Header */}
                <div className="text-center mb-16">
                    <span className="text-school-gold font-bold uppercase tracking-widest text-sm">Gestión Escolar</span>
                    <h1 className="font-heading text-4xl md:text-5xl font-bold text-school-navy mt-4 mb-6">Inspectoría General</h1>
                    
                    {/* Encargada Card */}
                    <div className="max-w-4xl mx-auto text-lg text-gray-700 leading-relaxed space-y-6 text-left bg-white p-8 rounded-xl shadow-sm border border-gray-100">
                        <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
                            <div className="w-full md:w-1/3 flex-shrink-0">
                                <div className="aspect-[3/4] rounded-xl overflow-hidden shadow-lg mx-auto md:mx-0 max-w-sm bg-gray-100 flex items-center justify-center">
                                    <img src={gabrielaImg} alt="Gabriela Cifuentes" className="w-full h-full object-cover object-top" />
                                </div>
                            </div>
                            <div className="w-full md:w-2/3">
                                <div className="flex items-center gap-3 mb-4">
                                    <Users className="text-school-gold flex-shrink-0" size={28} />
                                    <h3 className="font-bold text-2xl text-school-navy">Sra. Gabriela Cifuentes Véliz</h3>
                                </div>
                                <p className="text-school-blue font-bold uppercase tracking-wider text-sm mb-4">Inspectora General / Secretaria</p>
                                <p>
                                    La Inspectoría General es el departamento encargado de velar por el orden, la seguridad y el correcto funcionamiento de la jornada escolar. Su labor es fundamental para mantener un ambiente propicio para el aprendizaje, asegurando el cumplimiento de horarios, la asistencia de los estudiantes y la aplicación del reglamento interno del establecimiento.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Áreas de acción */}
                <div className="max-w-4xl mx-auto mb-16">
                    <h2 className="text-3xl font-heading font-bold text-school-navy mb-8 border-l-4 border-school-gold pl-4 flex items-center gap-3">
                        <Eye className="text-school-blue" size={28} />
                        Áreas de Acción
                    </h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[
                            { icon: <Clock size={32} />, title: "Control de Asistencia", desc: "Registro y seguimiento diario de la asistencia y puntualidad de todos los estudiantes." },
                            { icon: <ShieldCheck size={32} />, title: "Disciplina Escolar", desc: "Resguardo del orden, la convivencia y la aplicación justa del reglamento interno." },
                            { icon: <AlertTriangle size={32} />, title: "Seguridad Escolar", desc: "Coordinación de protocolos de seguridad, simulacros de evacuación y Plan PISE." },
                            { icon: <ClipboardList size={32} />, title: "Gestión Documental", desc: "Administración de registros de matrícula, certificados y documentación estudiantil." },
                            { icon: <Users size={32} />, title: "Atención a Apoderados", desc: "Recepción de justificativos, retiros anticipados y comunicación con las familias." },
                            { icon: <Eye size={32} />, title: "Supervisión de Espacios", desc: "Vigilancia activa de patios, pasillos y áreas comunes durante toda la jornada escolar." }
                        ].map((area, idx) => (
                            <div key={idx} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 group text-center">
                                <div className="w-16 h-16 bg-blue-50 text-school-blue rounded-full flex items-center justify-center mx-auto mb-5 group-hover:bg-school-navy group-hover:text-white transition-colors duration-300">
                                    {area.icon}
                                </div>
                                <h3 className="font-bold text-lg text-gray-800 mb-3">{area.title}</h3>
                                <p className="text-gray-600 text-sm leading-relaxed">{area.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Funciones detalladas */}
                <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-sm border border-gray-100">
                    <h3 className="font-bold text-2xl text-school-navy mb-6 flex items-center gap-3">
                        <ClipboardList className="text-school-gold" />
                        Funciones de la Inspectoría General
                    </h3>
                    <ul className="grid gap-4 md:grid-cols-2">
                        {functions.map((func, idx) => (
                            <li key={idx} className="flex items-start gap-3 bg-gray-50 p-4 rounded-lg hover:bg-blue-50 transition-colors duration-300">
                                <CheckCircle className="text-school-green flex-shrink-0 mt-1" size={20} />
                                <span className="text-sm text-gray-700 leading-relaxed">{func}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    );
};

export default Inspectoria;
