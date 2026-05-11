import React, { useState, useEffect, useRef } from 'react';
import { getNews, addNewsItem, deleteNewsItem, NewsItem } from '../data/news';
import { Trash2, Plus, Upload, Image as ImageIcon, Calendar, Tag, ArrowLeft, Bold, Italic, Underline, List, ListOrdered, LogOut, HelpCircle } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import DOMPurify from 'dompurify';
import AdminTour from '../components/AdminTour';
import AdminTabBar from '../components/AdminTabBar';

interface RichTextEditorProps {
    value: string;
    onChange: (value: string) => void;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({ value, onChange }) => {
    const editorRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (editorRef.current && editorRef.current.innerHTML !== value) {
            editorRef.current.innerHTML = value;
        }
    }, [value]);

    const handleInput = () => {
        if (editorRef.current) {
            onChange(editorRef.current.innerHTML);
        }
    };

    const execCommand = (command: string, arg?: string) => {
        document.execCommand(command, false, arg);
        editorRef.current?.focus();
        handleInput();
    };

    return (
        <div className="border border-gray-200 rounded-lg overflow-hidden flex flex-col focus-within:ring-2 focus-within:ring-school-blue/50 bg-white">
            <div className="bg-gray-50 border-b border-gray-200 p-2 flex gap-2">
                <button type="button" onClick={() => execCommand('bold')} className="p-1.5 hover:bg-gray-200 rounded text-gray-700" title="Negrita"><Bold size={16} /></button>
                <button type="button" onClick={() => execCommand('italic')} className="p-1.5 hover:bg-gray-200 rounded text-gray-700" title="Cursiva"><Italic size={16} /></button>
                <button type="button" onClick={() => execCommand('underline')} className="p-1.5 hover:bg-gray-200 rounded text-gray-700" title="Subrayado"><Underline size={16} /></button>
                <div className="w-px h-6 bg-gray-300 mx-1"></div>
                <button type="button" onClick={() => execCommand('insertUnorderedList')} className="p-1.5 hover:bg-gray-200 rounded text-gray-700" title="Lista con viñetas"><List size={16} /></button>
                <button type="button" onClick={() => execCommand('insertOrderedList')} className="p-1.5 hover:bg-gray-200 rounded text-gray-700" title="Lista numerada"><ListOrdered size={16} /></button>
            </div>
            <div
                ref={editorRef}
                contentEditable
                onInput={handleInput}
                onBlur={handleInput}
                className="p-4 min-h-[300px] outline-none prose max-w-none focus:outline-none"
                style={{ whiteSpace: 'pre-wrap' }}
            />
        </div>
    );
};

