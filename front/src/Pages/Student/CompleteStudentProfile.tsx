import axios from "axios";
import { useEffect, useState, type FormEvent } from "react";
import { useNavigate } from "react-router";

interface StudentProfileData {
  academicLevelId: string;
  biography: string;
}

const CompleteStudentProfile = () => {
  const [profileData, setProfileData] = useState<StudentProfileData>({
    academicLevelId: "",
    biography: "",
  });
  const [academicLevels, setAcademicLevels] = useState<
    { id: number; name: string }[]
  >([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({
        ...prev,
        [name]: name === "academicLevel" ? parseInt(value) : value,
      }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const token = localStorage.getItem("token");
        console.log(profileData);
        
      const response = await axios.post(
        "http://localhost:8080/api/student-profile/create",
        profileData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.message === "Perfil de estudiante creado exitosamente") {
        navigate("/estudiante");
      }
    } catch (err: unknown) {
      if (axios.isAxiosError(err) && err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError("Error al crear el perfil. Por favor, intente más tarde");
      }
      console.error("Error detallado: ", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const fetchAcademicLevels = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await axios.get(
          "http://localhost:8080/admin/academic-levels",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setAcademicLevels(response.data);
        console.log(response.data);
        
      } catch (error) {
        console.error("Error al obtener niveles académicos:", error);
      }
    };

    fetchAcademicLevels();
  }, []);

  return (
    <main className="pt-21 px-4 max-w-3xl mx-auto">
      <div className="bg-white shadow-lg rounded-2xl p-8 my-20">
        <h2 className="text-2xl font-bold mb-2 text-gray-800">
          Completar Perfil de Estudiante
        </h2>
        <p className="text-gray-600 mb-6">
          Para continuar, necesitas completar tu información profesional.
        </p>

        {error && (
          <div className="bg-red-100 text-red-700 px-4 py-2 rounded mb-4 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="academicLevel"
              className="block text-sm font-medium text-gray-700"
            >
              Nivel Académico
            </label>
            <select
              id="academicLevelId"
              name="academicLevelId"
              value={profileData.academicLevelId}
              onChange={handleInputChange}
              required
              disabled={isLoading}
              className="mt-1 w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Seleccionar Nivel Académico</option>
              {academicLevels.map((level) => (
                <option key={level.id} value={level.id}>
                  {level.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="biography"
              className="block text-sm font-medium text-gray-700"
            >
              Biografía Estudiantil
            </label>
            <textarea
              id="biography"
              name="biography"
              value={profileData.biography}
              onChange={handleInputChange}
              rows={4}
              placeholder="Describe brevemente tu experiencia y enfoque educativo..."
              disabled={isLoading}
              className="mt-1 w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="pt-4">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300 disabled:opacity-50"
            >
              {isLoading ? "Guardando..." : "Completar Perfil"}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default CompleteStudentProfile;
