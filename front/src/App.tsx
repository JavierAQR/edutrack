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
import AdminLayout from './Components/AdminLayout';
import UsuariosAdmin from './Pages/UsuariosAdmin';
import Profile from './Pages/Profile';

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
            <Route path="perfil" element={<Profile />} />
          </Route>



          {/* Rutas de estudiante */}
          <Route path="/estudiante" element={<StudentLayout />}>
            <Route index element={<Tablero />} />
            <Route path="perfil" element={<Profile />} />
          </Route>

          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<UsuariosAdmin />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
