import React from "react";
import { Modal, Button } from "react-bootstrap";

export default function ModalDelete({ show, msg, handleClose, handleSubmit }) {
  return (
    <>
      <Modal show={show}>
        <Modal.Body style={{ padding: "30px 70px" }}>
          <p className="text-center" style={{ fontSize: "30px" }}>
            {msg}
          </p>
          <div className="d-flex justify-content-evenly">
            <button className="modal__delete--cancel" onClick={handleClose}>
              Cancel
            </button>
            <button className="modal__delete--delete" onClick={handleSubmit}>
              Delete
            </button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
