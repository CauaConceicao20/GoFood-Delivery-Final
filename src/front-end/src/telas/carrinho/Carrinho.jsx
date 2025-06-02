import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Carrinho.css';

const Carrinho = () => {
  const [items, setItems] = useState([
    {
      id: 1,
      nome: "Hamburger de costela",
      descricao: "Suculento, rústico e cheio de sabor. Esse hambúrguer artesanal é feito com carne de costela selecionada, garantindo uma textura macia e um gosto marcante defumado na medida certa.",
      valor: 27.90,
      quantidade: 1
    },
    // Adicione mais itens conforme necessário
  ]);

  const [showAddressModal, setShowAddressModal] = useState(false);
  const [address, setAddress] = useState('');

  const calcularTotal = () => {
    return items.reduce((total, item) => total + (item.valor * item.quantidade), 0);
  };

  const removerItem = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  const atualizarQuantidade = (id, novaQuantidade) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, quantidade: Math.max(1, novaQuantidade) } : item
    ));
  };

  const handleFinalizarPedido = () => {
    if (!address) {
      setShowAddressModal(true);
    } else {
      // Lógica para finalizar pedido
      alert(`Pedido finalizado para ${address}`);
    }
  };

  return (
    <div className="carrinho-container">
      <header className="carrinho-header">
        <h1>Carrinho</h1>
        <Link to="/" className="btn-voltar">Voltar ao Menu</Link>
      </header>

      <main className="carrinho-main">
        {items.length === 0 ? (
          <p className="carrinho-vazio">Seu carrinho está vazio</p>
        ) : (
          <>
            {items.map(item => (
              <div key={item.id} className="item-carrinho">
                <div className="item-info">
                  <h2>{item.nome}</h2>
                  <p>{item.descricao}</p>
                  <div className="item-controles">
                    <div className="quantidade-controle">
                      <button onClick={() => atualizarQuantidade(item.id, item.quantidade - 1)}>-</button>
                      <span>{item.quantidade}</span>
                      <button onClick={() => atualizarQuantidade(item.id, item.quantidade + 1)}>+</button>
                    </div>
                    <span className="item-valor">R$ {item.valor.toFixed(2)}</span>
                  </div>
                </div>
                <button 
                  className="btn-excluir"
                  onClick={() => removerItem(item.id)}
                >
                  Excluir
                </button>
              </div>
            ))}

            <div className="resumo-pedido">
              <div className="subtotal">
                <span>Subtotal ({items.reduce((total, item) => total + item.quantidade, 0)} produtos):</span>
                <span>R$ {calcularTotal().toFixed(2)}</span>
              </div>
              <button 
                className="btn-finalizar"
                onClick={handleFinalizarPedido}
              >
                Finalizar pedido
              </button>
            </div>
          </>
        )}
      </main>

      {/* Modal de Endereço */}
      {showAddressModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <span className="close-modal" onClick={() => setShowAddressModal(false)}>&times;</span>
            <h2>Insira seu endereço</h2>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Digite seu endereço completo"
            />
            <button 
              className="btn-confirmar"
              onClick={() => address && setShowAddressModal(false)}
            >
              Confirmar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Carrinho;