import { Outlet } from 'react-router-dom';
import AcademicNav from '../components/layout/AcademicNav';

export default function AcademicLayout() {
  return (
    <div className="section">
      <div className="container">
        <AcademicNav />
        <Outlet />
      </div>
    </div>
  );
}
