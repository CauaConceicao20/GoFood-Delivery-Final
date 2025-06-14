import React from 'react';
import './DetalhePedido.css';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../../../components/header/Header.jsx';
import Footer from '../../../components/footer/Footer.jsx';


const OrderDetails = () => {
  // Função para o botão de voltar, similar ao history.back()
  const handleGoBack = () => {
    window.history.back();
  };

  const handleCancelOrder = () => {
    alert('Funcionalidade "Cancelar pedido" em desenvolvimento!');
    // Aqui você faria a lógica para cancelar o pedido, como uma chamada de API
  };

  return (
    <>
      <Header toggleAddressModal={() => { }} />
      <main>
        <div className="OD-container">
          <h1 className="OD-page-title">Detalhes do pedido</h1>
          <div>
            <Link to="/carrinho" className="back-buton">
              &larr; Voltar ao Carrinho
            </Link>

          </div>

          <div className="OD-order-details-card">
            <div className="OD-detail-group">
              <p><strong>Solicitante:</strong> Ronaldo Gomes da Silva</p>
              <p><strong>Data do pedido:</strong> Dom 23 março 2025</p>
              <p><strong>Número do pedido:</strong> #2930</p>
              <p><strong>Status do pedido:</strong> Concluído</p>
            </div>
            <div className="OD-detail-group">
              <p><strong>Forma de pagamento:</strong> Cartão de crédito</p>
              <p><strong>Valor total do pedido:</strong> R$64,98</p>
              <p><strong>Taxa de entrega:</strong> R$12,90</p>
              <p><strong>Desconto:</strong> R$9,99</p>
            </div>
          </div>

          <div className="OD-order-item-card">
            <div className="OD-item-image-container">
              <img src="https://via.placeholder.com/100x100?text=BURGUER" alt="Cheesburguer de costela" className="OD-item-image" />
            </div>
            <div className="OD-item-details">
              <p>1x Chessburguer de costela</p>
              <p>1x Refrigerante 1Lv</p>
              <p>1x Batata média</p>
            </div>
            <div className="OD-restaurant-info">
              <h3 className="OD-restaurant-name">O BURGUER</h3>
              <p className="OD-rating">⭐ 4,6 <span className="OD-review-count">(197 avaliações)</span></p>
              <p className="OD-delivery-time">Pedido 15-45 min • R$5,00</p>
              <button className="OD-cancel-button" onClick={handleCancelOrder}>Cancelar pedido</button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default OrderDetails;