// Icons
import { MdMenuOpen } from "react-icons/md";
import { IoHomeOutline } from "react-icons/io5";
import { FaProductHunt } from "react-icons/fa";
import { TbReportSearch } from "react-icons/tb";
import { IoLogoBuffer } from "react-icons/io";
import { CiSettings } from "react-icons/ci";
import { MdOutlineDashboard } from "react-icons/md";
import { useState, type JSX } from "react";
import { Outlet } from "react-router";
import UserDropdown from "./UserDropdown";
import { Link } from "react-router-dom";

// Tipado para los ítems del menú
type MenuItem = {
  icons: JSX.Element;
  label: string;
  href: string;
};

const menuItems: MenuItem[] = [
  {
    icons: <IoHomeOutline size={30} />,
    label: "Dashboard",
    href: "/admin/dashboard",
  },
  {
    icons: <FaProductHunt size={30} />,
    label: "Administradores",
    href: "/admin/dashboard",
  },
  {
    icons: <MdOutlineDashboard size={30} />,
    label: "Directores",
    href: "/admin/dashboard",
  },
  {
    icons: <CiSettings size={30} />,
    label: "Profesores",
    href: "/admin/dashboard",
  },
  {
    icons: <IoLogoBuffer size={30} />,
    label: "Alumnos",
    href: "/admin/dashboard",
  },
  {
    icons: <TbReportSearch size={30} />,
    label: "Instituciones",
    href: "/admin/institutions",
  },
  {
    icons: <TbReportSearch size={30} />,
    label: "Niveles Académicos",
    href: "/admin/academic-levels",
  },
  {
    icons: <TbReportSearch size={30} />,
    label: "Grados Académicos",
    href: "/admin/academic-grades",
  },
  {
    icons: <TbReportSearch size={30} />,
    label: "Cursos",
    href: "/admin/courses",
  },
];

const SidebarAdmin: React.FC = () => {
  const [open, setOpen] = useState<boolean>(true);

  return (
    <div className="flex">
      <nav
        className={`fixed shadow-md h-screen p-2 flex flex-col duration-500 bg-blue-600 text-white ${
          open ? "w-60" : "w-16"
        }`}
      >
        {/* Header */}
        <div className="px-3 py-2 h-20 flex justify-between items-center">
          <div className={`flex items-center gap-3 ${open ? "w-10" : "hidden"} rounded-md`}>
            <img
              src={"https://cdn-icons-png.flaticon.com/512/6671/6671494.png"}
              alt="Logo"

            />
            <span className="font-bold text-xl">ADMIN</span>
          </div>

          <MdMenuOpen
            size={34}
            className={`duration-500 cursor-pointer ${!open && "rotate-180"}`}
            onClick={() => setOpen(!open)}
          />
        </div>

        {/* Body */}
        <div className="flex-1">
          {menuItems.map((item, index) => (
            <Link
              to={item.href}
              key={index}
              className="px-3 py-2 my-2 hover:bg-blue-800 rounded-md duration-300 cursor-pointer flex gap-2 items-center relative group"
            >
              <div>{item.icons}</div>
              <p
                className={`${
                  !open && "w-0 translate-x-24"
                } duration-500 overflow-hidden`}
              >
                {item.label}
              </p>
              <p
                className={`${
                  open && "hidden"
                } absolute left-32 shadow-md rounded-md w-0 p-0 text-black bg-white duration-100 overflow-hidden group-hover:w-fit group-hover:p-2 group-hover:left-16`}
              >
                {item.label}
              </p>
            </Link>
          ))}
        </div>

        {/* Footer */}
        <div className="flex items-center gap-2 px-3 py-2">
          <UserDropdown />
        </div>
      </nav>
      <main className={`w-full ${open ? 'ml-60' : 'ml-16'}`}>
        <div className="mt-10 max-w-6xl mx-auto p-6">
        <Outlet />
        </div>
      </main>
    </div>
  );
};

export default SidebarAdmin;
