import React, { useState, useEffect, useRef } from 'react';
import { getDocuments, addDocument, deleteDocumentItem, DocumentItem, downloadDocumentFile, updateDocument } from '../data/convivencia';
import { Trash2, Plus, Upload, FileText, Calendar, Tag, LogOut, X, Eye, Loader, Edit2, Save, ArrowLeft, AlertTriangle, HelpCircle } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import AdminTour from '../components/AdminTour';
import AdminTabBar from '../components/AdminTabBar';

const AdminConvivencia: React.FC = () => {
    const [documents, setDocuments] = useState<DocumentItem[]>([]);
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('Protocolos de Actuación');
    const [date, setDate] = useState('');
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [fileError, setFileError] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [viewingPdf, setViewingPdf] = useState<string | null>(null);
    const [runTour, setRunTour] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editTitle, setEditTitle] = useState('');
    const [editDate, setEditDate] = useState('');
    const fileInputRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();

    const fetchDocuments = async () => {
        setIsLoading(true);
        const fetchedDocs = await getDocuments();
        setDocuments(fetchedDocs);
        setIsLoading(false);
    };

    useEffect(() => {
        fetchDocuments();

        const today = new Date();
        const yyyy = today.getFullYear();
        const mm = String(today.getMonth() + 1).padStart(2, '0');
        const dd = String(today.getDate()).padStart(2, '0');
        setDate(`${yyyy}-${mm}-${dd}`);
    }, []);

    const handleLogout = async () => {
        try {
            await signOut(auth);
            navigate('/admin/convivencia-login');
        } catch (error) {
            if (import.meta.env.DEV) console.error('Error signing out:', error);
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        setFileError(null);
        if (file) {
            // Límite de 10 MB para Cloudinary Unsigned Upload
            if (file.size > 10 * 1024 * 1024) {
                setFileError(`El archivo "${file.name}" supera el límite de 10 MB.`);
                setSelectedFile(null);
                if (fileInputRef.current) fileInputRef.current.value = '';
            } else {
                setSelectedFile(file);
            }
        } else {
            setSelectedFile(null);
        }
    };

    const formatDateToChilean = (dateString: string) => {
        if (!dateString) return '';
        const [year, month, day] = dateString.split('-');
        const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
        return `${day} de ${months[parseInt(month, 10) - 1]}, ${year}`;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!title || !selectedFile) {
            alert("Por favor completa el título y asegúrate de subir un archivo válido (menor a 10MB).");
            return;
        }

        setIsSubmitting(true);
        try {
            await addDocument({
                title,
                category,
                date: formatDateToChilean(date),
                fileName: selectedFile.name
            }, selectedFile);

            await fetchDocuments();

            setTitle('');
            setSelectedFile(null);
            if (fileInputRef.current) fileInputRef.current.value = '';
            alert("Documento subido exitosamente.");
        } catch (error: any) {
            console.error("Error al subir:", error);
            alert(`Hubo un error al subir el documento: ${error.message || 'Inténtalo de nuevo.'}`);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDelete = async (id: string, fileUrl: string) => {
        if (window.confirm("¿Estás seguro de que deseas eliminar este documento?")) {
            const success = await deleteDocumentItem(id, fileUrl);
            if (success) {
                await fetchDocuments();
            } else {
                alert("Hubo un error al eliminar el documento.");
            }
        }
    };

    const handleViewPdf = (doc: DocumentItem) => {
        if (doc.fileUrl && doc.fileUrl !== 'chunked_internal') {
            setViewingPdf(doc.fileUrl);
        } else {
            alert("Este documento fue subido con el sistema antiguo. Por favor, elimínalo y vuelve a subirlo.");
        }
    };

    const handleEditClick = (docItem: DocumentItem) => {
        setEditingId(docItem.id);
        setEditTitle(docItem.title);
        const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
        let yyyy = new Date().getFullYear().toString();
        let mm = '01';
        let dd = '01';
        try {
            const parts = docItem.date.split(' de ');
            if (parts.length === 2) {
                dd = parts[0].padStart(2, '0');
                const [mes, anio] = parts[1].split(', ');
                const mIndex = months.indexOf(mes) + 1;
                if (mIndex > 0) mm = mIndex.toString().padStart(2, '0');
                if (anio) yyyy = anio;
            }
        } catch (e) { }
        setEditDate(`${yyyy}-${mm}-${dd}`);
    };

    const handleUpdate = async (id: string) => {
        try {
            await updateDocument(id, {
                title: editTitle,
                date: formatDateToChilean(editDate)
            });
            setEditingId(null);
            await fetchDocuments();
        } catch (error) {
            alert("Error al actualizar el documento");
        }
    };

    const closePdfViewer = () => {
        setViewingPdf(null);
    };

    return (
        <div className="min-h-screen bg-gray-50 py-24 relative">
            <div className="container mx-auto px-6 max-w-6xl">
                <div className="mb-10 text-center">
                    <h1 className="text-3xl font-bold font-heading text-school-gold">Gestión de Convivencia</h1>
                    <p className="text-gray-600 mt-2">Sube y organiza la documentación del área de convivencia.</p>
                </div>

                <AdminTabBar setRunTour={setRunTour} handleLogout={handleLogout} />

                <AdminTour run={runTour} setRun={setRunTour} type="convivencia" />

                <div className="flex flex-col gap-12">
                    <div className="w-full">
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                            <h2 className="text-xl font-bold font-heading text-gray-800 mb-6 flex items-center gap-2">
                                <Plus size={22} className="text-school-gold" />
                                Subir Nuevo Documento
                            </h2>

                            <form onSubmit={handleSubmit} className="space-y-5 relative">
                                {isSubmitting && (
                                    <div className="absolute inset-0 bg-white/60 z-10 flex items-center justify-center backdrop-blur-[1px] rounded-lg">
                                        <Loader className="animate-spin text-school-blue w-10 h-10" />
                                    </div>
                                )}

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Título del Documento</label>
                                    <input
                                        id="conv-form-title"
                                        type="text"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-school-gold focus:ring-1 focus:ring-school-gold transition-colors"
                                        placeholder="Ej: Plan de gestión de convivencia 2026, Reglamento interno, etc..."
                                        maxLength={100}
                                        required
                                    />
                                    <p id="conv-title-advice" className="text-xs text-gray-500 mt-1">
                                        Importante: Si es el plan central, el título debe contener las palabras <span className="font-bold text-gray-800">"Plan de gestión de convivencia"</span> para destacarse en la web automáticamente.
                                    </p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">Categoría</label>
                                        <select
                                            id="conv-form-category"
                                            value={category}
                                            onChange={(e) => setCategory(e.target.value)}
                                            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-school-gold focus:ring-1 focus:ring-school-gold transition-colors bg-white font-medium"
                                        >
                                            <option value="Protocolos de Actuación">Protocolos de Actuación</option>
                                            <option value="Reglamentos">Reglamentos</option>
                                            <option value="Formatos">Formatos</option>
                                            <option value="Planes Anuales">Planes Anuales</option>
                                            <option value="Otros">Otros</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">Fecha (Para mostrar en la lista)</label>
                                        <input
                                            type="date"
                                            value={date}
                                            onChange={(e) => setDate(e.target.value)}
                                            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-school-gold focus:ring-1 focus:ring-school-gold transition-colors bg-white"
                                            required
                                        />
                                    </div>
                                </div>

                                <div id="conv-form-file">
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Subir Archivo (.pdf, .doc, .xls, .ppt)</label>
                                    <div
                                        className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:border-school-gold transition-colors bg-gray-50 cursor-pointer"
                                        onClick={() => fileInputRef.current?.click()}
                                    >
                                        <div className="space-y-1 text-center">
                                            {selectedFile ? (
                                                <div className="flex flex-col items-center">
                                                    <FileText className="mx-auto h-12 w-12 text-school-blue" />
                                                    <span className="mt-2 text-sm text-gray-800 font-medium">{selectedFile.name}</span>
                                                    <span className="text-xs text-gray-500">{(selectedFile.size / 1024 / 1024).toFixed(2)} MB</span>
                                                </div>
                                            ) : (
                                                <Upload className="mx-auto h-10 w-10 text-gray-400" />
                                            )}
                                            <div className="flex text-sm text-gray-600 justify-center mt-2">
                                                <span className="relative rounded-md font-medium text-school-gold hover:text-yellow-600 focus-within:outline-none">
                                                    Seleccionar archivo
                                                </span>
                                            </div>
                                            <p className="text-xs text-gray-500 mt-2">Documentos PDF hasta 10MB</p>
                                        </div>
                                    </div>

                                    {fileError && (
                                        <div className="mt-3 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm animate-fade-in-up">
                                            <div className="flex items-start gap-3">
                                                <AlertTriangle size={20} className="shrink-0 text-red-500 mt-0.5" />
                                                <div>
                                                    <p className="font-bold text-red-800 mb-1">Archivo demasiado grande</p>
                                                    <p className="mb-2">{fileError}</p>
                                                    <p>
                                                        Te recomendamos comprimir tu PDF gratis antes de subirlo aquí:{' '}
                                                        <a 
                                                            href="https://www.ilovepdf.com/es/comprimir_pdf" 
                                                            target="_blank" 
                                                            rel="noopener noreferrer" 
                                                            className="font-bold underline hover:text-red-900 transition-colors inline-block mt-1"
                                                        >
                                                            Comprimir PDF en ILovePDF
                                                        </a>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                    <input
                                        type="file"
                                        className="hidden"
                                        ref={fileInputRef}
                                        accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx"
                                        onChange={handleFileChange}
                                    />
                                </div>

                                <button
                                    id="conv-form-submit"
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full bg-school-gold hover:bg-yellow-500 text-white font-bold py-3 px-4 rounded-lg shadow-md transition-all flex justify-center items-center gap-2 transform hover:-translate-y-0.5 disabled:opacity-70 disabled:pointer-events-none"
                                >
                                    {isSubmitting ? 'Subiendo y procesando...' : (
                                        <>
                                            <Upload size={20} />
                                            Subir Documento
                                        </>
                                    )}
                                </button>
                            </form>
                        </div>
                    </div>

                    <div id="conv-list" className="w-full space-y-4 border-t border-gray-200 pt-8">
                        <h2 className="text-xl font-bold font-heading text-gray-800 mb-6 flex items-center gap-2">
                            <FileText size={22} className="text-school-navy" />
                            Documentos Subidos ({documents.length})
                        </h2>

                        {isLoading ? (
                            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center text-gray-500">
                                Cargando documentos...
                            </div>
                        ) : documents.length === 0 ? (
                            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center text-gray-500">
                                No hay documentos subidos aún en el portal de convivencia.
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {documents.map((item) => (
                                    <div key={item.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col justify-between hover:shadow-md transition-shadow">
                                        <div>
                                            <div className="flex items-center gap-3 mb-3">
                                                <div className="flex-shrink-0 w-12 h-16 bg-blue-50 text-school-blue rounded overflow-hidden flex items-center justify-center relative border border-gray-100">
                                                    {item.thumbnailBase64 ? (
                                                        <img src={item.thumbnailBase64} alt="mini" className="w-full h-full object-cover" />
                                                    ) : (
                                                        <FileText size={24} />
                                                    )}
                                                </div>
                                                {editingId === item.id ? (
                                                    <input
                                                        type="text"
                                                        value={editTitle}
                                                        onChange={(e) => setEditTitle(e.target.value)}
                                                        className="font-bold text-gray-800 flex-1 border rounded px-2 py-1 text-sm bg-blue-50 focus:outline-none focus:ring-2 focus:ring-school-blue w-full"
                                                    />
                                                ) : (
                                                    <h3 className="font-bold text-gray-800 line-clamp-2 text-md flex-1" title={item.title}>{item.title}</h3>
                                                )}
                                            </div>
                                            <p className="text-xs text-gray-500 truncate mb-1">Archivo: {item.fileName}</p>
                                            <p className="text-xs text-school-blue font-medium mb-4"><Tag size={12} className="inline mr-1" /> {item.category}</p>

                                            {editingId === item.id ? (
                                                <input
                                                    type="date"
                                                    value={editDate}
                                                    onChange={(e) => setEditDate(e.target.value)}
                                                    className="w-full text-xs text-gray-800 mb-4 border rounded px-2 py-1 bg-blue-50"
                                                />
                                            ) : (
                                                <p className="text-xs text-gray-400 mb-4"><Calendar size={12} className="inline mr-1" /> {item.date}</p>
                                            )}
                                        </div>
                                        <div className="flex flex-wrap gap-2">
                                            {editingId === item.id ? (
                                                <button
                                                    onClick={() => handleUpdate(item.id)}
                                                    className="flex-1 py-1.5 px-2 bg-green-50 hover:bg-green-600 hover:text-white text-green-700 rounded transition-colors flex items-center justify-center gap-1 text-xs font-semibold"
                                                >
                                                    <Save size={14} /> Guardar
                                                </button>
                                            ) : (
                                                <button
                                                    onClick={() => handleEditClick(item)}
                                                    className="flex-1 py-1.5 px-2 bg-blue-50 hover:bg-school-blue hover:text-white text-school-blue rounded transition-colors flex items-center justify-center gap-1 text-xs font-semibold"
                                                >
                                                    <Edit2 size={14} /> Editar
                                                </button>
                                            )}
                                            <button
                                                onClick={() => handleViewPdf(item)}
                                                disabled={editingId === item.id}
                                                className="flex-1 py-1.5 px-2 bg-gray-50 hover:bg-gray-200 text-gray-700 rounded transition-colors flex items-center justify-center gap-1 text-xs font-semibold disabled:opacity-50"
                                            >
                                                <Eye size={14} />
                                                Ver
                                            </button>
                                            <button
                                                onClick={() => downloadDocumentFile(item.id, item.fileName)}
                                                disabled={editingId === item.id}
                                                className="flex-1 py-1.5 px-2 bg-gray-50 hover:bg-gray-200 text-gray-700 rounded transition-colors flex items-center justify-center gap-1 text-xs font-semibold disabled:opacity-50"
                                            >
                                                Descargar
                                            </button>
                                            <button
                                                onClick={() => handleDelete(item.id, item.fileUrl)}
                                                disabled={editingId === item.id}
                                                className="flex-1 py-1.5 px-2 bg-red-50 hover:bg-red-500 text-red-600 hover:text-white rounded transition-colors flex items-center justify-center gap-1 text-xs font-semibold disabled:opacity-50"
                                            >
                                                <Trash2 size={14} />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
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
        </div>
    );
};

export default AdminConvivencia;
