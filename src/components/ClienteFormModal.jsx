import { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";

function ClienteFormModal({ show, onHide, onSave, editingClient }) {
  const [form, setForm] = useState({
    nombres: "",
    apellidos: "",
    fechaDeNacimiento: "",
    cuit: "",
    direccion: "",
    telefonoCelular: "",
    email: "",
  });

  useEffect(() => {
    if (editingClient) {
      setForm(editingClient);
    } else {
      setForm({
        nombres: "",
        apellidos: "",
        fechaDeNacimiento: "",
        cuit: "",
        direccion: "",
        telefonoCelular: "",
        email: "",
      });
    }
  }, [editingClient, show]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(form);
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>
          {editingClient ? "Editar Cliente" : "Agregar Cliente"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-2">
            <Form.Label>Nombres</Form.Label>
            <Form.Control
              name="nombres"
              value={form.nombres}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Label>Apellidos</Form.Label>
            <Form.Control
              name="apellidos"
              value={form.apellidos}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Label>Fecha de Nacimiento</Form.Label>
            <Form.Control
              type="date"
              name="fechaDeNacimiento"
              value={form.fechaDeNacimiento}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Label>CUIT</Form.Label>
            <Form.Control
              name="cuit"
              value={form.cuit}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Label>Dirección</Form.Label>
            <Form.Control
              name="direccion"
              value={form.direccion}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Label>Teléfono Celular</Form.Label>
            <Form.Control
              name="telefonoCelular"
              value={form.telefonoCelular}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Button type="submit" variant="success" className="w-100">
            Guardar
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default ClienteFormModal;
