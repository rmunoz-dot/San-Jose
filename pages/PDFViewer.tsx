import React from 'react';
import { FileText } from 'lucide-react';

interface PDFViewerProps {
    title: string;
}

const PDFViewer: React.FC<PDFViewerProps> = ({ title }) => {
    return (
        <section className="py-20 bg-gray-50 min-h-screen">
            <div className="container mx-auto px-6 pt-10">
                <div className="text-center mb-12">
                    <span className="text-school-gold font-bold uppercase tracking-widest text-sm">Documento Oficial</span>
                    <h1 className="font-heading text-4xl md:text-5xl font-bold text-school-navy mt-4">{title}</h1>
                </div>

                <div className="bg-white p-4 md:p-8 rounded-2xl shadow-xl max-w-5xl mx-auto h-[800px] flex flex-col items-center justify-center border border-gray-200">
                    <div className="text-center text-gray-400 max-w-md">
                        <div className="bg-gray-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
                            <FileText size={48} />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-600 mb-2">Visor de Documentos</h3>
                        <p className="text-gray-500">
                            El documento PDF se integrará aquí.
                            <br />
                            (Esperando archivo fuente)
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
export default PDFViewer;
