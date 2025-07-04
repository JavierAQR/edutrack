import { Outlet, NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const SidebarInstitutionAdmin = () => {
  const { user } = useAuth();

  if (!user || user.userType !== "INSTITUTION_ADMIN") {
    return <p>Acceso no autorizado</p>;
  }

  return (
    <div className="flex">
      <aside className="w-64 bg-gray-800 min-h-screen text-white p-4">
        <h2 className="text-lg font-bold mb-4">Institución</h2>
        <nav className="flex flex-col space-y-2">
          <NavLink to="/institution-admin/grades" className="hover:text-blue-400">Grados</NavLink>
          {/* Aquí puedes agregar más opciones */}
        </nav>
      </aside>
      <main className="flex-1 p-6 bg-gray-100">
        <Outlet />
      </main>
    </div>
  );
};

export default SidebarInstitutionAdmin;
