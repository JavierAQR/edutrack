import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Login from './Pages/Login';
import Register from './Pages/Register';
import HomeAdmin from './Pages/HomeAdmin';
import VerificationPage from './Pages/VerificationPage';
import Home from './Pages/Home';
import MainLayout from './Components/MainLayout';
import StudentLayout from './Components/StudentLayout';
import HomeStudent from './Pages/HomeStudent';
import Tablero from './Pages/Tablero';
import AdminLayout from './Components/AdminLayout';
import UsuariosAdmin from './Pages/admin/UsuariosAdmin';

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
            <Route index element={<HomeStudent />} />
            <Route path="tablero" element={<Tablero />} />
          </Route>

          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<HomeAdmin />} />
            <Route path="usuarios" element={<UsuariosAdmin />} />
            {/* xd */}
          </Route>

          {/* Rutas de administrador */}
          <Route path="/admin" element={<HomeAdmin />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
