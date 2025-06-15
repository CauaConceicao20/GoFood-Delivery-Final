import React, { useEffect, useState } from 'react';
import Card from '../card_item/CardItemRestaurante.jsx';
import './sectionCards.css';

const CardSection = () => {
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/api/v1/produtos/buscarTodos', {
      method: 'GET',
      credentials: 'include', // <-- ESSENCIAL para enviar cookies
    })
      .then((response) => {
        if (!response.ok) throw new Error('Erro ao buscar produtos');
        return response.json();
      })
      .then((data) => setProdutos(data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <section className="container-card-alimentos">
      {produtos.map((produto) => (
        <Card
          key={produto.id}
          id={produto.id}
          nomeProduto={produto.nome}
          preco={produto.preco}
          descricaoProduto={produto.descricao}
           imagemProduto={`http://localhost:3001${produto.fotoUrl}`} // <-- Corrigido aqui
          logoDoRestaurante={`/uploads/logos/${produto.restaurante.id}.jpg`}
          restauranteNome={produto.restaurante.nome}
        />
      ))}
    </section>
  );
};
export default CardSection;