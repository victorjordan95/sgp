import React from 'react';
import { toast } from 'react-toastify';

import { Button, Modal } from 'react-bootstrap';

import api from '../services/api';
import authToken from '../utils/authToken';

function AvatarPicture({ show, setShow, route, id, onClose }) {
  const handleDelete = async () => {
    try {
      await api.delete(`${route}/${id}`, authToken());
      toast.success('Excluido com sucesso');
      onClose();
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <Modal
      show={show}
      onHide={() => setShow(false)}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>Confirmação para remover</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Você deseja realmente excluir?</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="light" onClick={() => setShow(false)}>
          Cancelar
        </Button>
        <Button variant="danger" onClick={handleDelete}>
          Excluir
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default AvatarPicture;
