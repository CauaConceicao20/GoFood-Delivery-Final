import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Carrinho.css';
import Header from '../../components/header/Header.jsx';
import Footer from '../../components/footer/Footer.jsx';

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

  const [paymentMethod, setPaymentMethod] = useState('pix');
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const navigate = useNavigate();

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

  const confirmarPedido = () => {
    const pedido = {
      id: `#${Math.floor(Math.random() * 10000)}`,
      cliente: "Nome do Cliente",
      data: new Date().toLocaleDateString('pt-BR', {
        weekday: 'short',
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      }),
      status: 'Preparando',
      pagamento: paymentMethod === 'pix' ? 'PIX' :
        paymentMethod === 'dinheiro' ? 'Dinheiro' : 'Cartão de crédito',
      total: calcularTotal(),
      taxaEntrega: 12.90,
      desconto: 0,
      items: items.map(item => ({
        nome: item.nome,
        quantidade: item.quantidade
      })),
      restaurante: {
        nome: 'O BURGUER',
        avaliacao: '4,6 (10% utilizado) Padrão 55.5 e lama R$31,00'
      }
    };

    navigate('/detalhes-pedido', { state: { pedido } });
  };

  return (
    <>
      <Header toggleAddressModal={() => { }} />
      <div className="carrinho-container">

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

        {showConfirmationModal && (
          <div className="modal-overlay">
            <div className="confirmation-modal">
              <div className="popup-icon">✓</div>
              <h2 className="popup-title">Confirmar Pedido</h2>
              <p className="popup-message">Deseja finalizar o pedido ou continuar comprando?</p>

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
              </div>

              <div className="modal-buttons">
                <button
                  className="btn btn-primary"
                  onClick={confirmarPedido}
                >
                  Finalizar e Ver Detalhes
                </button>

                <button
                  className="btn btn-secondary"
                  onClick={() => setShowConfirmationModal(false)}
                >
                  Continuar Comprando
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
      <Footer />
    </>

  );
};

export default Carrinho;