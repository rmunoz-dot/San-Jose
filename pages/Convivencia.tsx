import React, { useState, useEffect } from 'react';
import { ShieldAlert, Download, FileText, AlertTriangle, Loader, ShieldCheck, Scale, Book, Tag, Calendar, Eye, X } from 'lucide-react';
import { getDocuments, DocumentItem, downloadDocumentFile } from '../data/convivencia';
import cyberbullyingImg from '../assets/cyberbullying.png';

const Convivencia: React.FC = () => {
    const [documents, setDocuments] = useState<DocumentItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [viewingPdf, setViewingPdf] = useState<string | null>(null);

    useEffect(() => {
        const fetchDocs = async () => {
            setIsLoading(true);
            const docs = await getDocuments();
            setDocuments(docs);
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

    const planDeGestion = documents.find(d => d.title.toLowerCase().includes('plan de gestión de convivencia'));

    const publicDocuments = documents.filter(d => !d.title.toLowerCase().includes('plan de gestión de convivencia'));

    const getIconForCategory = (category: string) => {
        switch (category) {
            case 'Reglamentos': return <ShieldCheck size={32} />;
            case 'Protocolos de Actuación': return <AlertTriangle size={32} />;
            case 'Formatos': return <FileText size={32} />;
            default: return <Book size={32} />;
        }
    };

    return (
        <section className="py-20 bg-gray-50 min-h-screen relative">
            <div className="container mx-auto px-6 pt-10 max-w-6xl">
                <div className="text-center mb-16 animate-fade-in-up">
                    <span className="text-school-blue font-bold uppercase tracking-widest text-sm">Comunidad Segura</span>
                    <h1 className="font-heading text-4xl md:text-5xl font-bold text-school-navy mt-4 mb-6">Convivencia Escolar</h1>
                    <p className="text-gray-600 max-w-3xl mx-auto text-lg leading-relaxed">
                        Fomentamos un ambiente de respeto, inclusión y seguridad para todos los estudiantes, apoderados y docentes de nuestra institución.
                    </p>
                </div>

                {/* Plan de Gestión y Taller de Ciberacoso */}
                <div className="grid md:grid-cols-2 gap-8 mb-16 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                    {/* Plan de Gestión */}
                    <div className="bg-school-navy p-10 rounded-2xl shadow-lg relative overflow-hidden flex flex-col justify-center text-white">
                        <div className="absolute top-0 right-0 -mt-10 -mr-10 opacity-10 pointer-events-none">
                            <ShieldAlert size={250} />
                        </div>
                        <div className="relative z-10">
                            <h2 className="text-3xl font-heading font-bold mb-4 flex items-center gap-3">
                                <FileText className="text-school-gold" size={32} />
                                Plan de Gestión
                            </h2>
                            <p className="text-white/80 leading-relaxed mb-8">
                                Nuestro plan integral estratégico que orienta las acciones, talleres, regulaciones y herramientas para mantener el bienestar de nuestra comunidad educativa.
                            </p>

                            {planDeGestion ? (
                                <div className="flex flex-col sm:flex-row gap-3">
                                    <button
                                        onClick={() => handleViewPdf(planDeGestion)}
                                        className="bg-white text-school-navy hover:bg-gray-100 font-bold py-3 px-6 rounded-lg transition-colors inline-flex justify-center items-center gap-2 shadow-md hover:-translate-y-0.5 flex-1"
                                    >
                                        <Eye size={20} />
                                        Ver Plan
                                    </button>
                                    <button
                                        onClick={() => downloadDocumentFile(planDeGestion.id, planDeGestion.fileName)}
                                        className="bg-school-gold hover:bg-yellow-500 text-white font-bold py-3 px-6 rounded-lg transition-colors inline-flex justify-center items-center gap-2 shadow-md hover:-translate-y-0.5 flex-1"
                                    >
                                        <Download size={20} />
                                        Descargar
                                    </button>
                                </div>
                            ) : (
                                <button
                                    className="bg-gray-600 text-gray-300 font-bold py-3 px-6 rounded-lg cursor-not-allowed inline-flex items-center gap-2"
                                    title="El plan de gestión no ha sido subido por los encargados aún."
                                >
                                    <Download size={20} />
                                    Plan no disponible aún
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Taller de Ciberacoso */}
                    <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 flex flex-col items-center text-center hover:-translate-y-1 transition-transform">
                        <img
                            src={cyberbullyingImg}
                            alt="Seminario de concientización sobre el ciberacoso"
                            className="w-48 h-48 object-contain mb-6 drop-shadow-md"
                        />
                        <h3 className="text-2xl font-bold text-school-navy mb-3">Taller: Prevención del Ciberacoso</h3>
                        <p className="text-gray-600">
                            Equipamos a nuestros estudiantes y familias con herramientas modernas y consejos prácticos para navegar en la era digital seguros, respetuosos y protegidos contra el acoso en línea (Ciberbullying).
                        </p>
                    </div>
                </div>

                {/* Documentos Extra de Convivencia */}
                <h2 className="text-3xl font-heading font-bold text-gray-800 mb-8 border-l-4 border-school-blue pl-4">Documentos y Protocolos</h2>
                <div className="grid gap-6">
                    {isLoading ? (
                        <div className="flex flex-col items-center justify-center p-12 text-gray-500">
                            <Loader size={48} className="animate-spin text-school-blue mb-4" />
                            <p>Cargando documentos...</p>
                        </div>
                    ) : publicDocuments.length === 0 ? (
                        <div className="bg-white p-12 rounded-xl shadow-sm border border-gray-100 text-center text-gray-500">
                            No hay documentos adicionales disponibles en este momento.
                        </div>
                    ) : (
                        publicDocuments.map((doc) => (
                            <div key={doc.id} className="bg-white p-4 sm:p-6 md:p-8 rounded-xl shadow-sm border border-gray-100 flex flex-col md:flex-row items-start md:items-center justify-between hover:shadow-lg transition-all duration-300 group">
                                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 mb-4 md:mb-0 w-full md:w-auto overflow-hidden">
                                    <div className="flex-shrink-0 w-16 h-20 sm:w-20 sm:h-28 md:w-16 md:h-20 bg-blue-50 text-school-blue rounded overflow-hidden flex items-center justify-center relative shadow-sm border border-gray-100">
                                        {doc.thumbnailBase64 ? (
                                            <img src={doc.thumbnailBase64} alt={doc.title} className="w-full h-full object-cover" />
                                        ) : (
                                            getIconForCategory(doc.category)
                                        )}
                                    </div>
                                    <div className="flex-1 min-w-0 w-full">
                                        <h3 className="font-bold text-lg sm:text-xl text-gray-800 group-hover:text-school-navy transition-colors mb-2 break-words line-clamp-2 sm:line-clamp-1" title={doc.title}>{doc.title}</h3>
                                        <div className="flex flex-col sm:flex-row sm:flex-wrap items-start sm:items-center gap-2 sm:gap-3 text-sm text-gray-500">
                                            <span className="flex items-start sm:items-center gap-1.5 font-medium text-school-blue">
                                                <Tag className="shrink-0 mt-0.5 sm:mt-0" size={14} /> 
                                                <span className="break-words">{doc.category}</span>
                                            </span>
                                            <span className="flex items-center gap-1.5">
                                                <Calendar className="shrink-0" size={14} /> {doc.date}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto mt-4 md:mt-0">
                                    <button
                                        onClick={() => handleViewPdf(doc)}
                                        className="flex flex-1 items-center justify-center gap-2 bg-school-blue hover:bg-school-navy text-white px-6 py-2 rounded-lg font-bold transition-all duration-300"
                                    >
                                        <Eye size={18} />
                                        <span>Ver</span>
                                    </button>
                                    <button
                                        onClick={() => {
                                            alert("Descargando " + doc.fileName + ", por favor espere unos segundos...");
                                            downloadDocumentFile(doc.id, doc.fileName);
                                        }}
                                        className="flex flex-1 items-center justify-center gap-2 bg-gray-50 border border-gray-200 hover:bg-school-gold hover:border-school-gold hover:text-white px-6 py-2 rounded-lg font-bold text-gray-700 transition-all duration-300"
                                    >
                                        <Download size={18} />
                                        <span>Descargar</span>
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {viewingPdf && (
                <div className="fixed inset-0 z-50 bg-black/80 flex flex-col justify-center items-center p-4 md:p-10 backdrop-blur-sm transition-all animate-fade-in-up">
                    <div className="bg-white w-full max-w-5xl h-[85vh] md:h-[90vh] rounded-xl overflow-hidden shadow-2xl flex flex-col relative">
                        <div className="flex justify-between items-center p-4 border-b border-gray-100 bg-gray-50">
                            <h3 className="font-bold text-gray-800 flex items-center gap-2">
                                <FileText size={18} className="text-school-blue" />
                                Visor de Convivencia
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

export default Convivencia;
