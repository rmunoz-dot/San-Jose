import React from 'react';
import { Phone, Mail, MapPin, Facebook, Instagram, Twitter } from 'lucide-react';
import { HashLink } from 'react-router-hash-link';
import logo from '../assets/logo.png';
import aprendoImg from '../assets/AprendoEnLinea-Banner.png';
import craImg from '../assets/cra.png';
import simceImg from '../assets/bannersimce.webp';
import webclassImg from '../assets/logowebclass.webp';

const Footer: React.FC = () => {
  return (
    <footer id="footer" className="bg-school-navy text-white pt-20 pb-10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10 mb-16">

          {/* Brand */}
          <div className="space-y-6 lg:col-span-4">
            <div className="flex items-center gap-3">
              <img src={logo} alt="San José School" className="h-16 w-auto object-contain" />
              <div className="flex flex-col justify-center">
                <span className="font-nunito font-medium text-3xl tracking-[0.2em]">SAN JOSÉ</span>
                <span className="font-nunito text-school-gold text-sm font-extrabold tracking-[0.25em] uppercase mt-0 ml-0.5">School</span>
              </div>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Formando líderes del mañana con una educación integral y valórica desde 1982.
            </p>
            <h4 className="font-bold text-sm text-school-gold uppercase tracking-wider mt-2 mb-2">Síguenos</h4>
            <div className="flex gap-3">
              <a href="https://www.facebook.com/profile.php?id=100057686138539" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-white/10 hover:bg-[#1877F2] transition-all duration-300 group">
                <Facebook size={22} strokeWidth={1.5} className="group-hover:scale-110 transition-transform" />
                <span className="text-sm font-semibold hidden md:inline">Facebook</span>
              </a>
              <a href="https://www.instagram.com/sanjoseschool_cl/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-white/10 hover:bg-gradient-to-r hover:from-[#833AB4] hover:via-[#FD1D1D] hover:to-[#F77737] transition-all duration-300 group">
                <Instagram size={22} strokeWidth={1.5} className="group-hover:scale-110 transition-transform" />
                <span className="text-sm font-semibold hidden md:inline">Instagram</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2">
            <h4 className="font-bold text-lg mb-6 text-school-gold">Enlaces Rápidos</h4>
            <ul className="space-y-3 text-sm text-gray-300">
              <li><HashLink smooth to="/#" className="hover:text-white transition-colors">Inicio</HashLink></li>
              <li><HashLink smooth to="/#about" className="hover:text-white transition-colors">Nuestro Colegio</HashLink></li>
              <li><a href="https://www.sistemadeadmisionescolar.cl/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Admisión 2027</a></li>
              <li><HashLink smooth to="/#staff" className="hover:text-white transition-colors">Cuerpo Docente</HashLink></li>
              <li><a href="/contacto" className="hover:text-white transition-colors">Contacto</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="lg:col-span-3">
            <h4 className="font-bold text-lg mb-6 text-school-gold">Contacto</h4>
            <ul className="space-y-4 text-sm text-gray-300">
              <li className="flex items-start gap-3">
                <MapPin className="text-school-gold mt-1 flex-shrink-0" size={18} strokeWidth={1.5} />
                <div>
                  <span className="font-semibold text-white text-xs uppercase tracking-wide">Escuela Básica</span><br />
                  <span>Santa Petronila Nº3, Estación Central</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="text-school-gold mt-1 flex-shrink-0" size={18} strokeWidth={1.5} />
                <div>
                  <span className="font-semibold text-white text-xs uppercase tracking-wide">Jardín Infantil</span><br />
                  <span>Santa Petronila Nº17, Estación Central</span>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="text-school-gold flex-shrink-0" size={18} strokeWidth={1.5} />
                <span>+56 2 2517 6548</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="text-school-gold flex-shrink-0" size={18} strokeWidth={1.5} />
                <span>contacto@sanjoseschool.cl</span>
              </li>
            </ul>
          </div>
          {/* Recursos Educativos */}
          <div className="lg:col-span-3">
            <h4 className="font-bold text-lg mb-6 text-school-gold">Sitios y enlaces de interés</h4>
            <div className="grid grid-cols-2 gap-4 max-w-sm">
              <a href="https://curriculumnacional.mineduc.cl/estudiante/621/w3-channel.html" target="_blank" rel="noopener noreferrer" className="block relative rounded-lg overflow-hidden hover:opacity-80 hover:scale-105 transition-all duration-300 h-20 shadow-sm group">
                <img src={aprendoImg} alt="Aprendo en Línea" className="absolute inset-0 w-full h-full" />
              </a>
              <a href="https://bdescolar.mineduc.cl/" target="_blank" rel="noopener noreferrer" className="block relative rounded-lg overflow-hidden hover:opacity-80 hover:scale-105 transition-all duration-300 h-20 shadow-sm group">
                <img src={craImg} alt="Biblioteca Digital CRA" className="absolute inset-0 w-full h-full" />
              </a>
              <a href="https://www.simce.cl/10019/indicador" target="_blank" rel="noopener noreferrer" className="block relative rounded-lg overflow-hidden hover:opacity-80 hover:scale-105 transition-all duration-300 h-20 shadow-sm group">
                <img src={simceImg} alt="Resultados SIMCE - Agencia de Calidad" className="absolute inset-0 w-full h-full" />
              </a>
              <a href="https://plataforma.webescuela.cl/sistema/webclass" target="_blank" rel="noopener noreferrer" className="block relative bg-white rounded-lg overflow-hidden hover:opacity-80 hover:scale-105 transition-all duration-300 h-20 shadow-sm group flex items-center justify-center">
                <img src={webclassImg} alt="Plataforma Webclass" className="absolute inset-0 w-full h-full object-contain p-3" />
              </a>
            </div>
          </div>

        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-400">
          <p>&copy; 2026 Corporación Educacional San José School. Todos los derechos reservados.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">Privacidad</a>
            <a href="#" className="hover:text-white transition-colors">Términos</a>
            <a href="#" className="hover:text-white transition-colors">Mapa del sitio</a>
            <a href="/admin/noticias" className="hover:text-school-gold transition-colors font-bold text-gray-500">Admin</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