const AdminNews: React.FC = () => {
    const [news, setNews] = useState<NewsItem[]>([]);
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('Académico');
    const [date, setDate] = useState('');
    const [content, setContent] = useState('');
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [runTour, setRunTour] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();

    const fetchNews = async () => {
        setIsLoading(true);
        const fetchedNews = await getNews();
        setNews(fetchedNews);
        setIsLoading(false);
    };

    useEffect(() => {
        fetchNews();

        // Formatear la fecha actual para el valor por defecto
        const today = new Date();
        const yyyy = today.getFullYear();
        const mm = String(today.getMonth() + 1).padStart(2, '0');
        const dd = String(today.getDate()).padStart(2, '0');
        setDate(`${yyyy}-${mm}-${dd}`);
    }, []);

    const handleLogout = async () => {
        try {
            await signOut(auth);
            navigate('/admin/login');
        } catch (error) {
            if (import.meta.env.DEV) console.error('Error signing out:', error);
        }
    };

    const resizeImage = (dataUrl: string, maxWidth: number, maxHeight: number): Promise<string> => {
        return new Promise((resolve) => {
            const img = new window.Image();
            img.src = dataUrl;
            img.onload = () => {
                let width = img.width;
                let height = img.height;

                if (width > height) {
                    if (width > maxWidth) {
                        height *= maxWidth / width;
                        width = maxWidth;
                    }
                } else {
                    if (height > maxHeight) {
                        width *= maxHeight / height;
                        height = maxHeight;
                    }
                }

                const canvas = document.createElement('canvas');
                canvas.width = width;
                canvas.height = height;
                const ctx = canvas.getContext('2d');
                if (ctx) {
                    ctx.drawImage(img, 0, 0, width, height);
                    resolve(canvas.toDataURL('image/jpeg', 0.8)); // 80% quality JPEG
                } else {
                    resolve(dataUrl);
                }
            };
        });
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = async () => {
                const result = reader.result as string;
                // Resize to 1024x1024 max to keep base64 string under Firestore's 1MB limit
                const resized = await resizeImage(result, 1024, 1024);
                setImagePreview(resized);
            };
            reader.readAsDataURL(file);
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

        if (!title || !content || !imagePreview) {
            alert("Por favor completa todos los campos y sube una imagen.");
            return;
        }

        setIsSubmitting(true);
        try {
            // Sanitize HTML content before storing to prevent XSS
            const sanitizedContent = DOMPurify.sanitize(content, {
                ALLOWED_TAGS: ['p', 'br', 'b', 'i', 'u', 'strong', 'em', 'ul', 'ol', 'li', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'a', 'blockquote', 'span', 'div'],
                ALLOWED_ATTR: ['href', 'class', 'target', 'rel'],
                ALLOW_DATA_ATTR: false,
            });

            await addNewsItem({
                title: title.trim(),
                category,
                date: formatDateToChilean(date),
                image: imagePreview,
                content: sanitizedContent
            });

            // Refrescar lista
            await fetchNews();

            // Limpiar formulario
            setTitle('');
            setContent('');
            setImagePreview(null);
            if (fileInputRef.current) fileInputRef.current.value = '';
            alert("Noticia publicada exitosamente.");
        } catch (error) {
            if (import.meta.env.DEV) console.error("Error al publicar:", error);
            alert("Hubo un error al publicar la noticia.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (window.confirm("¿Estás seguro de que deseas eliminar esta noticia?")) {
            const success = await deleteNewsItem(id);
            if (success) {
                await fetchNews();
            } else {
                alert("Hubo un error al eliminar la noticia.");
            }
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-24">
            <div className="container mx-auto px-6 max-w-6xl">
                <div className="mb-10 text-center">
                    <h1 className="text-3xl font-bold font-heading text-school-navy">Panel de Administración de Noticias</h1>
                    <p className="text-gray-600 mt-2">Publica y gestiona las noticias y comunicados del colegio.</p>
                </div>

                <AdminTabBar setRunTour={setRunTour} handleLogout={handleLogout} />
                <AdminTour run={runTour} setRun={setRunTour} type="news" />

                <div className="flex flex-col gap-12">
                    {/* Formulario de Nueva Noticia */}
                    <div className="w-full">
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                            <h2 className="text-xl font-bold font-heading text-gray-800 mb-6 flex items-center gap-2">
                                <Plus size={22} className="text-school-gold" />
                                Nueva Publicación
                            </h2>

                            <form onSubmit={handleSubmit} className="space-y-5">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">Título de la Noticia</label>
                                    <input
                                        id="news-form-title"
                                        type="text"
                                        required
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-school-blue/50 focus:border-school-blue outline-none transition-all"
                                        placeholder="Ej: Ceremonia de Titulación 2025"
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-1">Categoría</label>
                                        <select
                                            id="news-form-category"
                                            value={category}
                                            onChange={(e) => setCategory(e.target.value)}
                                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-school-blue/50 outline-none"
                                        >
                                            <option value="Académico">Académico</option>
                                            <option value="Deportes">Deportes</option>
                                            <option value="Admisión">Admisión</option>
                                            <option value="Comunicados">Comunicados</option>
                                            <option value="Eventos">Eventos</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-1">Fecha</label>
                                        <input
                                            type="date"
                                            required
                                            value={date}
                                            onChange={(e) => setDate(e.target.value)}
                                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-school-blue/50 outline-none"
                                        />
                                    </div>
                                </div>

                                <div id="news-form-image">
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">Imagen de Portada</label>
                                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer" onClick={() => fileInputRef.current?.click()}>
                                        <div className="space-y-1 text-center">
                                            {imagePreview ? (
                                                <img src={imagePreview} alt="Preview" className="mx-auto h-32 object-cover rounded shadow-sm" />
                                            ) : (
                                                <Upload className="mx-auto h-10 w-10 text-gray-400" />
                                            )}
                                            <div className="flex text-sm text-gray-600 justify-center mt-2">
                                                <span className="relative rounded-md font-medium text-school-blue hover:text-school-navy focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-school-blue">
                                                    Subir un archivo
                                                </span>
                                            </div>
                                            <p className="text-xs text-gray-500">PNG, JPG, GIF hasta 5MB</p>
                                        </div>
                                    </div>
                                    <input
                                        type="file"
                                        className="hidden"
                                        ref={fileInputRef}
                                        accept="image/*"
                                        onChange={handleImageChange}
                                    />
                                </div>

                                <div id="news-form-editor">
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">Cuerpo de la Noticia</label>
                                    <p className="text-xs text-gray-500 mb-2">Usa las herramientas para dar formato. Lo que ves es cómo se publicará en la página.</p>
                                    <RichTextEditor
                                        value={content}
                                        onChange={setContent}
                                    />
                                </div>

                                <button
                                    id="news-form-submit"
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full bg-school-gold hover:bg-yellow-500 text-white font-bold py-3 px-4 rounded-lg shadow-md transition-all flex justify-center items-center gap-2 transform hover:-translate-y-0.5 disabled:opacity-70 disabled:pointer-events-none disabled:transform-none"
                                >
                                    {isSubmitting ? 'Publicando...' : (
                                        <>
                                            <Plus size={20} />
                                            Publicar Noticia
                                        </>
                                    )}
                                </button>
                            </form>
                        </div>
                    </div>

                    {/* Lista de Noticias Existentes */}
                    <div className="w-full space-y-4 border-t border-gray-200 pt-8">
                        <h2 className="text-xl font-bold font-heading text-gray-800 mb-6 flex items-center gap-2">
                            <ImageIcon size={22} className="text-school-navy" />
                            Noticias Publicadas ({news.length})
                        </h2>

                        <div id="news-list">

                        {isLoading ? (
                            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center text-gray-500">
                                Cargando noticias...
                            </div>
                        ) : news.length === 0 ? (
                            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center text-gray-500">
                                No hay noticias publicadas aún.
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                                {news.map((item) => (
                                    <div key={item.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col group">
                                        <div className="h-32 overflow-hidden relative">
                                            <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                                            <div className="absolute top-2 left-2 max-w-[80%] overflow-hidden text-ellipsis whitespace-nowrap bg-school-navy/80 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-1 rounded">
                                                ID: {item.id}
                                            </div>
                                        </div>
                                        <div className="p-4 flex flex-col flex-grow">
                                            <h3 className="font-bold text-gray-800 line-clamp-2 text-sm mb-2" title={item.title}>{item.title}</h3>
                                            <div className="flex justify-between items-center text-xs text-gray-500 mb-4 mt-auto">
                                                <span className="flex items-center gap-1"><Tag size={12} /> {item.category}</span>
                                                <span className="flex items-center gap-1"><Calendar size={12} /> {item.date}</span>
                                            </div>
                                            <button
                                                onClick={() => handleDelete(item.id)}
                                                className="w-full py-2 bg-red-50 hover:bg-red-500 text-red-600 hover:text-white rounded-lg transition-colors flex items-center justify-center gap-2 text-sm font-semibold"
                                            >
                                                <Trash2 size={16} /> Eliminar
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    </div>
    );
};

export default AdminNews;
