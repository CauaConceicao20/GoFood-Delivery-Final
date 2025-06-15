import React from 'react';
import './CardItemRestaurante.css';
import Botao from '../botao/Botao';

const CardItemRestaurante = ({
  id,
  nomeProduto,
  preco,
  descricaoProduto,
  imagemProduto,
  logoDoRestaurante,
  restauranteNome,
}) => {
  return (
    <article className="card-alimentos">
      <figure>
        <a href={`/produto/${id}`}>
          <img src={imagemProduto} alt={`Imagem de ${nomeProduto}`} />
        </a>
      </figure>
      <div className="descricao-do-alimento">
        <span className="card-titulo">{nomeProduto}</span>
        <div className="card-restaurante-responsavel">
          <span className="card-img-restaurante">
            <img src={logoDoRestaurante} alt={`Logo do restaurante ${restauranteNome}`} />
          </span>
          <span>{restauranteNome}</span>
          <span className="card-avaliacao">4.9</span>
          <span className="icon-estrela"></span>
        </div>
        <div className="card-preco">
          <span className="rs">R$</span>
          <span className="valor">{preco.toFixed(2).replace('.', ',')}</span>
        </div>
        <Botao>Adicionar ao carrinho</Botao>
      </div>
    </article>
  );
};

export default CardItemRestaurante;