const API_URL = "http://localhost:8081/clientes";

export async function getClients() {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error("Error al obtener clientes");
  return res.json();
}

export async function addClient(cliente) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(cliente),
  });
  if (!res.ok) throw new Error("Error al agregar cliente");
}

export async function updateClient(cliente) {
  const res = await fetch(`${API_URL}/${cliente.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(cliente),
  });
  if (!res.ok) throw new Error("Error al actualizar cliente");
}

export async function deleteClient(id) {
  const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Error al eliminar cliente");
}

export async function searchClients(query) {
  const response = await fetch(`http://localhost:8081/clientes/search?nombres=${query}`);
  return await response.json();
}

