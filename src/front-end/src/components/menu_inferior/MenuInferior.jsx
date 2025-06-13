import React from 'react';
import './menuInferior.css'
import '../overlay/overlay.css';

const MenuInferior = ({ onClose, children, ativo }) => {
  if (!ativo) return null;
  return (
    <>
      <div className="overlay" onClick={onClose}></div>
      <div id="menuInferior" className="menu-inferior ativo">
        <div className="area-btn-fechar-menu-inferior">
          <span
            className="btn-fechar-menu-inferior"
            id="btnFecharMenuInferior"
            onClick={onClose}
            style={{ cursor: 'pointer' }}
          >
            &times;
          </span>
        </div>
        <ul className="menu-opcoes" id="menuOpcoes">
          {children}
        </ul>
      </div>
    </>
  );
};

export default MenuInferior;