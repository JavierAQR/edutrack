import { useEffect, useState } from "react";
import { FaEnvelope, FaPhone, FaUser } from "react-icons/fa"
import { Link } from "react-router";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
     <div className="fixed w-full z-50 bg-transparent text-white">
      {/* Barra superior (contacto + redes) */}
      <div className={`bg-opacity-80 py-4 px-6 border-b border-gray-500 ${scrolled && 'hidden'}`}>

        <div className="max-w-5xl mx-auto flex justify-between flex-wrap items-center text-sm">
          {/* Contacto */}
          <div className="flex space-x-4">
            <a href="mailto:contacto@edutrack.com" className="flex items-center">
              <FaEnvelope className="mr-1" /> contacto@edutrack.com
            </a>
            <a href="tel:+123456789" className="flex items-center">
              <FaPhone className="mr-1" />+1 234 567 89
            </a>
          </div>

          {/* Redes sociales */}
          <div className="flex items-center gap-2 text-lg">
            <FaUser />
            <Link
              to="/login"
              className="text-sm"
            >
              Iniciar Sesión
            </Link>
          </div>
        </div>
      </div>
      {/* Navbar principal */}
      <nav className={`px-6 ${scrolled ? 'bg-white text-black py-3 shadow-md' : 'bg-opacity-70 py-5'}`}>
        <div className="max-w-5xl mx-auto flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center gap-2 text-4xl font-semibold"><img src="https://cdn-icons-png.flaticon.com/512/6671/6671494.png" alt="" className="object-cover w-15 h-15"/>Edutrack</div>

          {/* Menú */}
          <div className="hidden md:flex space-x-8">
            <a href="#" className="hover:text-gray-900 font-medium">Instituciones</a>
            <a href="#" className="hover:text-gray-900 font-medium">Certificaciones</a>
            <a href="#" className="hover:text-gray-900 font-medium">Servicios</a>
            <a href="#" className="hover:text-gray-900 font-medium">Contáctanos</a>
            <a href="#" className="hover:text-gray-900 font-medium">Sobre Nosotros</a>
          </div>

          {/* Botón móvil */}
          <button className="md:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </nav>
    </div>
  
  );
};

export default Navbar;
