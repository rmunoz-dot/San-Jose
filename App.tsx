import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Documents from './pages/Documents';
import PDFViewer from './pages/PDFViewer';
import Team from './pages/Team';
import NewsPost from './pages/NewsPost';
import NewsIndex from './pages/NewsIndex';
import AdminNews from './pages/AdminNews';
import AdminDocuments from './pages/AdminDocuments';
import AdminUtp from './pages/AdminUtp';
import AdminLogin from './pages/AdminLogin';
import EscuelaBasica from './pages/EscuelaBasica';
import EscuelaParvulos from './pages/EscuelaParvulos';
import ScrollToTop from './components/ScrollToTop';
import UTP from './pages/UTP';
import History from './pages/History';
import MisionVision from './pages/MisionVision';
import CommunityCenter from './pages/CommunityCenter';
import ProtectedRoute from './components/ProtectedRoute';
import ConvivenciaProtectedRoute from './components/ConvivenciaProtectedRoute';
import Convivencia from './pages/Convivencia';
import AdminConvivenciaLogin from './pages/AdminConvivenciaLogin';
import AdminConvivencia from './pages/AdminConvivencia';
import Contact from './pages/Contact';
import Inspectoria from './pages/Inspectoria';

const App: React.FC = () => {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="documentos" element={<Documents />} />
          <Route path="equipo" element={<Team />} />
          <Route path="noticias" element={<NewsIndex />} />
          <Route path="noticias/:id" element={<NewsPost />} />
          <Route path="admin/login" element={<AdminLogin />} />
          <Route element={<ProtectedRoute />}>
            <Route path="admin/noticias" element={<AdminNews />} />
            <Route path="admin/documentos" element={<AdminDocuments />} />
            <Route path="admin/utp" element={<AdminUtp />} />
          </Route>
          <Route path="escuela-basica" element={<EscuelaBasica />} />
          <Route path="escuela-parvulos" element={<EscuelaParvulos />} />
          <Route path="utp" element={<UTP />} />
          <Route path="convivencia-escolar" element={<Convivencia />} />
          <Route path="historia" element={<History />} />
          <Route path="mision-vision" element={<MisionVision />} />
          <Route path="comunidad" element={<CommunityCenter />} />
          <Route path="inspectoria" element={<Inspectoria />} />
          <Route path="contacto" element={<Contact />} />

          <Route path="admin/convivencia-login" element={<AdminConvivenciaLogin />} />
          <Route element={<ConvivenciaProtectedRoute />}>
            <Route path="admin/convivencia" element={<AdminConvivencia />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
};

export default App;