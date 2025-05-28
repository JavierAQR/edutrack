import React from 'react';
import Navbar from "../Components/Navbar";

const Tablero = () => {
    // Datos que luego se traerán por una API
    const cursos = [
        {
            id: 1,
            nombre: 'Desarrollo Web integrado',
            codigo: '22017',
            modalidad: 'Presencial',
            profesor: 'Enrique Les Haumas Uriades',
            ciclo: '2025 - Ciclo 1 Marzo PREG (001) (Actual)'
        },
        {
            id: 2,
            nombre: 'Diseño de Productos y Servicios',
            codigo: '22129',
            modalidad: 'Presencial',
            profesor: 'Jorge Alfredo Guevara Jimenez',
            ciclo: '2025 - Ciclo 1 Marzo PREG (001) (Actual)'
        },
        {
            id: 3,
            nombre: 'Herramientas de Desarrollo',
            codigo: '22016',
            modalidad: 'Presencial',
            profesor: 'Marcel Convalós Castro Verzweed',
            ciclo: '2025 - Ciclo 1 Marzo PREG (001) (Actual)'
        },
        {
            id: 4,
            nombre: 'Línea de Programación',
            codigo: '22017',
            modalidad: 'Presencial',
            profesor: 'Pedro Hernan De La Cruz Velasco',
            ciclo: '2025 - Ciclo 1 Marzo PREG (001) (Actual)'
        },
        {
            id: 5,
            nombre: 'Liderazgo y Gestión de Equipos',
            codigo: '22122',
            modalidad: 'Presencial',
            profesor: 'Vilfredo Luis Carrasco García',
            ciclo: '2025 - Ciclo 1 Marzo PREG (001) (Actual)'
        },
        {
            id: 6,
            nombre: 'Seguridad Informática',
            codigo: '39307',
            modalidad: 'Virtual 24/7',
            profesor: 'Kayla Lisbeth Navarro Ramirez',
            ciclo: '2025 - Ciclo 1 Marzo PREG (001) (Actual)'
        }
    ];

    const actividades = [
        {
            id: 1,
            titulo: 'Tarea no calificada',
            completada: false,
            curso: 'Desarrollo Web integrado',
            fecha: '01/06/2025'
        },
        {
            id: 2,
            titulo: 'Repasamos lo aprendido impienes...',
            completada: false,
            curso: 'Diseño de Productos y Servicios',
            fecha: '01/06/2025'
        },
        {
            id: 3,
            titulo: 'Por extraño seguridad hermética',
            completada: true,
            curso: 'Herramientas de Desarrollo',
            fecha: '01/06/2025'
        },
        {
            id: 4,
            titulo: 'Vierce: 01/06/2025 a las 11:39 PM',
            completada: false,
            curso: 'Línea de Programación',
            fecha: '01/06/2025'
        }
    ];

    return (
        <>
            <Navbar basic={true} />

            <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white pt-24">
                {/* Main Content */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="flex flex-col lg:flex-row gap-8">
                        {/* Sección de Cursos */}
                        <div className="lg:w-2/3">
                            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                                <div className="bg-blue-500 px-6 py-4">
                                    <h2 className="text-xl font-semibold text-white">Mis Cursos</h2>
                                </div>
                                <div className="p-6">
                                    <div className="space-y-6">
                                        {cursos.map((curso) => (
                                            <div key={curso.id} className="border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow">
                                                <div className="flex justify-between items-start">
                                                    <div>
                                                        <h3 className="font-bold text-lg text-gray-800">{curso.nombre}</h3>
                                                        <div className="flex items-center mt-2 text-sm text-gray-600">
                                                            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded mr-2">
                                                                {curso.codigo}
                                                            </span>
                                                            <span>{curso.modalidad}</span>
                                                        </div>
                                                        <p className="mt-3 text-gray-700">
                                                            <span className="font-medium">Profesor:</span> {curso.profesor}
                                                        </p>
                                                    </div>
                                                    <span className="bg-blue-600 text-white text-xs px-3 py-1 rounded-full">
                                                        {curso.ciclo}
                                                    </span>
                                                </div>
                                                <button className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                                                    Ver detalles del curso
                                                </button>
                                            </div>
                                        ))}
                                    </div>
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
                                    <div className="space-y-4">
                                        {actividades.map((actividad) => (
                                            <div key={actividad.id} className="border-b border-gray-100 pb-4 last:border-0">
                                                <div className="flex items-start">
                                                    <input
                                                        type="checkbox"
                                                        checked={actividad.completada}
                                                        onChange={() => { }}
                                                        className="mt-1 h-5 w-5 text-blue-600 rounded focus:ring-blue-500 cursor-pointer"
                                                    />
                                                    <div className="ml-3 flex-1">
                                                        <div className="flex justify-between">
                                                            <p className={`font-medium ${actividad.completada ? 'line-through text-gray-400' : 'text-gray-700'}`}>
                                                                {actividad.titulo}
                                                            </p>
                                                            <span className="text-xs text-gray-500">{actividad.fecha}</span>
                                                        </div>
                                                        <p className="text-sm text-gray-500 mt-1">{actividad.curso}</p>
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
                                            <span className="font-medium">{actividades.length}</span>
                                        </div>
                                        <div className="flex justify-between text-sm mt-1">
                                            <span className="text-gray-600">Completadas:</span>
                                            <span className="font-medium text-green-600">
                                                {actividades.filter(a => a.completada).length}
                                            </span>
                                        </div>
                                    </div>
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