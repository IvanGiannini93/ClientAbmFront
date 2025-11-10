import { useState, useEffect } from "react";
import { Button, Table, Form } from "react-bootstrap";
import {
  getClients,
  addClient,
  updateClient,
  deleteClient,
  searchClients ,
} from "../services/clienteService";
import ClienteFormModal from "./ClienteFormModal";

function ClienteContainer() {
  const [clientes, setClientes] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingCliente, setEditingCliente] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const loadClientes = async () => {
    const data = await getClients();
    setClientes(data);
  };

  useEffect(() => {
    loadClientes();
  }, []);

  const handleSave = async (cliente) => {
    if (editingCliente) {
      await updateClient(cliente);
    } else {
      await addClient(cliente);
    }
    await loadClientes();
    setEditingCliente(null);
  };

  const handleEdit = (cliente) => {
    setEditingCliente(cliente);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("¿Seguro que desea eliminar este cliente?")) {
      await deleteClient(id);
      await loadClientes();
    }

    };

    const handleSearch = async (e) => {
        const query = e.target.value;
        setSearchTerm(query);

        if (query.trim() === "") {
        loadClientes();
        } else {
        const data = await searchClients(query);
        setClientes(data);
        }
    };
  

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>Lista de Clientes</h3>
        <Form.Control
          type="text"
          placeholder="Buscar por nombre..."
          value={searchTerm}
          onChange={handleSearch}
          style={{ width: "300px" }}
        />
        <Button onClick={() => setShowModal(true)}>Agregar Cliente</Button>
      </div>

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Nombres</th>
            <th>Apellidos</th>
            <th>Fecha Nac.</th>
            <th>CUIT</th>
            <th>Dirección</th>
            <th>Teléfono</th>
            <th>Email</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {clientes.map((c) => (
            <tr key={c.id}>
              <td>{c.nombres}</td>
              <td>{c.apellidos}</td>
              <td>{c.fechaDeNacimiento}</td>
              <td>{c.cuit}</td>
              <td>{c.direccion}</td>
              <td>{c.telefonoCelular}</td>
              <td>{c.email}</td>
              <td>
                <Button
                  variant="warning"
                  size="sm"
                  onClick={() => handleEdit(c)}
                  className="me-2"
                >
                  Editar
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDelete(c.id)}
                >
                  Eliminar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <ClienteFormModal
        show={showModal}
        onHide={() => {
          setShowModal(false);
          setEditingCliente(null);
        }}
        onSave={handleSave}
        editingClient={editingCliente}
      />
    </div>
  );
}

export default ClienteContainer;
