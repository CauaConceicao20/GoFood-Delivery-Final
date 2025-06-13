import React from 'react';
import './botao.css';

const Botao = ({ children, onClick, type = 'button', className, withWrapper = true }) => {
  if (withWrapper) {
    return (
      <div className="card-container-botao">
        <button onClick={onClick} type={type} className={className}>
          {children}
        </button>
      </div>
    );
  }
  return (
    <button onClick={onClick} type={type} className={className}>
      {children}
    </button>
  );
};

export default Botao;