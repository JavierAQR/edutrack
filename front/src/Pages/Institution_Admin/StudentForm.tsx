import { useState, useEffect } from "react";

interface StudentFormProps {
    student?: any;
    grades: any[];
    onSubmit: (e: React.FormEvent, formData: any) => void;
    onCancel: () => void;
}

const StudentForm = ({ student, grades, onSubmit, onCancel }: StudentFormProps) => {
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        gradeId: "",
        status: "ACTIVE"
    });

    useEffect(() => {
        if (student) {
            setFormData({
                fullName: student.fullName,
                email: student.email,
                gradeId: student.gradeId || "",
                status: student.status
            });
        }
    }, [student]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    return (
        <form onSubmit={(e) => onSubmit(e, formData)} className="space-y-4 p-6">
            <h2 className="text-xl font-semibold">
                {student ? "Editar Alumno" : "Agregar Nuevo Alumno"}
            </h2>

            <div>
                <label className="block mb-1">Nombre Completo</label>
                <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="w-full border p-2 rounded"
                    required
                />
            </div>

            <div>
                <label className="block mb-1">Email</label>
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full border p-2 rounded"
                    required
                />
            </div>

            <div>
                <label className="block mb-1">Grado</label>
                <select
                    name="gradeId"
                    value={formData.gradeId}
                    onChange={handleChange}
                    className="w-full border p-2 rounded"
                    required
                >
                    <option value="">Seleccione un grado</option>
                    {grades.map(grade => (
                        <option key={grade.id} value={grade.id}>
                            {grade.academicLevelName} - {grade.gradeName}
                        </option>
                    ))}
                </select>
            </div>

            <div>
                <label className="block mb-1">Estado</label>
                <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="w-full border p-2 rounded"
                >
                    <option value="ACTIVE">Activo</option>
                    <option value="INACTIVE">Inactivo</option>
                    <option value="PENDING">Pendiente</option>
                </select>
            </div>

            <div className="flex justify-end gap-2 pt-4">
                <button
                    type="button"
                    onClick={onCancel}
                    className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                >
                    Cancelar
                </button>
                <button
                    type="submit"
                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                >
                    {student ? "Actualizar" : "Crear"}
                </button>
            </div>
        </form>
    );
};

export default StudentForm;