import React from 'react';
import './CardItemRestaurante.css';
import Botao from '../botao/Botao';


const CardItemRestaurante = ({
  nomeProduto,
  preco,
  descricaoProduto,
  imagemProduto,
  logoDoRestaurante,
}) => {
  return (
    <article className="card-alimentos">
      <figure>
        <a href="/src/produto.html">
          <img src={imagemProduto} alt="Imagem do produto" />
        </a>
      </figure>
      <div className="descricao-do-alimento">
        <span className="card-titulo">Cheeseburger Clássico</span>
        <div className="card-restaurante-responsavel">
          <span className="card-img-restaurante">
            <img src={logoDoRestaurante} alt="Logo Restaurante" />
          </span>
          <span>Burger da Rua</span>
          <span className="card-avaliacao">4.9</span>
          <span className="icon-estrela"></span>
        </div>
        <div className="card-preco">
          <span className="rs">R$</span>
          <span className="valor">24,90</span>
        </div>
        <Botao>Adicionar ao carrinho</Botao>
      </div>
    </article>
  );
};

export default CardItemRestaurante;