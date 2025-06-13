import React, { useRef } from 'react';
import './modalEndereco.css';

const ModalEndereco = ({ aberto, onClose, onAddEndereco }) => {
  const inputRef = useRef(null);

  if (!aberto) return null;

  const handleAdd = () => {
    if (inputRef.current) {
      onAddEndereco(inputRef.current.value);
    }
  };

  return (
    <div className={`modal-area${aberto ? " ativo" : ""}`} id="modalArea">
      <div className="modal-conteudo" id="modalConteudo">
        <span
          className="btn-fechar-modal"
          id="btnFecharModal"
          onClick={onClose}
          style={{ cursor: 'pointer' }}
        >
          &times;
        </span>
        <h2>Digite Seu CEP:</h2>
        <input
          className="input-endereco"
          id="inputEndereco"
          type="text"
          placeholder="Digite seu CEP"
          ref={inputRef}
        />
        <div className="area-btn-modal" id="areaBtnModal">
          <button
            className="btn-adicionar-endereco-modal"
            id="btnAddEnderecoModal"
            onClick={handleAdd}
          >
            Adicionar Endereço
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalEndereco;