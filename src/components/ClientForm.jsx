import { useState, useEffect } from "react";


function ClientForm({ addClient, updateClient, editingClient }) {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (editingClient) {
      setNombre(editingClient.nombre);
      setEmail(editingClient.email);
    }
  }, [editingClient]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!nombre || !email) return alert("Complete todos los campos");

    if (editingClient) {
      updateClient({ ...editingClient, nombre, email });
    } else {
      addClient({ nombre, email });
    }

    setNombre("");
    setEmail("");
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "30px" }}>
      <input
        type="text"
        placeholder="Nombre"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        style={{ padding: "8px", marginRight: "10px" }}
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ padding: "8px", marginRight: "10px" }}
      />
      <button type="submit">
        {editingClient ? "Actualizar" : "Agregar"}
      </button>
    </form>
  );
}

export default ClientForm;