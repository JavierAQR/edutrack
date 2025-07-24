// src/pages/PagosEstudiante.tsx
import { useEffect, useState } from "react";
import axios from "axios";

interface Grade {
  id: number;
  name: string;
}

interface PrecioInstitution {
  id: number;
  tipo: string;
  monto: number;
  grade: Grade;
}

interface PagoStudent {
  id: number;
  fechaPago: string;
  estadoPago: string;
  precioInstitution: PrecioInstitution;
}

const PagosEstudiante = () => {
  const [pagos, setPagos] = useState<PagoStudent[]>([]);
  const [precios, setPrecios] = useState<PrecioInstitution[]>([]);
  const studentId = Number(localStorage.getItem("studentId"));

  useEffect(() => {
    if (!studentId) return;

    axios
      .get(`http://localhost:8080/api/pagos/dashboard/student/${studentId}`)
      .then((res) => setPagos(res.data))
      .catch((err) => console.error("Error al cargar pagos:", err));

    axios
      .get(`http://localhost:8080/api/precios`)
      .then((res) => setPrecios(res.data))
      .catch((err) => console.error("Error al cargar precios:", err));
  }, [studentId]);

  const handlePagar = (precio: PrecioInstitution) => {
    axios
      .post("http://localhost:8080/api/pagos", {
        studentId,
        precioInstitutionId: precio.id,
      })
      .then(() => {
        alert("Pago registrado");
        return axios.get(`http://localhost:8080/api/pagos/dashboard/student/${studentId}`);
      })
      .then((res) => setPagos(res.data))
      .catch((err) => console.error("Error al registrar pago:", err));
  };

  const yaPagado = (precio: PrecioInstitution) =>
    pagos.some((p) => p.precioInstitution.id === precio.id);

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow rounded">
      <h1 className="text-2xl font-bold mb-4">Mis Pagos</h1>

      {precios.map((precio) => (
        <div key={precio.id} className="flex justify-between items-center border p-4 mb-2">
          <div>
            <p><strong>Tipo:</strong> {precio.tipo}</p>
            <p><strong>Monto:</strong> S/. {precio.monto}</p>
            <p><strong>Grado:</strong> {precio.grade?.name}</p>
          </div>
          {yaPagado(precio) ? (
            <span className="text-green-600 font-bold">Pagado</span>
          ) : (
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              onClick={() => handlePagar(precio)}
            >
              Pagar
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default PagosEstudiante;
