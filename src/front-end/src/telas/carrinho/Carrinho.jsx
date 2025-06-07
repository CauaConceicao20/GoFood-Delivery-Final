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

  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('pix'); // Estado para forma de pagamento selecionada

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
    setShowConfirmationModal(true);
  };

  return (
    <div className="carrinho-container">
      <header className="carrinho-header">
        <h1>Carrinho</h1>
        <Link to="/main_menu" className="btn-voltar">Voltar ao Menu</Link>
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
              <div className="payment-section">
                <div className="subtotal">
                  <span>Subtotal ({items.reduce((total, item) => total + item.quantidade, 0)} produtos):</span>
                  <span>R$ {calcularTotal().toFixed(2)}</span>
                </div>
                
                <div className="payment-methods">
                  <h3>Forma de Pagamento</h3>
                  <div className="payment-options">
                    <label className={paymentMethod === 'pix' ? 'active' : ''}>
                      <input 
                        type="radio" 
                        name="payment" 
                        value="pix" 
                        checked={paymentMethod === 'pix'}
                        onChange={() => setPaymentMethod('pix')}
                      />
                      PIX
                    </label>
                    <label className={paymentMethod === 'dinheiro' ? 'active' : ''}>
                      <input 
                        type="radio" 
                        name="payment" 
                        value="dinheiro"
                        checked={paymentMethod === 'dinheiro'}
                        onChange={() => setPaymentMethod('dinheiro')}
                      />
                      Dinheiro
                    </label>
                    <label className={paymentMethod === 'cartao' ? 'active' : ''}>
                      <input 
                        type="radio" 
                        name="payment" 
                        value="cartao"
                        checked={paymentMethod === 'cartao'}
                        onChange={() => setPaymentMethod('cartao')}
                      />
                      Cartão
                    </label>
                  </div>
                </div>
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

      {/* Modal de Confirmação */}
      {showConfirmationModal && (
        <div className="modal-overlay">
          <div className="confirmation-modal">
            <div className="popup-icon">✓</div>
            <h2 className="popup-title">Pedido Confirmado!</h2>
            <p className="popup-message">Seu pedido foi recebido com sucesso e já está sendo preparado.</p>
            
            <div className="order-summary">
              {items.map(item => (
                <div key={item.id} className="order-item">
                  <span>{item.nome} ×{item.quantidade}</span>
                  <span>R$ {(item.valor * item.quantidade).toFixed(2)}</span>
                </div>
              ))}
              <div className="order-total">
                <span>Total</span>
                <span>R$ {calcularTotal().toFixed(2)}</span>
              </div>
              <div className="payment-confirmation">
                <span>Forma de pagamento:</span>
                <span>{paymentMethod === 'pix' ? 'PIX' : paymentMethod === 'dinheiro' ? 'Dinheiro' : 'Cartão'}</span>
              </div>
            </div>
            
            <Link to="/detalhes-pedido" className="btn btn-primary">
              Ver Detalhes do Pedido
            </Link>
            
            <button 
              className="btn btn-secondary"
              onClick={() => setShowConfirmationModal(false)}
            >
              Continuar Comprando
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Carrinho;