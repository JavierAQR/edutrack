import { useState, useEffect } from "react";
import axios from "axios";

interface GradeOption {
    id: number;
    name: string;
    academicLevel: string;
}

interface StudentFormProps {
    initialData: any;
    isEditing: boolean;
    onSubmit: () => void;
    onCancel: () => void;
}

const StudentForm = ({ initialData, isEditing, onSubmit, onCancel }: StudentFormProps) => {
    const [formData, setFormData] = useState({
        username: "",
        name: "",
        lastname: "",
        email: "",
        birthdate: "",
        password: "",
        enabled: true,
        academicLevel: "",
        gradeId: ""
    });

    const [academicLevels, setAcademicLevels] = useState<string[]>([]);
    const [grades, setGrades] = useState<GradeOption[]>([]);
    const [loadingLevels, setLoadingLevels] = useState(true);
    const [loadingGrades, setLoadingGrades] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        const fetchAcademicLevels = async () => {
            try {
                const res = await axios.get("http://localhost:8080/admin/academic-levels");
                setAcademicLevels(res.data.data.map((level: any) => level.name));
                setLoadingLevels(false);
            } catch (err) {
                console.error("Error al cargar niveles académicos", err);
                setLoadingLevels(false);
            }
        };

        fetchAcademicLevels();
    }, []);

    useEffect(() => {
        if (formData.academicLevel) {
            const fetchGradesByLevel = async () => {
                try {
                    setLoadingGrades(true);
                    const res = await axios.get(
                        `http://localhost:8080/admin/grades/by-academic-level/${formData.academicLevel}`
                    );
                    setGrades(res.data.map((grade: any) => ({
                        id: grade.id,
                        name: grade.name,
                        academicLevel: grade.academicLevel.name
                    })));
                    setLoadingGrades(false);
                } catch (err) {
                    console.error("Error al cargar grados", err);
                    setLoadingGrades(false);
                }
            };

            fetchGradesByLevel();
        }
    }, [formData.academicLevel]);

    useEffect(() => {
        if (initialData) {
            setFormData({
                username: initialData.username || "",
                name: initialData.name || "",
                lastname: initialData.lastname || "",
                email: initialData.email || "",
                birthdate: initialData.birthdate || "",
                password: "",
                enabled: initialData.enabled ?? true,
                academicLevel: initialData.academicLevel || "",
                gradeId: initialData.gradeId?.toString() || ""
            });
        }
    }, [initialData]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        const checked = (e.target as HTMLInputElement).checked;

        setFormData(prev => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
            // Reset gradeId when academic level changes
            ...(name === "academicLevel" && { gradeId: "" })
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const payload = {
                ...formData,
                gradeId: formData.gradeId ? parseInt(formData.gradeId) : null
            };

            if (isEditing && initialData?.id) {
                await axios.put(
                    `http://localhost:8080/admin/students/${initialData.id}`,
                    payload
                );
            } else {
                await axios.post("http://localhost:8080/admin/students", payload);
            }
            onSubmit();
        } catch (err) {
            console.error("Error al guardar estudiante", err);
            alert("No se pudo guardar el estudiante");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="bg-white p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-4">
                {isEditing ? "Editar Estudiante" : "Crear Nuevo Estudiante"}
            </h3>
            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    {!isEditing && (
                        <>
                            <div className="mb-4">
                                <label className="block text-gray-700 mb-2">Nombre de usuario</label>
                                <input
                                    type="text"
                                    name="username"
                                    value={formData.username}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border rounded"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 mb-2">Contraseña</label>
                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border rounded"
                                    required={!isEditing}
                                    minLength={6}
                                />
                            </div>
                        </>
                    )}

                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">Nombre</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">Apellido</label>
                        <input
                            type="text"
                            name="lastname"
                            value={formData.lastname}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">Fecha de nacimiento</label>
                        <input
                            type="date"
                            name="birthdate"
                            value={formData.birthdate}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded"
                            required
                        />
                    </div>
                    
                    {/* Selector de Nivel Académico */}
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">Nivel Académico</label>
                        <select
                            name="academicLevel"
                            value={formData.academicLevel}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded"
                            disabled={loadingLevels}
                            required
                        >
                            <option value="">Seleccione un nivel académico</option>
                            {academicLevels.map(level => (
                                <option key={level} value={level}>
                                    {level}
                                </option>
                            ))}
                        </select>
                    </div>
                    
                    {/* Selector de Grado (dependiente del nivel académico) */}
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">Grado</label>
                        <select
                            name="gradeId"
                            value={formData.gradeId}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded"
                            disabled={loadingGrades || !formData.academicLevel}
                            required
                        >
                            <option value="">Seleccione un grado</option>
                            {grades.map(grade => (
                                <option key={grade.id} value={grade.id}>
                                    {grade.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    
                    <div className="mb-4">
                        <label className="flex items-center">
                            <input
                                type="checkbox"
                                name="enabled"
                                checked={formData.enabled}
                                onChange={handleChange}
                                className="mr-2"
                            />
                            <span className="text-gray-700">Activo</span>
                        </label>
                    </div>
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
                        disabled={isSubmitting || !formData.gradeId}
                    >
                        {isSubmitting ? "Guardando..." : isEditing ? "Actualizar Estudiante" : "Crear Estudiante"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default StudentForm;
