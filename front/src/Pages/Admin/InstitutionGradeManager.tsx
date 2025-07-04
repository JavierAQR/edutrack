import axios from "axios";
import { useEffect, useState } from "react";

interface InstitutionGradeDTO {
  id?: number;
  academicLevelId: number;
  academicLevelName?: string;
  gradeId: number;
  gradeName?: string;
}

interface AcademicLevel {
  id: number;
  name: string;
}

interface Grade {
  id: number;
  name: string;
}

const initialForm: InstitutionGradeDTO = {
  academicLevelId: 0,
  gradeId: 0,
};

const InstitutionGradeManager = () => {
  const [institutionGrades, setInstitutionGrades] = useState<InstitutionGradeDTO[]>([]);
  const [formData, setFormData] = useState<InstitutionGradeDTO>(initialForm);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [availableLevels, setAvailableLevels] = useState<AcademicLevel[]>([]);
  const [availableGrades, setAvailableGrades] = useState<Grade[]>([]);

  useEffect(() => {
    fetchData();
    fetchLevels();
  }, []);

  const fetchData = async () => {
    try {
      const res = await axios.get("/institution-admin/institution-grades");
      setInstitutionGrades(res.data);
    } catch (err) {
      console.error("Error al cargar grados:", err);
    }
  };

  const fetchLevels = async () => {
    try {
      const res = await axios.get("/admin/academic-levels"); // reusar si no tienes endpoint propio
      setAvailableLevels(res.data);
    } catch (err) {
      console.error("Error cargando niveles:", err);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    const parsedValue = parseInt(value);

    setFormData((prev) => ({
      ...prev,
      [name]: parsedValue,
      ...(name === "academicLevelId" ? { gradeId: 0 } : {}),
    }));

    if (name === "academicLevelId" && !isNaN(parsedValue)) {
      axios
        .get(`/admin/grades/by-level/${parsedValue}`)
        .then((res) => setAvailableGrades(res.data))
        .catch(() => setAvailableGrades([]));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isEditing && editingId !== null) {
        await axios.put(`/institution-admin/institution-grades/${editingId}`, formData);
      } else {
        await axios.post("/institution-admin/institution-grades", formData);
      }
      setFormData(initialForm);
      setIsEditing(false);
      setEditingId(null);
      fetchData();
    } catch (err) {
      console.error("Error al guardar:", err);
    }
  };

  const handleEdit = (data: InstitutionGradeDTO) => {
    setFormData({
      academicLevelId: data.academicLevelId,
      gradeId: data.gradeId,
    });
    setEditingId(data.id!);
    setIsEditing(true);
    axios
      .get(`/admin/grades/by-level/${data.academicLevelId}`)
      .then((res) => setAvailableGrades(res.data));
  };

  const handleDelete = async (id: number) => {
    const confirm = window.confirm("¿Eliminar este registro?");
    if (!confirm) return;
    await axios.delete(`/institution-admin/institution-grades/${id}`);
    fetchData();
  };

  return (
    <div className="mt-10">
      <h1 className="text-2xl font-bold mb-4">Gestión de Grados de Institución</h1>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-white shadow p-4 rounded mb-8">
        <select name="academicLevelId" value={formData.academicLevelId} onChange={handleChange} required className="border p-2 rounded">
          <option value="">Seleccionar Nivel Académico</option>
          {availableLevels.map((a) => (
            <option key={a.id} value={a.id}>{a.name}</option>
          ))}
        </select>

        <select name="gradeId" value={formData.gradeId} onChange={handleChange} required className="border p-2 rounded">
          <option value="">Seleccionar Grado</option>
          {availableGrades.map((g) => (
            <option key={g.id} value={g.id}>{g.name}</option>
          ))}
        </select>

        <button type="submit" className="bg-blue-600 text-white rounded px-4 py-2 hover:bg-blue-700">
          {isEditing ? "Actualizar" : "Guardar"}
        </button>
      </form>

      <table className="min-w-full divide-y divide-gray-200 border rounded shadow">
        <thead className="bg-blue-600 text-white">
          <tr>
            <th className="px-4 py-3">Nivel</th>
            <th className="px-4 py-3">Grado</th>
            <th className="px-4 py-3">Acciones</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-100">
          {institutionGrades.map((ig) => (
            <tr key={ig.id}>
              <td className="px-4 py-2">{ig.academicLevelName}</td>
              <td className="px-4 py-2">{ig.gradeName}</td>
              <td className="px-4 py-2 space-x-2">
                <button onClick={() => handleEdit(ig)} className="bg-yellow-500 text-white px-3 py-1 rounded">Editar</button>
                <button onClick={() => handleDelete(ig.id!)} className="bg-red-500 text-white px-3 py-1 rounded">Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InstitutionGradeManager;
