import React, { useState } from 'react';
import './CardItemRestaurante.css';
import Botao from '../botao/Botao';
import ModalErro from '../modal_erro/ModalErro';

const CardItemRestaurante = ({
  id,
  nomeProduto,
  preco,
  descricaoProduto,
  imagemProduto,
  logoDoRestaurante,
  restauranteNome,
}) => {
  const [mensagemModal, setMensagemModal] = useState('');

  const adicionarAoCarrinho = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/v1/carrinhos/adicionaAoCarrinho', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          produtoId: id,
          quantidade: 1,
        }),
      });

      const resultado = await response.json();

      if (response.status === 401) {
        setMensagemModal('Faça login para adicionar este produto ao seu carrinho');
      } else if (response.ok) {
        setMensagemModal(resultado.mensagem || 'Produto adicionado com sucesso.');
      } else {
        setMensagemModal(resultado.erro || 'Erro ao adicionar produto.');
      }
    } catch (err) {
      console.error('Erro inesperado:', err);
      setMensagemModal('Erro inesperado ao adicionar o produto ao carrinho.');
    }
  };

  return (
    <>
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
          <Botao onClick={adicionarAoCarrinho}>Adicionar ao carrinho</Botao>
        </div>
      </article>

      <ModalErro mensagem={mensagemModal} onClose={() => setMensagemModal('')} />
    </>
  );
};

export default CardItemRestaurante;
