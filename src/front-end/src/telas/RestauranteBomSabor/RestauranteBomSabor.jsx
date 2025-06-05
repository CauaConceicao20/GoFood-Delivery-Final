import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './RestauranteBomSabor.css';

const PerfilRestaurante = () => {
  const [restaurante, setRestaurante] = useState({
    nome: "O BURGUER",
    descricao: "No Bom Sabor, a gente sabe que não tem nada melhor do que uma comida que abraça a gente. E é exatamente isso que você vai encontrar aqui: o sabor autêntico da comida caseira, preparada com carinho, ingredientes frescos e aquele toque especial que só a gente tem.",
    foto: null,
    produtosAtivos: 15, // Exemplo
    novoProduto: {
      foto: null,
      nome: '',
      preco: '',
      endereco: '',
      telefone: '',
      descricao: ''
    }
  });

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setRestaurante(prev => ({
        ...prev,
        novoProduto: {
          ...prev.novoProduto,
          foto: URL.createObjectURL(e.target.files[0])
        }
      }));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRestaurante(prev => ({
      ...prev,
      novoProduto: {
        ...prev.novoProduto,
        [name]: value
      }
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Novo produto:', restaurante.novoProduto);
    // Lógica para cadastrar o produto
  };

  return (
    <div className="restaurante-container">
      <div className="header-actions">
        <Link to="/menu" className="back-button">
          &larr; Voltar
        </Link>
        <h1>Painel de controle do restaurante</h1>
      </div>

      <div className="restaurante-info">
        <p>{restaurante.descricao}</p>
        
        <div className="restaurante-header">
          <h2>{restaurante.nome}</h2>
          <div className="produtos-ativos">
            <strong>Produtos ativos do restaurante:</strong> {restaurante.produtosAtivos}
          </div>
        </div>
      </div>

      <div className="divider"></div>

      <form onSubmit={handleSubmit} className="produto-form">
        <h3>Cadastrar produtos</h3>
        
        <div className="form-group">
          <label>Foto (opcional)</label>
          <label htmlFor="foto-produto" className="foto-upload">
            {restaurante.novoProduto.foto ? (
              <img 
                src={restaurante.novoProduto.foto} 
                alt="Preview do produto" 
                className="foto-preview"
              />
            ) : (
              <span>+</span>
            )}
          </label>
          <input
            id="foto-produto"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            style={{ display: 'none' }}
          />
        </div>

        <div className="form-group">
          <label>Nome do prato</label>
          <input
            type="text"
            name="nome"
            value={restaurante.novoProduto.nome}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Preço</label>
          <input
            type="text"
            name="preco"
            value={restaurante.novoProduto.preco}
            onChange={handleChange}
            required
            placeholder="R$ 00,00"
          />
        </div>

        <div className="form-group">
          <label>Endereço completo *</label>
          <input
            type="text"
            name="endereco"
            value={restaurante.novoProduto.endereco}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Telefone de celular *</label>
          <input
            type="tel"
            name="telefone"
            value={restaurante.novoProduto.telefone}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Descrição do prato</label>
          <textarea
            name="descricao"
            value={restaurante.novoProduto.descricao}
            onChange={handleChange}
            rows="4"
          />
        </div>

        <button type="submit" className="submit-button">
          Cadastrar Produto
        </button>
      </form>
    </div>
  );
};

export default PerfilRestaurante;