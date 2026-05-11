import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { HelpCircle, LogOut } from 'lucide-react';
import { motion } from 'framer-motion';

interface AdminTabBarProps {
    setRunTour: (run: boolean) => void;
    handleLogout: () => void;
}

const TABS = [
    { id: '/admin/noticias', label: 'Noticias', activeBg: 'bg-school-blue', activeText: 'text-white', hoverColor: 'hover:text-school-blue' },
    { id: '/admin/documentos', label: 'Documentos', activeBg: 'bg-school-blue', activeText: 'text-white', hoverColor: 'hover:text-school-blue' },
    { id: '/admin/utp', label: 'UTP', activeBg: 'bg-school-gold', activeText: 'text-school-navy', hoverColor: 'hover:text-school-gold' },
    { id: '/admin/convivencia', label: 'Convivencia', activeBg: 'bg-green-600', activeText: 'text-white', hoverColor: 'hover:text-green-600' },
];

const AdminTabBar: React.FC<AdminTabBarProps> = ({ setRunTour, handleLogout }) => {
    const location = useLocation();

    return (
        <div className="mb-10 flex flex-wrap justify-center items-center gap-2 bg-white p-2 rounded-2xl shadow-sm border border-gray-100 max-w-fit mx-auto overflow-hidden">
            {TABS.map((tab) => {
                const isActive = location.pathname.startsWith(tab.id);
                return (
                    <Link
                        key={tab.id}
                        to={tab.id}
                        className={`relative px-6 py-2 rounded-xl font-bold transition-colors z-10 ${isActive ? tab.activeText : `text-gray-500 hover:bg-gray-50 ${tab.hoverColor}`}`}
                    >
                        {isActive && (
                            <motion.div
                                layoutId="admin-tab-highlight"
                                className={`absolute inset-0 rounded-xl shadow-sm -z-10 ${tab.activeBg}`}
                                initial={false}
                                transition={{ type: "spring", bounce: 0.2, duration: 0.35 }}
                            />
                        )}
                        <span className="relative z-20">{tab.label}</span>
                    </Link>
                );
            })}

            <div className="w-px h-8 bg-gray-200 mx-2 hidden md:block z-20"></div>

            <button
                onClick={() => setRunTour(true)}
                className="relative z-20 flex items-center gap-2 px-4 py-2 text-school-gold hover:bg-yellow-50 rounded-xl font-bold transition-all text-sm"
            >
                <HelpCircle size={18} />
                Tutorial
            </button>
            <button
                onClick={handleLogout}
                className="relative z-20 flex items-center gap-2 px-4 py-2 text-red-500 hover:bg-red-50 rounded-xl transition-colors font-bold text-sm"
            >
                <LogOut size={16} />
                Salir
            </button>
        </div>
    );
};

export default AdminTabBar;
