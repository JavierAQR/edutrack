import { FaEnvelope, FaFacebook, FaInstagram, FaPhone, FaTwitter } from "react-icons/fa"

const Navbar = () => {
  return (
    <>
     <div className="fixed w-full z-50 bg-transparent text-white">
      {/* Barra superior (contacto + redes) */}
      <div className="bg-opacity-80 py-5 px-6 border-b border-gray-500">
        <div className="max-w-7xl mx-auto flex justify-between items-center text-sm">
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
          <div className="flex space-x-4 text-lg">
            <a href="#" className="hover:text-blue-600"><FaFacebook /></a>
            <a href="#" className="hover:text-blue-400"><FaTwitter /></a>
            <a href="#" className="hover:text-pink-600"><FaInstagram /></a>
          </div>
        </div>
      </div>

      {/* Navbar principal */}
      <nav className="bg-opacity-70 py-10 px-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          {/* Logo */}
          <div className="text-2xl font-bold">edutrack</div>

          {/* Menú */}
          <div className="hidden md:flex space-x-8">
            <a href="#" className="hover:text-gray-900 font-medium">Production</a>
            <a href="#" className="hover:text-gray-900 font-medium">Measures</a>
            <a href="#" className="hover:text-gray-900 font-medium">Services</a>
            <a href="#" className="hover:text-gray-900 font-medium">Agencies</a>
            <a href="#" className="hover:text-gray-900 font-medium">Certifications</a>
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
    </>
  );
};

export default Navbar;
