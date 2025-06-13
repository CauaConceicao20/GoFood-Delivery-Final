import React from 'react';
import Card from '../card_item/CardItemRestaurante.jsx';
import './sectionCards.css';
import imgCard from '../../assets/hamburguer-card.jpg';
import logoRestaurante from '../../assets/logo-restaurante-hamburguer.jpg';

const produtos = [
  {
    imagemProduto: imgCard,
    logoDoRestaurante: logoRestaurante,
    nomeProduto: 'Marmita Fit',
    descricao: 'Frango, arroz integral e salada',
    preco: 'R$ 19,90',
  },
  {
    imagemProduto: imgCard,
    logoDoRestaurante: logoRestaurante,
    nomeProduto: 'Marmita Vegana',
    descricao: 'Tofu, legumes e quinoa',
    preco: 'R$ 21,90',
  },
  {
    imagemProduto: imgCard,
    logoDoRestaurante: logoRestaurante,
    nomeProduto: 'Marmita Executiva',
    descricao: 'Carne assada, arroz e feijão',
    preco: 'R$ 23,50',
  },

  {
    imagemProduto: imgCard,
    logoDoRestaurante: logoRestaurante,
    nomeProduto: 'Marmita Executiva',
    descricao: 'Carne assada, arroz e feijão',
    preco: 'R$ 23,50',
  },

  {
    imagemProduto: imgCard,
    logoDoRestaurante: logoRestaurante,
    nomeProduto: 'Marmita Executiva',
    descricao: 'Carne assada, arroz e feijão',
    preco: 'R$ 23,50',
  },

  {
    imagemProduto: imgCard,
    logoDoRestaurante: logoRestaurante,
    nomeProduto: 'Marmita Executiva',
    descricao: 'Carne assada, arroz e feijão',
    preco: 'R$ 23,50',
  },

  {
    imagemProduto: imgCard,
    logoDoRestaurante: logoRestaurante,
    nomeProduto: 'Marmita Executiva',
    descricao: 'Carne assada, arroz e feijão',
    preco: 'R$ 23,50',
  },

  {
    imagemProduto: imgCard,
    logoDoRestaurante: logoRestaurante,
    nomeProduto: 'Marmita Executiva',
    descricao: 'Carne assada, arroz e feijão',
    preco: 'R$ 23,50',
  },
];

const CardSection = () => {
  return (
    <section class="container-card-alimentos">
      {produtos.map((produto, index) => (
        <Card key={index} {...produto} />
      ))}
    </section>
  );
};

export default CardSection;
