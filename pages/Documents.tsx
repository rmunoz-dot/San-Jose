import React, { useState, useEffect } from 'react';
import { FileText, Download, ShieldCheck, Scale, Book, Loader, Tag, Calendar, ExternalLink, X, Eye, Filter, AlertTriangle } from 'lucide-react';
import { getDocuments as getInstitutionalDocs, DocumentItem, downloadDocumentFile as downloadInstitutional } from '../data/documents';
import { getDocuments as getConvivenciaDocs, downloadDocumentFile as downloadConvivencia } from '../data/convivencia';
import { useLocation } from 'react-router-dom';

// Tipo extendido para saber de qué colección proviene
interface ExtendedDocumentItem extends DocumentItem {
    source: 'institucional' | 'convivencia';
}

const Documents: React.FC = () => {
    const [documents, setDocuments] = useState<ExtendedDocumentItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [viewingPdf, setViewingPdf] = useState<string | null>(null);

    const [selectedCategory, setSelectedCategory] = useState<string>('Todos');
    const location = useLocation();

    useEffect(() => {
        const fetchAllDocs = async () => {
            setIsLoading(true);
            const [instDocs, convDocs] = await Promise.all([
                getInstitutionalDocs(),
                getConvivenciaDocs()
            ]);

            // Marcar el origen de cada documento
            const institutional: ExtendedDocumentItem[] = instDocs.map(d => ({ ...d, source: 'institucional' as const }));
            const convivencia: ExtendedDocumentItem[] = convDocs.map(d => ({ ...d, source: 'convivencia' as const }));

            setDocuments([...institutional, ...convivencia]);
            setIsLoading(false);
        };
        fetchAllDocs();
    }, []);

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const cat = params.get('category');
        if (cat) {
            setSelectedCategory(cat);
        }
    }, [location]);

    const categories = ['Todos', 'Institucional', 'UTP', 'Convivencia'];

    const filteredDocuments = React.useMemo(() => {
        if (selectedCategory === 'Institucional') {
            return documents.filter(d => d.source === 'institucional' && !d.category.toLowerCase().includes('utp'));
        }
        if (selectedCategory === 'UTP') {
            return documents.filter(d => d.source === 'institucional' && d.category.toLowerCase().includes('utp'));
        }
        if (selectedCategory === 'Convivencia') {
            return documents.filter(d => d.source === 'convivencia');
        }
        return documents;
    }, [selectedCategory, documents]);

    const getIconForCategory = (category: string) => {
        switch (category) {
            case 'Reglamentos Institucionales': return <ShieldCheck size={32} />;
            case 'Plan de Formación Ciudadana': return <Scale size={32} />;
            case 'Protocolos': return <FileText size={32} />;
            case 'Protocolos de Actuación': return <AlertTriangle size={32} />;
            case 'Reglamentos': return <ShieldCheck size={32} />;
            default: return <Book size={32} />;
        }
    };

    const handleViewPdf = (doc: ExtendedDocumentItem) => {
        if (doc.fileUrl && doc.fileUrl !== 'chunked_internal') {
            setViewingPdf(doc.fileUrl);
        } else {
            alert("Este documento fue subido con el sistema antiguo y no se puede visualizar directamente.");
        }
    };

    const closePdfViewer = () => {
        setViewingPdf(null);
    };

    const handleDownload = (doc: ExtendedDocumentItem) => {
        if (doc.source === 'convivencia') {
            downloadConvivencia(doc.id, doc.fileName);
        } else {
            downloadInstitutional(doc.id, doc.fileName);
        }
    };

    // Badge de origen para distinguir visualmente
    const getSourceBadge = (source: 'institucional' | 'convivencia') => {
        if (source === 'convivencia') {
            return <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium">Convivencia</span>;
        }
        return null; // Los institucionales no necesitan badge, son los "normales"
    };

    return (
        <section className="py-20 bg-gray-50 min-h-screen relative">
            <div className="container mx-auto px-6 pt-10">
                <div className="text-center mb-16">
                    <span className="text-school-gold font-bold uppercase tracking-widest text-sm">Transparencia</span>
                    <h1 className="font-heading text-4xl md:text-5xl font-bold text-school-navy mt-4 mb-6">Documentación Institucional</h1>
                    <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                        Accede, lee y descarga los reglamentos y protocolos que rigen nuestra convivencia y funcionamiento escolar.
                    </p>
                </div>

                <div className="grid gap-6 max-w-4xl mx-auto">
                    {/* Category Filter Tabs */}
                    {!isLoading && documents.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4 justify-center">
                            {categories.map(cat => (
                                <button
                                    key={cat}
                                    onClick={() => setSelectedCategory(cat)}
                                    className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors duration-300 ${selectedCategory === cat
                                        ? 'bg-school-navy text-white shadow-md'
                                        : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
                                        }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    )}

                    {isLoading ? (
                        <div className="flex flex-col items-center justify-center p-12 text-gray-500">
                            <Loader size={48} className="animate-spin text-school-blue mb-4" />
                            <p>Cargando documentos...</p>
                        </div>
                    ) : filteredDocuments.length === 0 ? (
                        <div className="bg-white p-12 rounded-xl shadow-sm border border-gray-100 text-center text-gray-500">
                            No hay documentos disponibles en esta categoría.
                        </div>
                    ) : (
                        filteredDocuments.map((doc) => (
                            <div key={`${doc.source}-${doc.id}`} className="bg-white p-4 sm:p-6 md:p-8 rounded-xl shadow-sm border border-gray-100 flex flex-col md:flex-row items-start md:items-center justify-between hover:shadow-lg transition-all duration-300 group">
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
                                            {getSourceBadge(doc.source)}
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto mt-4 md:mt-0">
                                    <button
                                        onClick={() => handleViewPdf(doc)}
                                        className="flex flex-1 items-center justify-center gap-2 bg-school-blue hover:bg-school-navy text-white px-6 py-3 rounded-lg font-bold transition-all duration-300"
                                    >
                                        <Eye size={20} />
                                        <span>Ver</span>
                                    </button>
                                    <button
                                        onClick={() => handleDownload(doc)}
                                        className="flex flex-1 items-center justify-center gap-2 bg-gray-50 border border-gray-200 hover:bg-school-gold hover:border-school-gold hover:text-white px-6 py-3 rounded-lg font-bold text-gray-700 transition-all duration-300"
                                    >
                                        <Download size={20} />
                                        <span>Descargar</span>
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {viewingPdf && (
                <div className="fixed inset-0 z-50 bg-black/80 flex flex-col justify-center items-center p-4 md:p-10 backdrop-blur-sm transition-all">
                    <div className="bg-white w-full max-w-5xl h-[85vh] md:h-[90vh] rounded-xl overflow-hidden shadow-2xl flex flex-col relative animate-fade-in-up">
                        <div className="flex justify-between items-center p-4 border-b border-gray-100 bg-gray-50">
                            <h3 className="font-bold text-gray-800 flex items-center gap-2">
                                <FileText size={18} className="text-school-blue" />
                                Visor de Documentos
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
}

export default Documents;
