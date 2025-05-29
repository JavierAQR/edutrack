import Navbar from "./Navbar";
import { Link, Outlet } from "react-router";
import Footer from "./Footer";

const MainLayout = () => {

  return (
    <>
      <Navbar>
        <Link to="/">Instituciones</Link>
        <Link to="/">Certificaciones</Link>
        <Link to="/">Servicios</Link>
        <Link to="/">Contáctanos</Link>
        <Link to="/">Sobre Nosotros</Link>
      </Navbar>
        <Outlet />
      <Footer />
    </>
  );
};

export default MainLayout;
