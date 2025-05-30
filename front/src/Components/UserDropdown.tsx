import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { FaUser } from "react-icons/fa";

const UserDropdown = () => {
    const { user, logout } = useAuth();
    const [open, setOpen] = useState(false);

    return (
        <div className="relative">
            <button
                onClick={() => setOpen(!open)}
                className="flex items-center gap-2 focus:outline-none cursor-pointer"
            >
                <FaUser />
                <span>{user?.username}</span>
            </button>

            {open && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded shadow-md z-50">
                    <button
                        onClick={() => {
                            logout();
                            setOpen(false);
                        }}
                        className="block w-full text-left px-4 py-2 text-sm text-black hover:bg-gray-100 cursor-pointer"
                    >
                        Cerrar sesión
                    </button>
                </div>
            )}
        </div>
    );
};

export default UserDropdown;