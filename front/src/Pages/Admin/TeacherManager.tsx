import axios from "axios";
import { useEffect, useState } from "react";

interface TeacherDTO {
  id: number;
  username: string;
  name: string;
  lastname: string;
  email: string;
  birthdate: string;
  enabled: boolean;
  userType: string;
  degree: string;
  specialization: string;
  teachingExperience: number;
  cvUrl?: string;
}
const TeacherManager = () => {
  const [teachers, setTeachers] = useState<TeacherDTO[]>([]);
  const [selectedTeacher, setSelectedTeacher] = useState<TeacherDTO | null>(
    null
  );

  useEffect(() => {
    fetchTeachers();
  }, []);

  const fetchTeachers = async () => {
    try {
      const res = await axios.get("http://localhost:8080/admin/teachers");
      setTeachers(res.data);
      console.log(res.data);
      
    } catch (err) {
      console.error("Error al cargar profesores", err);
    }
  };

  const handleEdit = (teacher: TeacherDTO) => {
    alert("Funcionalidad de edición aún no implementada");
    // Aquí puedes abrir un modal o redirigir a un formulario de edición
  };

  const handleViewProfile = (teacher: TeacherDTO) => {
    setSelectedTeacher(teacher);
  };
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Gestión de Profesores</h2>

      <table className="min-w-full divide-y divide-gray-200 shadow-sm border border-gray-200 rounded-lg overflow-hidden">
        <thead className="bg-blue-600 text-white">
          <tr>
            <th className="px-4 py-2 text-left">Nombre</th>
            <th className="px-4 py-2 text-left">Correo</th>
            <th className="px-4 py-2 text-left">Especialización</th>
            <th className="px-4 py-2 text-center">Acciones</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-100">
          {teachers.map((teacher) => (
            <tr key={teacher.id} className="hover:bg-gray-50">
              <td className="px-4 py-2">
                {teacher.name} {teacher.lastname}
              </td>
              <td className="px-4 py-2">{teacher.email}</td>
              <td className="px-4 py-2">{teacher.specialization}</td>
              <td className="px-4 py-2 flex gap-2 justify-center">
                <button
                  onClick={() => handleEdit(teacher)}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleViewProfile(teacher)}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
                >
                  Ver Perfil
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedTeacher && (
        <div className="mt-6 p-4 bg-white shadow rounded">
          <h3 className="text-xl font-bold mb-2">
            Perfil de {selectedTeacher.name}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <p>
              <strong>Nombre:</strong> {selectedTeacher.name}{" "}
              {selectedTeacher.lastname}
            </p>
            <p>
              <strong>Usuario:</strong> {selectedTeacher.username}
            </p>
            <p>
              <strong>Email:</strong> {selectedTeacher.email}
            </p>
            <p>
              <strong>Fecha de nacimiento:</strong> {selectedTeacher.birthdate}
            </p>
            <p>
              <strong>Especialización:</strong> {selectedTeacher.specialization}
            </p>
            <p>
              <strong>Grado:</strong> {selectedTeacher.degree}
            </p>
            <p>
              <strong>Experiencia:</strong> {selectedTeacher.teachingExperience}{" "}
              años
            </p>
            <p>
              <strong>Estado:</strong>{" "}
              {selectedTeacher.enabled ? "Activo" : "Inactivo"}
            </p>
            {selectedTeacher.cvUrl && (
              <p>
                <strong>CV:</strong>{" "}
                <a
                  href={selectedTeacher.cvUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline"
                >
                  Ver documento
                </a>
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default TeacherManager;
