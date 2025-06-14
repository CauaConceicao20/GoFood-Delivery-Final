import React, { useState } from 'react';
import './RestauranteMenu.css';
import { Link } from 'react-router-dom';
import Header from '../../components/header/Header.jsx';
import Footer from '../../components/footer/Footer.jsx';

const Restaurante = () => {
  const restaurante = {
    nome: "RESTAURANTE BOM SABOR",
    descricao: "No Bom Sabor, a gente sabe que não tem nada melhor do que uma comida que abraça a gente. E é exatamente isso que você vai encontrar aqui: o sabor autêntico da comida caseira, preparada com carinho, ingredientes frescos e aquele toque especial que só a gente tem.",
    cardapio: [
      { id: 1, nome: "Burger Clássico", preco: "R$ 27,90", descricao: "Pão, carne, queijo e salada" },
      { id: 2, nome: "Burger Picante", preco: "R$ 32,90", descricao: "Pão, carne, queijo, bacon e molho picante" },
      { id: 3, nome: "Burger Vegetariano", preco: "R$ 29,90", descricao: "Pão, hambúrguer de grão-de-bico e vegetais" }
    ]
  };

  const [userRating, setUserRating] = useState(0);
  const [hasRated, setHasRated] = useState(false);

  const handleRatingChange = (rating) => {
    if (!hasRated) {
      setUserRating(rating);
    }
  };

  const handleToggleAddressModal = () => { console.log('Toggle do modal de endereço na página de Pedidos.'); }


  const handleSubmitRating = () => {
    if (userRating > 0) {
      alert(`Você avaliou o restaurante com ${userRating} estrelas!`);
      console.log(`Avaliação do restaurante: ${userRating}`);
      setHasRated(true);
    } else {
      alert("Por favor, selecione uma nota de 1 a 5 para avaliar o restaurante.");
    }
  };



  return (
    <>
    <main className="restaurante-view">
      <Header toggleAddressModal={handleToggleAddressModal} />
      {/* Botão de Voltar ao Menu */}
      <Link to="/main_menu" className="back-arrow">Voltar</Link>

      {/* Informações do Restaurante */}
      <div className="restaurante-info">
        <h1>{restaurante.nome}</h1>
        <p>{restaurante.descricao}</p>
      </div>

      {/* Seção do Cardápio */}
      <div className="cardapio-section">
        <h2>Cardápio</h2>
        <div className="itens-cardapio">
          {restaurante.cardapio.map(item => (
            <div key={item.id} className="item-cardapio">
              <div className="item-info">
                <h3>{item.nome}</h3>
                <span className="item-preco">{item.preco}</span>
              </div>
              <p className="item-descricao">{item.descricao}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Links de Gerenciamento (mantidos como estavam) */}
      <div className="links-container">
        <Link to="/cadastro-produtos" className="link-as-button">
          Cadastrar Produtos
        </Link>
        <Link to="/EdicaoRestaurante" className="link-as-button">
          Edição Restaurante
        </Link>
      </div>

      {/* Seção de Avaliação - MOVIDA PARA DEPOIS DOS LINKS DE GERENCIAMENTO */}
      <div>
        <div className="rating-section">
          <h2>Avalie o Restaurante</h2>
          <div className="rating-stars">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                className={`star ${star <= userRating ? 'selected' : ''} ${hasRated ? 'disabled' : ''}`}
                onClick={() => handleRatingChange(star)}
              >
                {star}
              </span>
            ))}
          </div>

          {!hasRated && (
            <button onClick={handleSubmitRating} className="submit-rating-button">
              Enviar Avaliação
            </button>
          )}
          {hasRated && (
            <p className="rating-message">Obrigado pela sua avaliação!</p>
          )}
        </div>
      </div>

      
    </main>
    <Footer />
    </>
  );
};

export default Restaurante;
