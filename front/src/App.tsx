import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import VerificationPage from "./Pages/VerificationPage";
import Home from "./Pages/Home";
import MainLayout from "./Components/MainLayout";
import Tablero from "./Pages/Tablero";
import PaymentPage from "./Pages/Payment";

import SidebarAdmin from "./Components/SidebarAdmin";
import InstitutionManager from "./Pages/Admin/InstitutionManager";
import AcademicLevelManager from "./Pages/Admin/AcademicLevelManager";
import GradeManager from "./Pages/Admin/GradeManager";
import CourseAssignmentManager from "./Pages/Admin/CourseAssignmentManager";
import Dashboard from "./Pages/Admin/Dashboard";
import TeacherManager from "./Pages/Admin/TeacherManager";
import CompleteTeacherProfile from "./Pages/Teacher/CompleteTeacherProfile";
import TeacherProfile from "./Pages/Teacher/TeacherProfile";
import SidebarTeacher from "./Components/SidebarTeacher";
import CompleteStudentProfile from "./Pages/Student/CompleteStudentProfile";
import VerificationRole from "./Components/VerificationRole";
import SidebarStudent from "./Components/SidebarStudent";
import StudentProfile from "./Pages/Student/StudentProfile";

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
          <Route element={<VerificationRole allowedRoles={["STUDENT"]} />}>
            <Route path="/estudiante" element={<SidebarStudent />}>
              <Route index element={<Tablero />} />
              <Route path="perfil" element={<StudentProfile />} />
              <Route path="payments" element={<PaymentPage />} />
            </Route>
            <Route
              path="complete-student-profile"
              element={<CompleteStudentProfile />}
            />
          </Route>

          <Route element={<VerificationRole allowedRoles={["TEACHER"]} />}>
            <Route path="/profesor" element={<SidebarTeacher />}>
              <Route index element={<Navigate to="perfil" replace />} />
              <Route path="perfil" element={<TeacherProfile />} />
            </Route>
            <Route
              path="complete-teacher-profile"
              element={<CompleteTeacherProfile />}
            />
          </Route>

          <Route element={<VerificationRole allowedRoles={["ADMIN"]} />}>
            <Route path="/admin" element={<SidebarAdmin />}>
              <Route index element={<Navigate to="dashboard" replace />} />
              <Route path="teachers" element={<TeacherManager />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="institutions" element={<InstitutionManager />} />
              <Route
                path="academic-levels"
                element={<AcademicLevelManager />}
              />
              <Route path="academic-grades" element={<GradeManager />} />
              <Route path="courses" element={<CourseAssignmentManager />} />
            </Route>
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
