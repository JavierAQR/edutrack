import Navbar from './Navbar'
import { Link, Outlet } from 'react-router'
import Footer from './Footer'

const StudentLayout = () => {
  
  return (
    <>
      <Navbar>
        <Link to="/">Mi Tablero</Link>
        <Link to="/">Instituciones</Link>
        <Link to="/">Cursos</Link>
        <Link to="/">Evaluaciones</Link>
        <Link to="/">Pagos</Link>
      </Navbar>
      <main className="bg-white flex justify center pt-20 pb-50 px-6 min-h-screen">
        <Outlet />
      </main>
      <Footer/>
    </>
  )
}

export default StudentLayout