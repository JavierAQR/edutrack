import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Login from './Pages/Login';
import Register from './Pages/Register';
import VerificationPage from './Pages/VerificationPage';
import Home from './Pages/Home';
import MainLayout from './Components/MainLayout';
import StudentLayout from './Components/StudentLayout';
import Tablero from './Pages/Tablero';
import PaymentPage from './Pages/Payment';
import HomeAdmin from './Pages/Admin/Dashboard';
import SidebarAdmin from './Components/SidebarAdmin';
import InstitutionManager from './Pages/Admin/InstitutionManager';
import AcademicLevelManager from './Pages/Admin/AcademicLevelManager';
import GradeManager from './Pages/Admin/GradeManager';
import CourseAssignmentManager from './Pages/Admin/CourseAssignmentManager';


function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Rutas públicas */}
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="verification" element={<VerificationPage />} />
            
          </Route>



          {/* Rutas de estudiante */}
          <Route path="/estudiante" element={<StudentLayout />}>
            <Route index element={<Tablero />} />
            <Route path='payments' element={<PaymentPage />} />
          </Route>

          <Route path="/admin" element={<SidebarAdmin />}>
            <Route index element={<HomeAdmin/>}/>
            <Route path='institutions' element={<InstitutionManager/>}/>
            <Route path='academic-levels' element={<AcademicLevelManager/>}/>
            <Route path='academic-grades' element={<GradeManager/>}/>
            <Route path='courses' element={<CourseAssignmentManager/>}/>

          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
