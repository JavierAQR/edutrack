import { useState, useEffect } from "react";

interface CourseFormProps {
    course?: any;
    grades: any[];
    onSubmit: (e: React.FormEvent, formData: any) => void;
    onCancel: () => void;
}

const CourseForm = ({ course, grades, onSubmit, onCancel }: CourseFormProps) => {
    const [formData, setFormData] = useState({
        name: "",
        gradeId: ""
    });

    useEffect(() => {
        if (course) {
            setFormData({
                name: course.name,
                gradeId: course.gradeId || ""
            });
        }
    }, [course]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    return (
        <form onSubmit={(e) => onSubmit(e, formData)} className="space-y-4 p-6">
            <h2 className="text-xl font-semibold">
                {course ? "Editar Curso" : "Agregar Nuevo Curso"}
            </h2>

            <div>
                <label className="block mb-1">Nombre del Curso</label>
                <input
                    type="text"
                    name="name"
                    value={formData.name}
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
                        <option key={grade.id} value={grade.gradeId}>
                            {grade.academicLevelName} - {grade.gradeName}
                        </option>
                    ))}
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
                    {course ? "Actualizar" : "Crear"}
                </button>
            </div>
        </form>
    );
};

export default CourseForm;