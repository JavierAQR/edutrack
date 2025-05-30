import Navbar from './Navbar'
import { Link, Outlet } from 'react-router-dom'
import Footer from './Footer'

const AdminLayout = () => {
  return (
    <>
    <Navbar>
      <Link to="/admin/usuarios" className="hover:text-gray-900 font-medium">Usuarios</Link>
      <Link to="/admin/cursos" className="hover:text-gray-900 font-medium">Cursos</Link>
      <Link to="/admin/pagos" className="hover:text-gray-900 font-medium">Pagos</Link>
      <Link to="/admin/configuracion" className="hover:text-gray-900 font-medium">Configuración</Link>
      <Link to="/admin/institutions" className="hover:text-gray-900 font-medium">Instituciones</Link>
    </Navbar>
    <main className="bg-white flex justify-center pt-20 pb-12 px-6 min-h-screen">
      <Outlet />
    </main>
    <Footer />
  </>
  )
}

export default AdminLayout