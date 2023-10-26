import React from "react";
import "./Modal.css";

const Modal = ({ title, description, onClose }) => {
  return (
    <div className="modal" onClick={onClose}>
      <div className="modal-wrapper">
        <div
          className="modal-content"
          onClick={(e) => e.stopPropagation()} // This will prevent the modal from closing when clicking inside it
        >
          <h1 id="modalTitle">{title}</h1>
          <p id="modalDescription">{description}</p>
          <span className="close" onClick={onClose}>
            Close
          </span>
        </div>
      </div>
    </div>
  );
};

export default Modal;
