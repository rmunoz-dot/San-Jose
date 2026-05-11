
import React, { useState } from 'react';
import { Send, User, Mail, MessageSquare, AlertCircle, CheckCircle2 } from 'lucide-react';

const ContactForm: React.FC = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('submitting');
        
        // Simulating form submission for now as per instructions (no Formspree config yet)
        setTimeout(() => {
            console.log('Form data:', formData);
            setStatus('success');
            setFormData({
                name: '',
                email: '',
                subject: '',
                message: ''
            });
        }, 1500);
    };

    if (status === 'success') {
        return (
            <div className="bg-white p-8 md:p-12 rounded-2xl shadow-xl text-center animate-fade-in">
                <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 size={40} />
                </div>
                <h3 className="text-2xl font-bold text-school-navy mb-4">¡Mensaje Enviado!</h3>
                <p className="text-gray-600 mb-8">
                    Gracias por contactarnos. Hemos recibido tu mensaje y nos pondremos en contacto contigo a la brevedad posible.
                </p>
                <button 
                    onClick={() => setStatus('idle')}
                    className="bg-school-blue hover:bg-school-navy text-white px-8 py-3 rounded-lg font-bold transition-all duration-300 transform hover:-translate-y-0.5"
                >
                    Enviar otro mensaje
                </button>
            </div>
        );
    }

    return (
        <div className="bg-white p-6 md:p-10 rounded-2xl shadow-xl border border-gray-100">
            <h3 className="text-2xl font-bold text-school-navy mb-8 flex items-center gap-3">
                <MessageSquare className="text-school-gold" size={28} />
                Formulario de Contacto
            </h3>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                            <User size={16} className="text-school-blue" />
                            Nombre Completo
                        </label>
                        <input
                            type="text"
                            name="name"
                            required
                            placeholder="Tu nombre completo"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-school-gold focus:ring-4 focus:ring-school-gold/10 outline-none transition-all bg-gray-50/50"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                            <Mail size={16} className="text-school-blue" />
                            Correo Electrónico
                        </label>
                        <input
                            type="email"
                            name="email"
                            required
                            placeholder="ejemplo@correo.com"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-school-gold focus:ring-4 focus:ring-school-gold/10 outline-none transition-all bg-gray-50/50"
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700">Asunto</label>
                    <select
                        name="subject"
                        required
                        value={formData.subject}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-school-gold focus:ring-4 focus:ring-school-gold/10 outline-none transition-all bg-gray-50/50"
                    >
                        <option value="">Selecciona una opción</option>
                        <option value="Consulta General">Consulta General</option>
                        <option value="Admisión">Admisión</option>
                        <option value="Certificados">Certificados</option>
                        <option value="Soporte Técnico">Soporte Técnico</option>
                        <option value="Otro">Otro</option>
                    </select>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700">Mensaje</label>
                    <textarea
                        name="message"
                        required
                        rows={5}
                        placeholder="Escribe tu mensaje aquí..."
                        value={formData.message}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-school-gold focus:ring-4 focus:ring-school-gold/10 outline-none transition-all bg-gray-50/50 resize-none"
                    ></textarea>
                </div>

                {errorMessage && (
                    <div className="p-4 bg-red-50 border border-red-100 rounded-xl text-red-600 text-sm flex items-center gap-3">
                        <AlertCircle size={18} />
                        {errorMessage}
                    </div>
                )}

                <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="w-full bg-school-navy hover:bg-school-blue text-white py-4 rounded-xl font-bold text-lg shadow-lg shadow-school-navy/20 transition-all duration-300 transform hover:-translate-y-1 active:translate-y-0 disabled:opacity-70 disabled:pointer-events-none flex items-center justify-center gap-3 group"
                >
                    {status === 'submitting' ? (
                        <>
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                            Enviando...
                        </>
                    ) : (
                        <>
                            <Send size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                            Enviar Mensaje
                        </>
                    )}
                </button>
            </form>
        </div>
    );
};

export default ContactForm;
