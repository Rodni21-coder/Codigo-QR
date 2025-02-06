import { useState } from "react";
import QRCode from "qrcode.react";
import axios from "axios";

export default function QRRegistration() {
  const [student, setStudent] = useState({ cedula: "", nombre: "" });
  const [qrData, setQrData] = useState("");

  const handleChange = (e) => {
    setStudent({ ...student, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/register", student);
      setQrData(response.data.qrCode);
    } catch (error) {
      console.error("Error registrando estudiante", error);
    }
  };

  return (
    <div className="flex flex-col items-center p-4">
      <h1 className="text-2xl font-bold">Registro de Estudiante</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-4">
        <input
          type="text"
          name="cedula"
          placeholder="Cédula"
          value={student.cedula}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />
        <input
          type="text"
          name="nombre"
          placeholder="Nombre"
          value={student.nombre}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Registrar
        </button>
      </form>
      {qrData && (
        <div className="mt-4">
          <h2 className="text-xl">Código QR:</h2>
          <QRCode value={qrData} />
        </div>
      )}
    </div>
  );
}