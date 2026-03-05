import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import AdminGate from './components/admin/AdminGate';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminNotices from './pages/admin/AdminNotices';
import AdminGallery from './pages/admin/AdminGallery';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import AboutIndex from './pages/AboutIndex';
import AboutGreeting from './pages/AboutGreeting';
import AboutLocation from './pages/AboutLocation';
import FacultyPage from './pages/FacultyPage';
import FacultyDetailPage from './pages/FacultyDetailPage';
import AcademicLayout from './pages/AcademicLayout';
import AcademicPage from './pages/AcademicPage';
import AcademicNotice from './pages/AcademicNotice';
import AcademicAdmission from './pages/AcademicAdmission';
import AcademicCurriculum from './pages/AcademicCurriculum';
import AcademicCareer from './pages/AcademicCareer';
import AcademicGraduation from './pages/AcademicGraduation';
import StudentsPage from './pages/StudentsPage';
import CommunityPage from './pages/CommunityPage';
import './App.css';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/admin" element={<AdminGate />}>
            <Route index element={<AdminDashboard />} />
            <Route path="notices" element={<AdminNotices />} />
            <Route path="gallery" element={<AdminGallery />} />
          </Route>
          <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="about" element={<AboutPage />}>
            <Route index element={<AboutIndex />} />
            <Route path="greeting" element={<AboutGreeting />} />
            <Route path="location" element={<AboutLocation />} />
          </Route>
          <Route path="faculty/:id" element={<FacultyDetailPage />} />
          <Route path="faculty" element={<FacultyPage />} />
          <Route path="academic" element={<AcademicLayout />}>
            <Route index element={<AcademicPage />} />
            <Route path="notice" element={<AcademicNotice />} />
            <Route path="admission" element={<AcademicAdmission />} />
            <Route path="curriculum" element={<AcademicCurriculum />} />
            <Route path="career" element={<AcademicCareer />} />
            <Route path="graduation" element={<AcademicGraduation />} />
          </Route>
          <Route path="students" element={<StudentsPage />} />
          <Route path="community" element={<CommunityPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
