import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import './DetalhePedido.css';

const DetalhesPedido = () => {
  const location = useLocation();
  const { pedido } = location.state || {};

  if (!pedido) {
    return (
      <div className="detalhes-pedido-container">
        <h1>Nenhum pedido encontrado</h1>
        <Link to="/" className="btn-voltar">Voltar</Link>
      </div>
    );
  }

  const formatarMoeda = (valor) => {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  return (
    <div className="detalhes-pedido-container">
      <header className="detalhes-header">
        <h1>Detalhes do pedido</h1>
        <Link to="/carrinho" className="btn-voltar">Voltar</Link>
      </header>

      <main className="detalhes-main">
        <section className="info-pedido">
          <div className="info-row">
            <span>Solicitante:</span>
            <span>{pedido.cliente}</span>
          </div>
          {/* Adicione o resto das informações conforme seu layout */}
        </section>

        {/* Adicione as outras seções conforme necessário */}
      </main>
    </div>
  );
};

export default DetalhesPedido;