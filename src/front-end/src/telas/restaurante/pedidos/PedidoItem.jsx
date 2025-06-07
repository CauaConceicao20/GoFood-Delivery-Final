import React from 'react';
import './PedidoItem.css';

const PedidoItem = ({ pedido }) => {
  return (
    <div className="pedido-card">
      <div className="pedido-imagem">
        <img src={pedido.imagem} alt={pedido.nome} />
      </div>
      
      <div className="pedido-info">
        <div className="pedido-header">
          <h3>{pedido.nome}</h3>
          <span className="pedido-restaurante">{pedido.restaurante}</span>
        </div>
        
        <p className="pedido-descricao">{pedido.descricao}</p>
        
        <div className="pedido-footer">
          <span className="pedido-preco">R$ {pedido.preco.toFixed(2)}</span>
          <button className="pedido-botao">Adicionar ao Carrinho</button>
        </div>
      </div>
    </div>
  );
};

export default PedidoItem;