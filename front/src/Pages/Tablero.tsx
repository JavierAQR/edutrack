import React, { useEffect, useState } from 'react';
import Navbar from "../Components/Navbar";
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';

// Tipos de datos mejorados
interface UserData {
    id: number;
    name: string;
    lastname: string;
    email: string;
    role: 'STUDENT' | 'TEACHER' | 'ADMIN' | 'DIRECTOR';
    code?: string;
    additionalInfo?: string;
    institutionName?: string;
}

interface Course {
    id: number;
    name: string;
    code: string;
    modality: string;
    teacher: string;
    period: string;
    academicArea?: string;
}

interface Activity {
    id: number;
    title: string;
    completed: boolean;
    course: string;
    date: string;
    type?: 'TASK' | 'EXAM' | 'PROJECT';
}

const Tablero = () => {
    const [userData, setUserData] = useState<UserData | null>(null);
    const [courses, setCourses] = useState<Course[]>([]);
    const [activities, setActivities] = useState<Activity[]>([]);
    const [loading, setLoading] = useState({
        user: true,
        courses: true,
        activities: true
    });
    const { token } = useAuth();

    // Función para manejar errores de API
    const handleApiError = (error: any, section: string) => {
        console.error(`Error fetching ${section}:`, error);
        toast.error(`Error al cargar ${section === 'user' ? 'datos del usuario' : section}`);
        return [];
    };

    // Función para obtener datos del usuario
    const fetchUserData = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/user/me', {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            setUserData(response.data);
        } catch (error) {
            handleApiError(error, 'user');
        } finally {
            setLoading(prev => ({ ...prev, user: false }));
        }
    };

    // Función para obtener cursos
    const fetchCourses = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/courses/my-courses', {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            setCourses(response.data);
        } catch (error) {
            handleApiError(error, 'courses');
        } finally {
            setLoading(prev => ({ ...prev, courses: false }));
        }
    };

    // Función para obtener actividades
    const fetchActivities = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/activities/pending', {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            setActivities(response.data);
        } catch (error) {
            handleApiError(error, 'activities');
        } finally {
            setLoading(prev => ({ ...prev, activities: false }));
        }
    };

    // Cargar todos los datos
    useEffect(() => {
        if (token) {
            const loadData = async () => {
                await Promise.all([
                    fetchUserData(),
                    fetchCourses(),
                    fetchActivities()
                ]);
            };
            loadData();
        }
    }, [token]);

    // Estado de carga general
    const isLoading = loading.user || loading.courses || loading.activities;

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white pt-24 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
                    <p className="text-gray-600">Cargando tu información...</p>
                </div>
            </div>
        );
    }

    return (
        <>
            <Navbar basic={true} />

            <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white pt-24">
                {/* Bienvenida con datos del usuario */}
                {userData && (
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
                        <div className="bg-white p-6 rounded-xl shadow-md">
                            <h1 className="text-2xl font-bold text-gray-800 mb-2">
                                Bienvenido, {userData.name} {userData.lastname}
                            </h1>
                            {userData.institutionName && (
                                <p className="text-gray-600 mb-4">Institución: {userData.institutionName}</p>
                            )}

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="bg-blue-50 p-4 rounded-lg">
                                    <p className="text-sm text-gray-500">Rol</p>
                                    <p className="font-medium capitalize">
                                        {userData.role.toLowerCase().replace('_', ' ')}
                                    </p>
                                </div>

                                <div className="bg-blue-50 p-4 rounded-lg">
                                    <p className="text-sm text-gray-500">Correo electrónico</p>
                                    <p className="font-medium">{userData.email}</p>
                                </div>

                                {userData.code && (
                                    <div className="bg-blue-50 p-4 rounded-lg">
                                        <p className="text-sm text-gray-500">
                                            {userData.role === 'STUDENT' ? 'Código de estudiante' : 'Código de profesor'}
                                        </p>
                                        <p className="font-medium">{userData.code}</p>
                                    </div>
                                )}
                            </div>

                            {userData.additionalInfo && (
                                <div className="mt-4 bg-blue-50 p-4 rounded-lg">
                                    <p className="text-sm text-gray-500">
                                        {userData.role === 'STUDENT' ? 'Nivel académico' : 'Especialización'}
                                    </p>
                                    <p className="font-medium">{userData.additionalInfo}</p>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* Contenido principal */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
                    <div className="flex flex-col lg:flex-row gap-8">
                        {/* Sección de Cursos */}
                        <div className="lg:w-2/3">
                            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                                <div className="bg-blue-500 px-6 py-4">
                                    <h2 className="text-xl font-semibold text-white">Mis Cursos</h2>
                                </div>

                                <div className="p-6">
                                    {loading.courses ? (
                                        <div className="flex justify-center py-8">
                                            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
                                        </div>
                                    ) : courses.length === 0 ? (
                                        <div className="text-center py-8">
                                            <p className="text-gray-500">No tienes cursos asignados</p>
                                        </div>
                                    ) : (
                                        <div className="space-y-6">
                                            {courses.map((course) => (
                                                <div key={course.id} className="border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow">
                                                    <div className="flex justify-between items-start">
                                                        <div>
                                                            <h3 className="font-bold text-lg text-gray-800">{course.name}</h3>
                                                            <div className="flex items-center mt-2 text-sm text-gray-600">
                                                                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded mr-2">
                                                                    {course.code}
                                                                </span>
                                                                <span>{course.modality}</span>
                                                            </div>
                                                            <p className="mt-3 text-gray-700">
                                                                <span className="font-medium">Profesor:</span> {course.teacher}
                                                            </p>
                                                            {course.academicArea && (
                                                                <p className="mt-1 text-sm text-gray-600">
                                                                    <span className="font-medium">Área:</span> {course.academicArea}
                                                                </p>
                                                            )}
                                                        </div>
                                                        <span className="bg-blue-600 text-white text-xs px-3 py-1 rounded-full">
                                                            {course.period}
                                                        </span>
                                                    </div>
                                                    <button className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                                                        Ver detalles del curso
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Sección de Actividades */}
                        <div className="lg:w-1/3">
                            <div className="bg-white rounded-xl shadow-lg overflow-hidden sticky top-28">
                                <div className="bg-blue-500 px-6 py-4">
                                    <h2 className="text-xl font-semibold text-white">Actividades Pendientes</h2>
                                </div>

                                <div className="p-6">
                                    {loading.activities ? (
                                        <div className="flex justify-center py-8">
                                            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
                                        </div>
                                    ) : activities.length === 0 ? (
                                        <div className="text-center py-8">
                                            <p className="text-gray-500">No hay actividades pendientes</p>
                                        </div>
                                    ) : (
                                        <>
                                            <div className="space-y-4">
                                                {activities.map((activity) => (
                                                    <div key={activity.id} className="border-b border-gray-100 pb-4 last:border-0">
                                                        <div className="flex items-start">
                                                            <input
                                                                type="checkbox"
                                                                checked={activity.completed}
                                                                className="mt-1 h-5 w-5 text-blue-600 rounded focus:ring-blue-500 cursor-pointer"
                                                            />
                                                            <div className="ml-3 flex-1">
                                                                <div className="flex justify-between">
                                                                    <p className={`font-medium ${activity.completed ? 'line-through text-gray-400' : 'text-gray-700'}`}>
                                                                        {activity.title}
                                                                    </p>
                                                                    <span className="text-xs text-gray-500">{activity.date}</span>
                                                                </div>
                                                                <div className="flex justify-between items-center mt-1">
                                                                    <p className="text-sm text-gray-500">{activity.course}</p>
                                                                    {activity.type && (
                                                                        <span className={`text-xs px-2 py-1 rounded ${activity.type === 'EXAM' ? 'bg-red-100 text-red-800' :
                                                                                activity.type === 'PROJECT' ? 'bg-purple-100 text-purple-800' :
                                                                                    'bg-green-100 text-green-800'
                                                                            }`}>
                                                                            {activity.type === 'EXAM' ? 'Examen' :
                                                                                activity.type === 'PROJECT' ? 'Proyecto' : 'Tarea'}
                                                                        </span>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>

                                            {/* Resumen de Actividades */}
                                            <div className="mt-6 bg-blue-50 rounded-lg p-4">
                                                <h3 className="font-medium text-blue-800 mb-2">Resumen</h3>
                                                <div className="flex justify-between text-sm">
                                                    <span className="text-gray-600">Total actividades:</span>
                                                    <span className="font-medium">{activities.length}</span>
                                                </div>
                                                <div className="flex justify-between text-sm mt-1">
                                                    <span className="text-gray-600">Completadas:</span>
                                                    <span className="font-medium text-green-600">
                                                        {activities.filter(a => a.completed).length}
                                                    </span>
                                                </div>
                                                <div className="flex justify-between text-sm mt-1">
                                                    <span className="text-gray-600">Por completar:</span>
                                                    <span className="font-medium text-blue-600">
                                                        {activities.filter(a => !a.completed).length}
                                                    </span>
                                                </div>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Tablero;