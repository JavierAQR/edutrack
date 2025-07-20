import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import Modal from "../../Components/ui/Modal";
import CourseForm from "./CourseForm";
import { toast } from "react-toastify";

interface Course {
    id: number;
    name: string;
    gradeId: number;
    gradeName: string;
    academicLevelId: number;
    academicLevelName: string;
}

interface Grade {
    id: number;
    name: string;
    academicLevelId: number;
    academicLevelName: string;
}

const CourseManager = () => {
    const [courses, setCourses] = useState<Course[]>([]);
    const [showForm, setShowForm] = useState(false);
    const [editingCourse, setEditingCourse] = useState<Course | null>(null);
    const [grades, setGrades] = useState<Grade[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const fetchCourses = useCallback(async () => {
        try {
            setLoading(true);
            setError("");
            const token = localStorage.getItem("token");
            if (!token) {
                throw new Error("No authentication token found");
            }
            
            const response = await axios.get<Course[]>(
                `http://localhost:8080/api/institution-admin/courses`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setCourses(response.data);
        } catch (err) {
            const errorMessage = axios.isAxiosError(err) 
                ? err.response?.data?.message || "Error al cargar los cursos"
                : "Error al cargar los cursos";
            setError(errorMessage);
            console.error("Error fetching courses:", err);
        } finally {
            setLoading(false);
        }
    }, []);

    const fetchGrades = useCallback(async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) return;
            
            const response = await axios.get<Grade[]>(
                `http://localhost:8080/api/institution-admin/courses/grades`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setGrades(response.data);
        } catch (err) {
            console.error("Error al cargar los grados:", err);
            toast.error("Error al cargar los grados disponibles");
        }
    }, []);

    const handleCreate = () => {
        setShowForm(true);
        setEditingCourse(null);
    };

    const handleEdit = (course: Course) => {
        setEditingCourse(course);
        setShowForm(true);
    };

    const handleDelete = async (id: number) => {
        if (window.confirm("¿Estás seguro de que deseas eliminar este curso?")) {
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    toast.error("No se encontró el token de autenticación");
                    return;
                }
                
                await axios.delete(
                    `http://localhost:8080/api/institution-admin/courses/${id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                toast.success("Curso eliminado correctamente");
                fetchCourses();
            } catch (err) {
                const errorMessage = axios.isAxiosError(err) 
                    ? err.response?.data?.message || "Error al eliminar el curso"
                    : "Error al eliminar el curso";
                toast.error(errorMessage);
                console.error(err);
            }
        }
    };

    const handleSubmit = async (formData: { name: string; gradeId: string }) => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                toast.error("No se encontró el token de autenticación");
                return;
            }
            
            if (editingCourse) {
                await axios.put(
                    `http://localhost:8080/api/institution-admin/courses/${editingCourse.id}`,
                    formData,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                toast.success("Curso actualizado correctamente");
            } else {
                await axios.post(
                    "http://localhost:8080/api/institution-admin/courses",
                    formData,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                toast.success("Curso creado correctamente");
            }
            setShowForm(false);
            fetchCourses();
        } catch (err) {
            const errorMessage = axios.isAxiosError(err) 
                ? err.response?.data?.message || "Error al guardar el curso"
                : "Error al guardar el curso";
            toast.error(errorMessage);
            console.error(err);
        }
    };

    useEffect(() => {
        fetchCourses();
        fetchGrades();
    }, [fetchCourses, fetchGrades]);

    if (loading) return <div className="p-6">Cargando cursos...</div>;
    if (error) return <div className="p-6 text-red-500">{error}</div>;

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Gestión de Cursos</h1>
            <div className="flex justify-between items-center mb-4">
                <p className="text-gray-600">
                    Administra los cursos de tu institución
                </p>
                <button
                    onClick={handleCreate}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    Agregar Curso
                </button>
            </div>

            <div className="overflow-x-auto bg-white rounded-lg shadow">
                <table className="min-w-full">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Nombre
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Nivel Académico
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Grado
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Acciones
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {courses.length === 0 ? (
                            <tr>
                                <td colSpan={4} className="px-6 py-4 text-center text-gray-500">
                                    No hay cursos registrados
                                </td>
                            </tr>
                        ) : (
                            courses.map((course) => (
                                <tr key={course.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        {course.name}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {course.academicLevelName}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {course.gradeName}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <div className="flex space-x-2">
                                            <button
                                                onClick={() => handleEdit(course)}
                                                className="text-indigo-600 hover:text-indigo-900"
                                            >
                                                Editar
                                            </button>
                                            <button
                                                onClick={() => handleDelete(course.id)}
                                                className="text-red-600 hover:text-red-900"
                                            >
                                                Eliminar
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            <Modal isOpen={showForm} onClose={() => setShowForm(false)}>
                <CourseForm
                    course={editingCourse ?? undefined}
                    grades={grades}
                    onSubmit={handleSubmit}
                    onCancel={() => setShowForm(false)}
                />
            </Modal>
        </div>
    );
};

export default CourseManager;
