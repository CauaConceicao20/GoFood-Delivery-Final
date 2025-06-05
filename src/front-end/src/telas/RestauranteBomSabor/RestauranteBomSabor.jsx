import React from 'react';
import './RestauranteBomSabor.css'
import { Link } from 'react-router-dom';

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

  return (
    <div className="restaurante-view">
      <div className="restaurante-info">
        <h1>{restaurante.nome}</h1>
        <p>{restaurante.descricao}</p>
      </div>

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

      <Link to="/cadastro-produtos">Cadastrar Produtos</Link>    

    </div>
  );
};

export default Restaurante;