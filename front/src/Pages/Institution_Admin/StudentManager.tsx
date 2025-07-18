import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import Modal from "../../Components/ui/Modal";
import StudentForm from "./StudentForm";

interface Student {
    id: number;
    fullName: string;
    email: string;
    grade: string;
    status: string;
}

const StudentManager = () => {
    const [students, setStudents] = useState<Student[]>([]);
    const [showForm, setShowForm] = useState(false);
    const [editingStudent, setEditingStudent] = useState<Student | null>(null);
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

    const fetchStudents = useCallback(async () => {
        const res = await axios.get(
            `http://localhost:8080/api/student-profile/institution/${institutionId}`
        );
        setStudents(res.data);
    }, [institutionId]);

    const fetchGrades = useCallback(async () => {
        const res = await axios.get(
            `http://localhost:8080/api/institution-grades/by-institution/${institutionId}`
        );
        setGrades(res.data);
    }, [institutionId]);

    const handleCreate = () => {
        setShowForm(true);
        setEditingStudent(null);
    };

    const handleEdit = (student: Student) => {
        setEditingStudent(student);
        setShowForm(true);
    };

    const handleDelete = async (id: number) => {
        await axios.delete(`http://localhost:8080/api/student-profile/${id}`);
        fetchStudents();
    };

    const handleSubmit = async (e: React.FormEvent, formData: any) => {
        e.preventDefault();

        if (editingStudent) {
            await axios.put(
                `http://localhost:8080/api/student-profile/${editingStudent.id}`,
                formData
            );
        } else {
            await axios.post(
                "http://localhost:8080/api/student-profile",
                { ...formData, institutionId }
            );
        }

        setShowForm(false);
        fetchStudents();
    };

    useEffect(() => {
        fetchStudents();
        fetchGrades();
    }, [fetchStudents, fetchGrades]);

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Gestión de Alumnos</h1>
            <button
                onClick={handleCreate}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 mb-4"
            >
                Agregar Alumno
            </button>

            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border rounded">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="py-2 px-4 border">Nombre</th>
                            <th className="py-2 px-4 border">Email</th>
                            <th className="py-2 px-4 border">Grado</th>
                            <th className="py-2 px-4 border">Estado</th>
                            <th className="py-2 px-4 border">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.map((student) => (
                            <tr key={student.id} className="hover:bg-gray-50">
                                <td className="py-2 px-4 border">{student.fullName}</td>
                                <td className="py-2 px-4 border">{student.email}</td>
                                <td className="py-2 px-4 border">{student.grade}</td>
                                <td className="py-2 px-4 border">{student.status}</td>
                                <td className="py-2 px-4 border flex gap-2">
                                    <button
                                        onClick={() => handleEdit(student)}
                                        className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
                                    >
                                        Editar
                                    </button>
                                    <button
                                        onClick={() => handleDelete(student.id)}
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
                <StudentForm
                    student={editingStudent}
                    grades={grades}
                    onSubmit={handleSubmit}
                    onCancel={() => setShowForm(false)}
                />
            </Modal>
        </div>
    );
};

export default StudentManager;