import { useState, useEffect } from "react";

interface Grade {
    id: number;
    name: string;
    academicLevelId: number;
    academicLevelName: string;
}

interface CourseFormProps {
    course?: {
        id?: number;
        name: string;
        gradeId?: number;
        gradeName?: string;
    };
    grades: Grade[];
    onSubmit: (formData: { name: string; gradeId: string }) => void;
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
                gradeId: course.gradeId ? course.gradeId.toString() : ""
            });
        } else {
            setFormData({
                name: "",
                gradeId: ""
            });
        }
    }, [course]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 p-6">
            <h2 className="text-xl font-semibold">
                {course ? "Editar Curso" : "Agregar Nuevo Curso"}
            </h2>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nombre del Curso
                </label>
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    required
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Grado
                </label>
                <select
                    name="gradeId"
                    value={formData.gradeId}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    required
                >
                    <option value="">Seleccione un grado</option>
                    {grades.map(grade => (
                        <option key={grade.id} value={grade.id}>
                            {grade.academicLevelName} - {grade.name}
                        </option>
                    ))}
                </select>
            </div>

            <div className="flex justify-end gap-2 pt-4">
                <button
                    type="button"
                    onClick={onCancel}
                    className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    Cancelar
                </button>
                <button
                    type="submit"
                    className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    {course ? "Actualizar" : "Crear"}
                </button>
            </div>
        </form>
    );
};

export default CourseForm;
