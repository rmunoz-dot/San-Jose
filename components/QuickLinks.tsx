import React, { useState } from 'react';
import { ScrollText, BookOpen, BarChart3, Users2, FileText, X, Loader, HeartHandshake } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getDocuments, getDocumentBlobUrl } from '../data/documents';

const QuickLinks: React.FC = () => {
  const [viewingPdf, setViewingPdf] = useState<string | null>(null);
  const [loadingCategory, setLoadingCategory] = useState<string | null>(null);

  const handleDocumentClick = async (e: React.MouseEvent, category: string) => {
    e.preventDefault();
    setLoadingCategory(category);
    try {
      const allDocs = await getDocuments();
      const docsInCategory = allDocs.filter(d => d.category === category);

      if (docsInCategory.length > 0) {
        // Obtenemos el más reciente de esta categoría
        const targetDoc = docsInCategory[0];
        const url = await getDocumentBlobUrl(targetDoc.id);
        if (url) {
          setViewingPdf(url);
        } else {
          alert(`El documento '${targetDoc.title}' no se pudo cargar.`);
        }
      } else {
        alert(`No hay documentos publicados actualmente en la categoría: ${category}`);
      }
    } catch (err) {
      if (import.meta.env.DEV) console.error(err);
      alert("Error al cargar documento desde la base de datos.");
    } finally {
      setLoadingCategory(null);
    }
  };

  const closePdfViewer = () => {
    if (viewingPdf) {
      URL.revokeObjectURL(viewingPdf);
      setViewingPdf(null);
    }
  };

  return (
    <>
      <section className="py-12 relative z-30 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">

            <Link
              to="/documentos?category=Reglamentos Institucionales"
              className="group bg-white/80 backdrop-blur-md p-8 rounded-xl shadow-lg hover:shadow-xl hover:bg-school-navy transition-all duration-300 cursor-pointer border border-white/20 flex flex-col items-center text-center gap-4 transform hover:-translate-y-1 relative"
            >
              <div className="p-4 bg-blue-50 rounded-full group-hover:bg-white/10 transition-colors">
                <ScrollText size={40} strokeWidth={1.5} className="text-school-navy group-hover:text-white transition-colors" />
              </div>
              <h3 className="font-heading font-semibold text-lg text-gray-800 group-hover:text-white transition-colors">
                Reglamentos Institucionales
              </h3>
            </Link>

            <a
              href="#plan-formacion"
              onClick={(e) => handleDocumentClick(e, 'Plan de Formación Ciudadana')}
              className="group bg-white/80 backdrop-blur-md p-8 rounded-xl shadow-lg hover:shadow-xl hover:bg-school-navy transition-all duration-300 cursor-pointer border border-white/20 flex flex-col items-center text-center gap-4 transform hover:-translate-y-1 relative"
            >
              <div className="p-4 bg-blue-50 rounded-full group-hover:bg-white/10 transition-colors">
                {loadingCategory === 'Plan de Formación Ciudadana' ? <Loader className="animate-spin text-school-navy group-hover:text-white" size={40} /> : <BookOpen size={40} strokeWidth={1.5} className="text-school-navy group-hover:text-white transition-colors" />}
              </div>
              <h3 className="font-heading font-semibold text-lg text-gray-800 group-hover:text-white transition-colors">
                Plan de Formación Ciudadana
              </h3>
            </a>

            <a
              href="#cuenta-publica"
              onClick={(e) => handleDocumentClick(e, 'Cuenta Pública')}
              className="group bg-white/80 backdrop-blur-md p-8 rounded-xl shadow-lg hover:shadow-xl hover:bg-school-navy transition-all duration-300 cursor-pointer border border-white/20 flex flex-col items-center text-center gap-4 transform hover:-translate-y-1 relative"
            >
              <div className="p-4 bg-blue-50 rounded-full group-hover:bg-white/10 transition-colors">
                {loadingCategory === 'Cuenta Pública' ? <Loader className="animate-spin text-school-navy group-hover:text-white" size={40} /> : <BarChart3 size={40} strokeWidth={1.5} className="text-school-navy group-hover:text-white transition-colors" />}
              </div>
              <h3 className="font-heading font-semibold text-lg text-gray-800 group-hover:text-white transition-colors">
                Cuenta Pública
              </h3>
            </a>

            <Link
              to="/equipo"
              className="group bg-white/80 backdrop-blur-md p-8 rounded-xl shadow-lg hover:shadow-xl hover:bg-school-navy transition-all duration-300 cursor-pointer border border-white/20 flex flex-col items-center text-center gap-4 transform hover:-translate-y-1"
            >
              <div className="p-4 bg-blue-50 rounded-full group-hover:bg-white/10 transition-colors">
                <Users2 size={40} strokeWidth={1.5} className="text-school-navy group-hover:text-white transition-colors" />
              </div>
              <h3 className="font-heading font-semibold text-lg text-gray-800 group-hover:text-white transition-colors">
                Nuestro Equipo
              </h3>
            </Link>

            <Link
              to="/convivencia-escolar"
              className="group bg-white/80 backdrop-blur-md p-8 rounded-xl shadow-lg hover:shadow-xl hover:bg-school-navy transition-all duration-300 cursor-pointer border border-white/20 flex flex-col items-center text-center gap-4 transform hover:-translate-y-1"
            >
              <div className="p-4 bg-blue-50 rounded-full group-hover:bg-white/10 transition-colors">
                <HeartHandshake size={40} strokeWidth={1.5} className="text-school-navy group-hover:text-white transition-colors" />
              </div>
              <h3 className="font-heading font-semibold text-lg text-gray-800 group-hover:text-white transition-colors">
                Convivencia Escolar
              </h3>
            </Link>

          </div>
        </div>
      </section>

      {viewingPdf && (
        <div className="fixed inset-0 z-[100] bg-black/80 flex flex-col justify-center items-center p-4 md:p-10 backdrop-blur-sm transition-all -mt-20">
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
    </>
  );
};

export default QuickLinks;