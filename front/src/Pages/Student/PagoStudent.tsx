import { useEffect, useState } from "react";
import axios from "axios";

interface PrecioInstitution {
  id: number;
  tipo: string;
  monto: number;
  grade: { id: number; name: string };
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
  const studentProfileId = Number(localStorage.getItem("studentProfileId"));

  useEffect(() => {
    if (!studentProfileId) return;

    const loadData = async () => {
      try {
        const [pagosRes, preciosRes] = await Promise.all([
          axios.get(`http://localhost:8080/api/pagos/student/${studentProfileId}`),
          axios.get(`http://localhost:8080/api/pagos/precios-disponibles/${studentProfileId}`)
        ]);
        setPagos(pagosRes.data);
        setPrecios(preciosRes.data);
      } catch (error) {
        console.error("Error cargando datos:", error);
      }
    };

    loadData();
  }, [studentProfileId]);

  const handlePagar = async (precioId: number) => {
    try {
      await axios.post(`http://localhost:8080/api/pagos/${studentProfileId}/${precioId}`);
      const res = await axios.get(`http://localhost:8080/api/pagos/student/${studentProfileId}`);
      setPagos(res.data);
      alert("Pago registrado exitosamente");
    } catch (error: unknown) {
      let errorMessage = "Error al procesar pago";
      
      if (axios.isAxiosError(error)) {
        errorMessage = error.response?.data?.message || error.message || errorMessage;
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }
      
      console.error("Error registrando pago:", error);
      alert(errorMessage);
    }
};

  const yaPagado = (precioId: number) => 
    pagos.some(p => p.precioInstitution.id === precioId && p.estadoPago === "pagado");

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Gestión de Pagos</h1>
      
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Pagos Realizados</h2>
        {pagos.length > 0 ? (
          <div className="grid gap-4">
            {pagos.map(pago => (
              <div key={pago.id} className="border p-4 rounded-lg shadow-sm">
                <div className="flex justify-between">
                  <div>
                    <p className="font-medium">{pago.precioInstitution.tipo.toUpperCase()}</p>
                    <p>S/. {pago.precioInstitution.monto.toFixed(2)}</p>
                    <p className="text-sm text-gray-500">{pago.fechaPago}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm ${
                    pago.estadoPago === 'pagado' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {pago.estadoPago}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No hay pagos registrados</p>
        )}
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4">Pagos Pendientes</h2>
        {precios.length > 0 ? (
          <div className="grid gap-4">
            {precios.map(precio => (
              <div key={precio.id} className="border p-4 rounded-lg shadow-sm">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">{precio.tipo.toUpperCase()}</p>
                    <p>S/. {precio.monto.toFixed(2)} - {precio.grade.name}</p>
                  </div>
                  {yaPagado(precio.id) ? (
                    <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                      Pagado
                    </span>
                  ) : (
                    <button
                      onClick={() => handlePagar(precio.id)}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                    >
                      Pagar
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No hay pagos pendientes</p>
        )}
      </section>
    </div>
  );
};

export default PagosEstudiante;