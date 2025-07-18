import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import Modal from "../../Components/ui/Modal";

interface Section {
  id?: number;
  name: string;
  courseId: number;
  teacherId: number;
  studentIds: number[];
  academicLevelId?: number;
  gradeId?: number;
}

interface Grade {
  id: number;
  name: string;
}

interface AcademicLevel {
  id: number;
  name: string;
}

interface Course {
  id: number;
  name: string;
}

interface Teacher {
  id: number;
  fullName: string;
}

interface Student {
  id: number;
  name: string;
  lastName: string;
}

const SectionManager = () => {
  const [sections, setSections] = useState<Section[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingSection, setEditingSection] = useState<Section | null>(null);
  const [grades, setGrades] = useState<Grade[]>([]);
  const [academicLevels, setAcademicLevels] = useState<AcademicLevel[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [selectedGradeId, setSelectedGradeId] = useState<number | null>(null);
  const [isAssigning, setIsAssigning] = useState(false);
  const [selectedAcademicLevelId, setSelectedAcademicLevelId] = useState<
    number | null
  >(null);
  const [sectionToEdit, setSectionToEdit] = useState<
    | (Section & {
        academicLevelId: number;
        gradeId: number;
      })
    | null
  >(null);
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

  const [sectionForm, setSectionForm] = useState<Section>({
    name: "",
    courseId: 0,
    teacherId: 0,
    studentIds: [],
  });

  const fetchSections = useCallback(async () => {
    const res = await axios.get(
      `http://localhost:8080/api/sections/institution/${institutionId}`
    );
    setSections(res.data);
  }, [institutionId]);

  const fetchGrades = useCallback(async () => {
    const res = await axios.get(
      `http://localhost:8080/api/grades/by-level/${selectedAcademicLevelId}`
    );
    setGrades(res.data.data);
  }, [selectedAcademicLevelId]);

  const fetchAcademicLevels = useCallback(async () => {
    const res = await axios.get(
      `http://localhost:8080/api/institution-academic-levels/by-institution/${institutionId}`
    );
    setAcademicLevels(res.data);
  }, [institutionId]);

  const fetchCourses = useCallback(async () => {
    if (!selectedGradeId) return;
    const res = await axios.get(
      `http://localhost:8080/api/courses/by-grade/${selectedGradeId}`
    );
    setCourses(res.data);
  }, [selectedGradeId]);

  const fetchTeachers = useCallback(async () => {
    const res = await axios.get(
      `http://localhost:8080/api/teacher-profile/institution/${institutionId}`
    );
    setTeachers(res.data);
  }, [institutionId]);

  const fetchStudents = useCallback(async () => {
    if (!selectedGradeId) return;
    const res = await axios.get(
      `http://localhost:8080/api/student-profile/by-grade-and-institution?gradeId=${selectedGradeId}&institutionId=${institutionId}`
    );
    setStudents(res.data);
  }, [selectedGradeId, institutionId]);

  const handleCreate = () => {
    setIsAssigning(false);
    setShowForm(true);
    setSelectedAcademicLevelId(null);
    setSelectedGradeId(null);
    setSectionForm({
      id: undefined,
      name: "",
      academicLevelId: 0,
      gradeId: 0,
      courseId: 0,
      teacherId: 0,
      studentIds: [],
    });
  };

  const handleAssignStudents = (section: Section) => {
    setEditingSection(section)
    setIsAssigning(true);
    setShowForm(true);
    if (section.academicLevelId && section.gradeId) {
      setSelectedAcademicLevelId(section.academicLevelId);
      setSelectedGradeId(section.gradeId);
    }
    setSectionForm({
      id: section.id,
      name: section.name,
      academicLevelId: section.academicLevelId,
      gradeId: section.gradeId,
      courseId: section.courseId,
      teacherId: section.teacherId,
      studentIds: section.studentIds || [],
    });
  };

//   const handleDelete = async (id: number) => {
//     await axios.delete(`http://localhost:8080/api/sections/${id}`);
//     fetchSections();
//   };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (editingSection) {
      await axios.put(
        `http://localhost:8080/api/sections/${editingSection.id}/students`,
        { studentIds: sectionForm.studentIds }
      );
    }

    setShowForm(false);
    fetchSections();
  };

  useEffect(() => {
    if (sectionToEdit && students.length > 0) {
      setSectionForm({
        id: sectionToEdit.id,
        name: sectionToEdit.name,
        courseId: sectionToEdit.courseId,
        teacherId: sectionToEdit.teacherId,
        studentIds: sectionToEdit.studentIds || [],
      });
      setSectionToEdit(null);
    }
  }, [students, sectionToEdit]);

  useEffect(() => {
    if (selectedAcademicLevelId) {
      fetchGrades();
    }
  }, [fetchGrades, selectedAcademicLevelId]);

  useEffect(() => {
    fetchCourses();
    fetchStudents();
  }, [fetchCourses, fetchStudents]);

  useEffect(() => {
    fetchAcademicLevels();
    fetchSections();
    fetchTeachers();
  }, [fetchAcademicLevels, fetchSections, fetchTeachers]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Gestión de Secciones</h1>
      <button
        onClick={handleCreate}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Agregar Sección
      </button>

      <div className="mt-6 grid gap-4">
        {sections.map((section) => (
          <div key={section.id} className="border p-4 rounded shadow">
            <p className="font-semibold">{section.name}</p>
            <div className="mt-2 flex gap-2">
              <button
                onClick={() =>
                  handleAssignStudents({
                    ...section,
                    academicLevelId: section.academicLevelId!,
                    gradeId: section.gradeId!,
                  })
                }
                className="bg-purple-600 text-white px-3 py-1 rounded hover:bg-purple-700"
              >
                Asignar Alumnos
              </button>
            </div>
          </div>
        ))}
      </div>

      <Modal isOpen={showForm} onClose={() => setShowForm(false)}>
        <form
          onSubmit={handleSubmit}
          className="mt-8 space-y-4 bg-gray-100 p-6 rounded shadow"
        >
          <div>
            <label className="block">Nombre de Sección</label>
            <input
              type="text"
              value={sectionForm.name}
              onChange={(e) =>
                setSectionForm({ ...sectionForm, name: e.target.value })
              }
              className="w-full border p-2 rounded"
              disabled={isAssigning}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label>Nivel Académico</label>
              <select
                value={selectedAcademicLevelId || ""}
                onChange={(e) =>
                  setSelectedAcademicLevelId(parseInt(e.target.value))
                }
                className="w-full border p-2 rounded"
                disabled={isAssigning}
              >
                <option value="">Seleccione nivel</option>
                {academicLevels.map((level) => (
                  <option key={level.id} value={level.id}>
                    {level.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label>Grado</label>
              <select
                value={selectedGradeId || ""}
                onChange={(e) => setSelectedGradeId(parseInt(e.target.value))}
                className="w-full border p-2 rounded"
                disabled={isAssigning}
              >
                <option value="">Seleccione grado</option>
                {grades.map((grade) => (
                  <option key={grade.id} value={grade.id}>
                    {grade.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label>Curso</label>
            <select
              value={sectionForm.courseId}
              onChange={(e) =>
                setSectionForm({
                  ...sectionForm,
                  courseId: parseInt(e.target.value),
                })
              }
              className="w-full border p-2 rounded"
              disabled={isAssigning}
            >
              <option value="">Seleccione curso</option>
              {courses.map((course) => (
                <option key={course.id} value={course.id}>
                  {course.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label>Profesor</label>
            <select
              value={sectionForm.teacherId}
              onChange={(e) =>
                setSectionForm({
                  ...sectionForm,
                  teacherId: parseInt(e.target.value),
                })
              }
              className="w-full border p-2 rounded"
              disabled={isAssigning}
            >
              <option value="">Seleccione profesor</option>
              {teachers.map((teacher) => (
                <option key={teacher.id} value={teacher.id}>
                  {teacher.fullName}
                </option>
              ))}
            </select>
          </div>

          {isAssigning && (
            <div>
              <label>Estudiantes</label>
              <div className="max-h-48 overflow-y-auto border rounded p-2">
                {students.map((student) => (
                  <label key={student.id} className="block">
                    <input
                      type="checkbox"
                      value={student.id}
                      checked={sectionForm.studentIds.includes(student.id)}
                      onChange={(e) => {
                        const checked = e.target.checked;
                        const id = parseInt(e.target.value);
                        setSectionForm((prev) => ({
                          ...prev,
                          studentIds: checked
                            ? [...prev.studentIds, id]
                            : prev.studentIds.filter((sid) => sid !== id),
                        }));
                      }}
                    />
                    {student.name} {student.lastName}
                  </label>
                ))}
              </div>
            </div>
          )}

       
            <button
              type="submit"
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Guardar Sección
            </button>
  
        </form>
      </Modal>
    </div>
  );
};

export default SectionManager;
