import React, { useState, useEffect } from 'react';
import { BookOpen, CheckCircle, Users, User, FileText, Download, Eye, Loader, X, Calendar, LayoutGrid } from 'lucide-react';
import { getDocuments, DocumentItem, downloadDocumentFile } from '../data/documents';
import AITeacherResources from '../components/AITeacherResources';

const UTP: React.FC = () => {
    const [documents, setDocuments] = useState<DocumentItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [viewingPdf, setViewingPdf] = useState<string | null>(null);

    useEffect(() => {
        const fetchDocs = async () => {
            setIsLoading(true);
            const docs = await getDocuments();
            // Solo dejamos documentos que pertenezcan a las categorias UTP
            setDocuments(docs.filter(d => d.category.includes('(UTP)')));
            setIsLoading(false);
        };
        fetchDocs();
    }, []);

    const handleViewPdf = (doc: DocumentItem) => {
        if (doc.fileUrl && doc.fileUrl !== 'chunked_internal') {
            setViewingPdf(doc.fileUrl);
        } else {
            alert("Este documento fue subido con el sistema antiguo y no se puede visualizar directamente.");
        }
    };

    const closePdfViewer = () => {
        setViewingPdf(null);
    };

    const functions = [
        "Proponer las readecuaciones necesarias a los Programas de Estudio vigentes.",
        "Velar y supervisar por la adecuada aplicación de los Planes y Programas de Estudio vigente.",
        "Supervisar, asesorar y mantener archivos en la planificación de las unidades didácticas.",
        "Coordinar y planificar la utilización adecuada de los recursos materiales, audiovisuales e informáticos.",
        "Promover y contribuir al perfeccionamiento de los Docentes.",
        "Promover la adquisición y/o confección de materiales y/o equipos didácticos.",
        "Controlar periódicamente los contenidos o actividades en los libros de clases.",
        "Desarrollar un sistema de Supervisión o acompañamiento al trabajo docente en el aula.",
        "Autorizar cambios en la elección de un Plan Electivo o Asignatura Electiva.",
        "Supervisar y evaluar las actividades extraescolares y de colaboración.",
        "Mantener a disposición de los docentes los Planes y programas de estudio.",
        "Supervisar el funcionamiento del servicio de Biblioteca.",
        "Organizar los calendarios de actividades curriculares.",
        "Promover y coordinar el uso de las Tic´s y la innovación pedagógica.",
        "Desarrollar un Proceso de Inducción Técnico-Pedagógica a los nuevos docentes."
    ];

    return (
        <section className="py-20 bg-gray-50 min-h-screen">
            <div className="container mx-auto px-6 pt-10">
                <div className="text-center mb-16">
                    <span className="text-school-gold font-bold uppercase tracking-widest text-sm">Gestión Académica</span>
                    <h1 className="font-heading text-4xl md:text-5xl font-bold text-school-navy mt-4 mb-6">Unidad Técnico Pedagógica (UTP)</h1>
                    <div className="max-w-4xl mx-auto text-lg text-gray-700 leading-relaxed space-y-6 text-left bg-white p-8 rounded-xl shadow-sm border border-gray-100">
                        <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
                            <div className="w-full md:w-1/3 flex-shrink-0">
                                <div className="aspect-[3/4] rounded-xl overflow-hidden shadow-lg mx-auto md:mx-0 max-w-sm bg-gray-100 flex items-center justify-center">
                                    <User className="text-gray-400" size={80} strokeWidth={1} />
                                </div>
                            </div>
                            <div className="w-full md:w-2/3">
                                <div className="flex items-center gap-3 mb-4">
                                    <Users className="text-school-gold flex-shrink-0" size={28} />
                                    <h3 className="font-bold text-2xl text-school-navy">Sra. Pamela Navarro</h3>
                                </div>
                                <p className="text-school-blue font-bold uppercase tracking-wider text-sm mb-4">Jefa UTP</p>
                                <p>
                                    La persona responsable de la Unidad Técnico Pedagógica es responsable de organizar, coordinar y supervisar el trabajo Técnico-Pedagógico de los distintos organismos del Colegio, de manera que funcionen eficiente y armónicamente. En todas sus acciones coordinará las instrucciones impartidas por La Directora con las necesidades y disponibilidades de los organismos a su cargo.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Espacio para documentos y programacion UTP */}
                    <div className="max-w-4xl mx-auto mt-12 text-left">
                        <h2 className="text-3xl font-heading font-bold text-school-navy mb-8 border-l-4 border-school-gold pl-4 flex items-center gap-3">
                            <LayoutGrid className="text-school-blue" size={28} />
                            Programación, Horarios y Circulares
                        </h2>

                        {isLoading ? (
                            <div className="flex flex-col items-center justify-center p-12 text-gray-500 bg-white rounded-xl shadow-sm border border-gray-100">
                                <Loader size={48} className="animate-spin text-school-blue mb-4" />
                                <p>Cargando información académica...</p>
                            </div>
                        ) : documents.length === 0 ? (
                            <div className="bg-white p-10 rounded-xl shadow-sm border border-gray-100 text-center text-gray-500">
                                <FileText size={48} className="mx-auto text-gray-300 mb-4" />
                                <p className="text-lg">Aún no se han subido documentos de programación o de horarios para este periodo.</p>
                            </div>
                        ) : (
                            <div className="grid gap-4">
                                {documents.map(doc => (
                                    <div key={doc.id} className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col md:flex-row items-start md:items-center justify-between hover:shadow-md transition-shadow group">
                                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-5 w-full md:w-auto mb-4 md:mb-0">
                                            <div className="bg-blue-50 p-3 rounded-lg text-school-blue group-hover:bg-school-blue group-hover:text-white transition-colors shrink-0">
                                                <FileText size={24} />
                                            </div>
                                            <div className="w-full">
                                                <h3 className="font-bold text-gray-800 text-lg mb-2 break-words line-clamp-2">{doc.title}</h3>
                                                <div className="text-sm text-gray-500 flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
                                                    <span className="flex items-start sm:items-center gap-1.5 font-medium text-school-gold"><CheckCircle className="shrink-0 mt-0.5 sm:mt-0" size={14} /> <span className="break-words">{doc.category}</span></span>
                                                    <span className="flex items-center gap-1.5"><Calendar className="shrink-0" size={14} /> Subido el {doc.date}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto mt-4 md:mt-0">
                                            <button
                                                onClick={() => handleViewPdf(doc)}
                                                className="flex flex-1 justify-center items-center gap-2 bg-school-navy hover:bg-blue-900 text-white px-5 py-2.5 rounded-lg font-semibold transition-colors"
                                            >
                                                <Eye size={18} />
                                                <span>Ver</span>
                                            </button>
                                            <button
                                                onClick={() => downloadDocumentFile(doc.id, doc.fileName)}
                                                className="flex flex-1 justify-center items-center gap-2 bg-gray-50 hover:bg-school-gold text-gray-700 hover:text-white border border-gray-200 hover:border-school-gold px-5 py-2.5 rounded-lg font-semibold transition-all"
                                            >
                                                <Download size={18} />
                                                <span>Descargar</span>
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                <div className="max-w-4xl mx-auto mt-16 bg-white p-8 rounded-xl shadow-sm border border-gray-100">
                    <h3 className="font-bold text-2xl text-school-navy mb-6 flex items-center gap-3">
                        <BookOpen className="text-school-gold" />
                        Funciones Curriculares de la Unidad Técnica
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

                {/* Herramienta IA para profesores */}
                <div className="max-w-4xl mx-auto mt-16">
                    <AITeacherResources />
                </div>
            </div>

            {viewingPdf && (
                <div className="fixed inset-0 z-50 bg-black/80 flex flex-col justify-center items-center p-4 md:p-10 backdrop-blur-sm transition-all animate-fade-in-up">
                    <div className="bg-white w-full max-w-5xl h-[85vh] md:h-[90vh] rounded-xl overflow-hidden shadow-2xl flex flex-col relative">
                        <div className="flex justify-between items-center p-4 border-b border-gray-100 bg-gray-50">
                            <h3 className="font-bold text-gray-800 flex items-center gap-2">
                                <FileText size={18} className="text-school-blue" />
                                Visor UTP
                            </h3>
                            <button
                                onClick={closePdfViewer}
                                className="p-2 hover:bg-gray-200 rounded-full transition-colors text-gray-500 hover:text-red-500"
                            >
                                <X size={24} />
                            </button>
                        </div>
                        <div className="flex-1 w-full bg-gray-100">
                            <iframe
                                src={viewingPdf}
                                className="w-full h-full border-none"
                                title="Visor PDF"
                            ></iframe>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};

export default UTP;
