import React from 'react';
import css from './CardItemRestaurante.css';


const CardItemRestaurante = ({
  nomeProduto,
  preco,
  descricaoProduto,
  imagemProduto,
}) => {
return (
    <section className="container-card-alimentos">
      <article className="card-alimentos">
        <figure>
          <a href="/src/produto.html">
            <img
              src="/src/assets/img/global/hamburguer-card.jpg"
              alt="Imagem do produto"
            />
          </a>
        </figure>
        <div className="descricao-do-alimento">
          <span className="card-titulo">Cheeseburger Clássico</span>
          <div className="card-restaurante-responsavel">
            <span className="card-img-restaurante">
              <img
                src="/src/assets/img/global/logo-restaurante-hamburguer.jpg"
                alt="Logo Restaurante"
              />
            </span>
            <span>Burger da Rua</span>
            <span className="card-avaliacao">4.9</span>
            <span className="icon-estrela"></span>
          </div>
          <div className="card-preco">
            <span className="rs">R$</span>
            <span className="valor">24,90</span>
          </div>
          <div className="card-container-botao">
            <button>Adicionar ao carrinho</button>
          </div>
        </div>
      </article>
    </section>
  );
};

export default CardItemRestaurante;