import React from 'react';
import './cardUltimoPedido.css';
import Botao from '../botao/Botao';

const CardUltimoPedido = ({ titulo, onRepetir }) => {
  return (
    <article className="ultimos-pedidos">
      <h2 className="titulo-ultimos-pedidos">{titulo}</h2>
      <button className="btn-repetir-pedido" onClick={onRepetir}>
        Repetir pedido
      </button>
    </article>
  );
};

export default CardUltimoPedido;

