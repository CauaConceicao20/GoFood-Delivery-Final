import React from 'react';
import './modalErro.css';

const ModalErro = ({ mensagem, onClose }) => {
  if (!mensagem) return null;

  return (
    <div className="modal-erro-overlay">
      <div className="modal-erro-box">
        <p>{mensagem}</p>
        <button className="btn-fechar" onClick={onClose}>Fechar</button>
      </div>
    </div>
  );
};

export default ModalErro;