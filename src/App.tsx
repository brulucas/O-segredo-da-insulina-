/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './store/useAuthStore';
import { HomePage } from './pages/HomePage';
import { JornadaPage } from './pages/JornadaPage';
import { PresentesPage } from './pages/PresentesPage';
import { PerfilPage } from './pages/PerfilPage';
import { LoginPage } from './pages/LoginPage';
import { AdminPage } from './pages/AdminPage';
import { HtmlModalViewer } from './components/HtmlModalViewer';
import { ToastContainer } from './components/ToastContainer';
import { CsBadge } from './components/CsBadge';

export default function App() {
  const { user, ready, init } = useAuthStore();

  useEffect(() => {
    init();
  }, [init]);

  if (!ready) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-verde-700">
        <CsBadge size={96} />
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        {/* Admin panel */}
        <Route path="/admin" element={<AdminPage />} />

        {/* Protected App Routes */}
        {user ? (
          <>
            <Route path="/" element={<HomePage />} />
            <Route path="/jornada" element={<JornadaPage />} />
            <Route path="/presentes" element={<PresentesPage />} />
            <Route path="/clube" element={<Navigate to="/jornada" replace />} />
            <Route path="/perfil" element={<PerfilPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </>
        ) : (
          <>
            <Route path="*" element={<LoginPage />} />
          </>
        )}
      </Routes>

      <HtmlModalViewer />
      <ToastContainer />
    </BrowserRouter>
  );
}
