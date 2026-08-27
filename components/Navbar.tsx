
import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import logo from '../assets/logo.png';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';
  const hasHero = isHome || location.pathname === '/escuela-basica' || location.pathname === '/escuela-parvulos';

  useEffect(() => {
    const handleScroll = () => {
      if (hasHero) {
        setIsScrolled(window.scrollY > 50);
      } else {
        setIsScrolled(true);
      }
    };

    // Initial check
    if (!hasHero) {
      setIsScrolled(true);
    } else {
      setIsScrolled(window.scrollY > 50);
    }

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasHero]);

  interface NavLink {
    name: string;
    href: string;
    submenu?: { name: string; href: string }[];
  }

  const navLinks: NavLink[] = [
    { name: 'Inicio', href: '/#' },
    {
      name: 'Nuestro Colegio',
      href: '#',
      submenu: [
        { name: 'Nuestra Institución', href: '/#about' },
        { name: 'Historia y Entorno', href: '/historia' },
        { name: 'Misión y Visión', href: '/mision-vision' }
      ]
    },
    {
      name: 'Departamentos',
      href: '#',
      submenu: [
        { name: 'UTP', href: '/utp' },
        { name: 'Inspectoría', href: '/inspectoria' },
        { name: 'Convivencia Escolar', href: '/convivencia-escolar' },
        { name: 'Centro de Alumnos', href: '/comunidad#alumnos' },
        { name: 'Centro de Padres y Apoderados', href: '/comunidad#padres' }
      ]
    },
    { name: 'Equipo', href: '/equipo' },
    { name: 'Noticias', href: '/noticias' },
    { name: 'Documentos', href: '/documentos' },
    { name: 'Contacto', href: '/contacto' },
  ];

  return (

    <header
      className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-school-navy/80 backdrop-blur-md shadow-md py-2' : 'bg-transparent py-4'
        }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        {/* Logo Area */}
        <HashLink smooth to="/#" className="flex items-center gap-3 group">
          <div className="flex-shrink-0">
            <img
              src={logo}
              alt="San José School Logo"
              className="h-12 w-auto transition-transform duration-300 group-hover:scale-110"
            />
          </div>
          <div className="flex flex-col justify-center text-white">
            <h1 className="font-nunito font-medium text-xl tracking-[0.2em] uppercase group-hover:text-school-gold transition-colors leading-none">San José</h1>
            <p className="font-nunito text-xl tracking-[0.25em] uppercase font-extrabold mt-0 leading-none">School</p>
          </div>
        </HashLink>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-6">
          {navLinks.map((link) => (
            link.submenu ? (
              <div key={link.name} className="relative group">
                <button
                  className="flex items-center gap-1 text-sm font-medium tracking-wide hover:text-school-gold transition-colors py-2 text-white/90"
                >
                  {link.name}
                  <ChevronDown size={14} className="group-hover:rotate-180 transition-transform duration-300" />
                </button>
                <div className="absolute top-full left-0 w-64 bg-white shadow-2xl rounded-2xl border border-gray-100 py-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top translate-y-3 group-hover:translate-y-1">
                  {link.submenu.map((sublink) => (
                    <HashLink
                      key={sublink.name}
                      to={sublink.href}
                      className="block px-6 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-school-navy transition-colors"
                    >
                      {sublink.name}
                    </HashLink>
                  ))}
                </div>
              </div>
            ) : (
              <HashLink
                key={link.name}
                smooth
                to={link.href}
                className="text-sm font-medium tracking-wide hover:text-school-gold transition-colors relative group py-2 text-white/90"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-school-gold transition-all duration-300 group-hover:w-full"></span>
              </HashLink>
            )
          ))}
          <a href="https://www.sistemadeadmisionescolar.cl/" target="_blank" rel="noopener noreferrer" className="bg-gray-900 hover:bg-gray-800 text-white px-6 py-2.5 text-sm font-bold uppercase tracking-wider rounded transition-colors shadow-lg hover:shadow-gray-900/30 transform hover:-translate-y-0.5 active:translate-y-0">
            Admisión 2027
          </a>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden text-gray-800 focus:outline-none"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? (
            <X className="text-white" size={28} strokeWidth={1.5} />
          ) : (
            <Menu className="text-white" size={28} strokeWidth={1.5} />
          )}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`lg:hidden absolute top-full left-0 w-full bg-school-navy/85 backdrop-blur-md shadow-xl border-t border-white/10 flex flex-col items-center gap-4 overflow-hidden transition-all duration-300 ${isMobileMenuOpen ? 'max-h-screen py-8 opacity-100' : 'max-h-0 opacity-0'}`}>
        {navLinks.map((link) => (
          link.submenu ? (
            <div key={link.name} className="flex flex-col items-center gap-2">
              <span className="text-white font-medium text-lg">{link.name}</span>
              {link.submenu.map((sublink) => (
                <HashLink
                  key={sublink.name}
                  smooth
                  to={sublink.href}
                  className="text-white/80 font-medium hover:text-school-gold py-1 text-base"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {sublink.name}
                </HashLink>
              ))}
            </div>
          ) : (
            <HashLink
              key={link.name}
              smooth
              to={link.href}
              className="text-white font-medium hover:text-school-gold py-2 text-lg"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.name}
            </HashLink>
          )
        ))}
        <a href="https://www.sistemadeadmisionescolar.cl/" target="_blank" rel="noopener noreferrer" className="bg-school-navy text-white px-8 py-3 text-sm font-bold uppercase rounded w-3/4 mx-auto mt-4 shadow-lg text-center">
          Admisión 2027
        </a>
      </div>
    </header>
  );
};

export default Navbar;
