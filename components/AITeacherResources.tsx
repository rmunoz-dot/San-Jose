import React, { useState } from 'react';
import { Sparkles, BookOpen, Lightbulb, Loader2, ArrowRight } from 'lucide-react';

const AITeacherResources: React.FC = () => {
    const [topic, setTopic] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);
    const [result, setResult] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleGenerate = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!topic.trim()) {
            return;
        }

        setIsGenerating(true);
        setResult(null);
        setError(null);

        try {
            const response = await fetch('/api/gemini', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ topic })
            });

            if (!response.ok) {
                const errorData = await (async () => { try { return await response.json(); } catch (e) { return null; } })();
                const serverProblem = errorData?.error?.message || errorData?.message || response.statusText || 'Error desconocido';
                console.error("Gemini API Error:", errorData || serverProblem);
                throw new Error("El sistema de IA se encuentra muy solicitado en este momento o ha ocurrido un problema. Por favor, intenta de nuevo más tarde.");
            }

            const data = await response.json();

            if (data.candidates && data.candidates.length > 0 && data.candidates[0].content && data.candidates[0].content.parts.length > 0) {
                const generatedText = data.candidates[0].content.parts[0].text;
                setResult(generatedText);
            } else {
                throw new Error("No se pudo generar la respuesta.");
            }

        } catch (err: any) {
            console.error(err);
            setError(err.message || "Ocurrió un error inesperado al generar las ideas.");
        } finally {
            setIsGenerating(false);
        }
    };

    // Helper para formatear el markdown básico
    const parseMarkdown = (text: string) => {
        // Process bold (**text**) and italic (*text*)
        const parts = text.split(/(\*\*.*?\*\*|\*.*?\*)/g);
        return parts.map((part, index) => {
            if (part.startsWith('**') && part.endsWith('**')) {
                return <strong key={index} className="text-school-navy font-bold">{part.slice(2, -2)}</strong>;
            }
            if (part.startsWith('*') && part.endsWith('*') && part.length > 2) {
                return <em key={index} className="text-school-navy italic">{part.slice(1, -1)}</em>;
            }
            return part;
        });
    };

    return (
        <section className="py-20 bg-gradient-to-br from-blue-50 to-white relative overflow-hidden">
            {/* Elementos decorativos de fondo */}
            <div className="absolute top-0 right-0 -translate-y-12 translate-x-12 opacity-10 pointer-events-none">
                <Sparkles size={300} className="text-school-blue" />
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-10">
                        <span className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 text-school-blue rounded-full font-bold uppercase tracking-widest text-xs mb-4">
                            <Sparkles size={14} /> Vanguardia Educativa
                        </span>
                        <h2 className="font-heading text-4xl md:text-5xl font-bold text-school-navy mb-6">
                            Planificación Asistida por IA
                        </h2>
                        <p className="text-gray-600 text-lg md:text-xl leading-relaxed">
                            Genera de inmediato ideas ingeniosas, modernas y dinámicas para tus clases.
                            Ingresa tu temática y nuestra inteligencia artificial hará el resto.
                        </p>
                    </div>

                    <div className="bg-white p-6 md:p-10 rounded-3xl shadow-xl shadow-blue-900/5 border border-blue-50/50">
                        <form onSubmit={handleGenerate} className="flex flex-col md:flex-row gap-4">
                            <div className="flex-1 relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                                    <BookOpen size={20} />
                                </div>
                                <input
                                    type="text"
                                    value={topic}
                                    onChange={(e) => setTopic(e.target.value)}
                                    placeholder="Ej: El ciclo del agua para kínder"
                                    className="w-full pl-12 pr-4 py-4 text-lg bg-gray-50 border-2 border-transparent focus:bg-white focus:border-school-blue outline-none rounded-2xl transition-all shadow-inner text-gray-800"
                                    required
                                    maxLength={200}
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={isGenerating || !topic.trim()}
                                className="group bg-school-gold hover:bg-yellow-500 text-white font-bold py-4 px-8 rounded-2xl transition-all flex items-center justify-center gap-2 transform hover:-translate-y-1 disabled:opacity-70 disabled:pointer-events-none disabled:transform-none shadow-lg hover:shadow-xl"
                            >
                                {isGenerating ? (
                                    <>
                                        <Loader2 size={24} className="animate-spin" />
                                        <span>Inspirando...</span>
                                    </>
                                ) : (
                                    <>
                                        <Lightbulb size={24} className="group-hover:text-yellow-100" />
                                        <span>Generar Ideas</span>
                                    </>
                                )}
                            </button>
                        </form>

                        {error && (
                            <div className="mt-6 p-4 bg-red-50 border border-red-100 text-red-600 rounded-2xl text-sm font-medium animate-fade-in-up">
                                {error}
                            </div>
                        )}

                        {result && (
                            <div className="mt-8 bg-blue-50/50 border border-blue-100 p-6 md:p-8 rounded-2xl animate-fade-in-up relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-school-blue opacity-5 rounded-full -translate-y-1/2 translate-x-1/2"></div>

                                <h3 className="text-xl font-bold font-heading text-school-navy mb-6 flex items-center gap-2">
                                    <Sparkles size={20} className="text-school-gold" />
                                    Tus Ideas de Clase
                                </h3>

                                <div className="space-y-3 text-gray-700 leading-relaxed">
                                    {result.split('\n').map((line, idx) => {
                                        const trimmed = line.trim();
                                        if (!trimmed) return null; // Skip empty lines

                                        // Headers
                                        if (trimmed.startsWith('#')) {
                                            const level = trimmed.match(/^#+/)?.[0].length || 2;
                                            const content = trimmed.replace(/^#+\s*/, '');
                                            return (
                                                <h4 key={idx} className={`font-bold text-school-navy ${level === 1 ? 'text-xl mt-6 mb-3' : 'text-lg mt-5 mb-2'}`}>
                                                    {parseMarkdown(content)}
                                                </h4>
                                            );
                                        }

                                        // List items
                                        const isBullet = trimmed.startsWith('* ') || trimmed.startsWith('- ');
                                        const isNumbered = /^\d+\.\s/.test(trimmed);

                                        if (isBullet) {
                                            const content = trimmed.replace(/^[\*\-]\s*/, '');
                                            return (
                                                <div key={idx} className="pl-5 relative mb-2">
                                                    <span className="absolute left-0 top-0 text-school-gold font-bold text-lg leading-tight">•</span>
                                                    <p>{parseMarkdown(content)}</p>
                                                </div>
                                            );
                                        }

                                        if (isNumbered) {
                                            const match = trimmed.match(/^(\d+\.)\s*/);
                                            const num = match ? match[1] : '';
                                            const content = trimmed.replace(/^\d+\.\s*/, '');
                                            return (
                                                <div key={idx} className="pl-6 relative mb-2">
                                                    <span className="absolute left-0 top-0 text-school-gold font-bold">{num}</span>
                                                    <p>{parseMarkdown(content)}</p>
                                                </div>
                                            );
                                        }

                                        // Normal paragraph
                                        return (
                                            <p key={idx} className="mb-2">
                                                {parseMarkdown(trimmed)}
                                            </p>
                                        );
                                    })}
                                </div>

                                <div className="mt-8 flex justify-end">
                                    <button
                                        onClick={() => {
                                            navigator.clipboard.writeText(result);
                                            alert("¡Ideas copiadas al portapapeles!");
                                        }}
                                        className="text-school-blue hover:text-school-navy font-semibold text-sm flex items-center gap-1 transition-colors group"
                                    >
                                        Copiar contenido <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AITeacherResources;
