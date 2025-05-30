// src/Pages/admin/UsuariosAdmin.tsx
import React, { useEffect, useState } from 'react';
import api from '../../api/axiosConfig';

interface User {
  id: number;
  username: string;
  email: string;
  roles: string[];
}

const UsuariosAdmin = () => {
  const [usuarios, setUsuarios] = useState<User[]>([]);

  useEffect(() => {
    api.get('/usuarios') // Usa tu endpoint del backend
      .then(res => setUsuarios(res.data))
      .catch(err => console.error("Error al cargar usuarios", err));
  }, []);

  return (
    <div className="w-full max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Gestión de Usuarios</h2>
      <table className="w-full table-auto border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-4 py-2">ID</th>
            <th className="border px-4 py-2">Username</th>
            <th className="border px-4 py-2">Email</th>
            <th className="border px-4 py-2">Roles</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map(user => (
            <tr key={user.id}>
              <td className="border px-4 py-2">{user.id}</td>
              <td className="border px-4 py-2">{user.username}</td>
              <td className="border px-4 py-2">{user.email}</td>
              <td className="border px-4 py-2">{user.roles.join(', ')}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsuariosAdmin;
