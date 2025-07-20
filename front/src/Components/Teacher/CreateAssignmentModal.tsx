import axios from 'axios';
import React, { useState } from 'react'

interface CreateAssignmentProps {
    sectionId: number;
    teacherId: number;
    onAssignmentCreated: () => void;
  }

const CreateAssignmentModal = ({ sectionId, teacherId, onAssignmentCreated }: CreateAssignmentProps) => {

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState('Tarea');
  const [dueDate, setDueDate] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [open, setOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return alert("Debes seleccionar un archivo");

    const formData = new FormData();
    formData.append('file', file);
    formData.append('title', title);
    formData.append('description', description);
    formData.append('type', type);
    formData.append('dueDate', dueDate);
    formData.append('sectionId', sectionId.toString());
    formData.append('teacherId', teacherId.toString());

    try {
      await axios.post('http://localhost:8080/api/assignments', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      alert("Tarea creada con éxito");
      onAssignmentCreated();
      setOpen(false);
      setTitle('');
      setDescription('');
      setDueDate('');
      setFile(null);
    } catch (error) {
      console.error(error);
      alert("Error al crear tarea");
    }
  };

  return (
    <>
      <button onClick={() => setOpen(true)} className="bg-blue-600 text-white px-4 py-2 rounded">
        Crear Tarea
      </button>

      {open && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Nueva Tarea</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Título"
                value={title}
                onChange={e => setTitle(e.target.value)}
                required
                className="w-full border px-3 py-2 rounded"
              />
              <textarea
                placeholder="Descripción"
                value={description}
                onChange={e => setDescription(e.target.value)}
                required
                className="w-full border px-3 py-2 rounded"
              />
              <select
                value={type}
                onChange={e => setType(e.target.value)}
                className="w-full border px-3 py-2 rounded"
              >
                <option value="Tarea">Tarea</option>
                <option value="Examen">Examen</option>
                <option value="Proyecto">Proyecto</option>
              </select>
              <input
                type="date"
                value={dueDate}
                onChange={e => setDueDate(e.target.value)}
                required
                className="w-full border px-3 py-2 rounded"
              />
              <input
                type="file"
                accept=".pdf,.doc,.docx,.zip,.rar,.png,.jpg,.jpeg"
                onChange={e => setFile(e.target.files?.[0] || null)}
                required
                className="w-full"
              />
              <div className="flex justify-end gap-2">
                <button type="button" onClick={() => setOpen(false)} className="text-gray-600">
                  Cancelar
                </button>
                <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
                  Crear
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default CreateAssignmentModal