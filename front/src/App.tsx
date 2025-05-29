import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import HomeAdmin from "./Pages/HomeAdmin";
import VerificationPage from "./Pages/VerificationPage";
import Home from "./Pages/Home";
import MainLayout from "./Components/MainLayout";
import StudentLayout from "./Components/StudentLayout";
import HomeStudent from "./Pages/HomeStudent";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Rutas sin autenticación */}
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="verification" element={<VerificationPage />} />
          </Route>

          {/* Ruta para etudiantes */}
          <Route path="/estudiante" element={<StudentLayout />}>
            <Route index element={<HomeStudent />} />
          </Route>

          {/* Ruta para administradores */}
          <Route path="/homeAdmin" element={<HomeAdmin />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
