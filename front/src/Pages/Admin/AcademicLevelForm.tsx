import axios from "axios";
import { useState, useEffect } from "react";

interface AcademicLevelFormProps {
    initialData: any;
    isEditing: boolean;
    onSubmit: () => void;
    onCancel: () => void;
}

const AcademicLevelForm = ({ initialData, isEditing, onSubmit, onCancel }: AcademicLevelFormProps) => {
    const [formData, setFormData] = useState({
        name: ""
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (initialData) {
            setFormData({
                name: initialData.name || ""
            });
        }
    }, [initialData]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const url = isEditing
                ? `http://localhost:8080/api/academic-levels/${initialData.id}`
                : "http://localhost:8080/api/academic-levels";

            const method = isEditing ? "put" : "post";

            await axios[method](url, formData);
            onSubmit();
        } catch (err) {
            console.error("Error al guardar nivel académico", err);
            alert("No se pudo guardar el nivel académico");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="p-6">
            <h3 className="text-xl font-bold mb-4">
                {isEditing ? "Editar Nivel Académico" : "Crear Nuevo Nivel Académico"}
            </h3>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Nombre del Nivel</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded"
                        required
                    />
                </div>
                <div className="flex justify-end gap-2">
                    <button
                        type="button"
                        onClick={onCancel}
                        className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
                        disabled={isSubmitting}
                    >
                        Cancelar
                    </button>
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? "Guardando..." : isEditing ? "Actualizar" : "Crear"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AcademicLevelForm;
