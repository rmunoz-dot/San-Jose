import React, { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase';
import { Loader } from 'lucide-react';

// Emails del admin general que tienen acceso a todo
const ADMIN_EMAIL = 'admin@sanjoseschool.cl';

const ConvivenciaProtectedRoute: React.FC = () => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user && user.email) {
                const email = user.email.toLowerCase();
                // Permitir acceso si es el usuario de convivencia O el admin general
                if (email.includes('convivencia') || email === ADMIN_EMAIL) {
                    setIsAuthenticated(true);
                } else {
                    setIsAuthenticated(false);
                }
            } else {
                setIsAuthenticated(false);
            }
        });

        return () => unsubscribe();
    }, []);

    if (isAuthenticated === null) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="flex flex-col items-center gap-4">
                    <Loader className="w-10 h-10 text-school-navy animate-spin" />
                    <p className="text-gray-500 font-medium">Verificando acceso de convivencia...</p>
                </div>
            </div>
        );
    }

    if (!isAuthenticated) {
        return <Navigate to="/admin/convivencia-login" replace />;
    }

    return <Outlet />;
};

export default ConvivenciaProtectedRoute;
