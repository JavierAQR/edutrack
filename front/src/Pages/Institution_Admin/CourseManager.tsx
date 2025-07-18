import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import Modal from "../../Components/ui/Modal";
import CourseForm from "./CourseForm";

interface Course {
    id: number;
    name: string;
    gradeName: string;
    academicLevelName: string;
}

const CourseManager = () => {
    const [courses, setCourses] = useState<Course[]>([]);
    const [showForm, setShowForm] = useState(false);
    const [editingCourse, setEditingCourse] = useState<Course | null>(null);
    const [grades, setGrades] = useState<any[]>([]);

    const institutionId = (() => {
        try {
            const storedUser = localStorage.getItem("user");
            if (storedUser) {
                const user = JSON.parse(storedUser);
                return user.institutionId || 0;
            }
            return 0;
        } catch (error) {
            console.error("Error parsing user data from localStorage:", error);
            return 0;
        }
    })();

    const fetchCourses = useCallback(async () => {
        const res = await axios.get(
            `http://localhost:8080/api/courses/institution/${institutionId}`
        );
        setCourses(res.data);
    }, [institutionId]);

    const fetchGrades = useCallback(async () => {
        const res = await axios.get(
            `http://localhost:8080/api/institution-grades/by-institution/${institutionId}`
        );
        setGrades(res.data);
    }, [institutionId]);

    const handleCreate = () => {
        setShowForm(true);
        setEditingCourse(null);
    };

    const handleEdit = (course: Course) => {
        setEditingCourse(course);
        setShowForm(true);
    };

    const handleDelete = async (id: number) => {
        await axios.delete(`http://localhost:8080/api/courses/${id}`);
        fetchCourses();
    };

    const handleSubmit = async (e: React.FormEvent, formData: any) => {
        e.preventDefault();

        if (editingCourse) {
            await axios.put(
                `http://localhost:8080/api/courses/${editingCourse.id}`,
                formData
            );
        } else {
            await axios.post(
                "http://localhost:8080/api/courses",
                formData
            );
        }

        setShowForm(false);
        fetchCourses();
    };

    useEffect(() => {
        fetchCourses();
        fetchGrades();
    }, [fetchCourses, fetchGrades]);

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Gestión de Cursos</h1>
            <button
                onClick={handleCreate}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 mb-4"
            >
                Agregar Curso
            </button>

            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border rounded">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="py-2 px-4 border">Nombre</th>
                            <th className="py-2 px-4 border">Nivel Académico</th>
                            <th className="py-2 px-4 border">Grado</th>
                            <th className="py-2 px-4 border">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {courses.map((course) => (
                            <tr key={course.id} className="hover:bg-gray-50">
                                <td className="py-2 px-4 border">{course.name}</td>
                                <td className="py-2 px-4 border">{course.academicLevelName}</td>
                                <td className="py-2 px-4 border">{course.gradeName}</td>
                                <td className="py-2 px-4 border flex gap-2">
                                    <button
                                        onClick={() => handleEdit(course)}
                                        className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
                                    >
                                        Editar
                                    </button>
                                    <button
                                        onClick={() => handleDelete(course.id)}
                                        className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                                    >
                                        Eliminar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <Modal isOpen={showForm} onClose={() => setShowForm(false)}>
                <CourseForm
                    course={editingCourse}
                    grades={grades}
                    onSubmit={handleSubmit}
                    onCancel={() => setShowForm(false)}
                />
            </Modal>
        </div>
    );
};

export default CourseManager;