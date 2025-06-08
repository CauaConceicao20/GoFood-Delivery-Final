import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Importe useNavigate
import './CadastroProdutos.css';

const CadastroProdutos = () => {
  const [produto, setProduto] = useState({
    foto: null,
    nome: '',
    preco: '',
    categoria: '', // Novo campo para categoria
    descricao: ''
    // Endereço e Telefone removidos, pois geralmente são do restaurante, não do produto
  });

  const navigate = useNavigate(); // Hook para navegação programática

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setProduto(prev => ({
          ...prev,
          foto: event.target.result // Usar Data URL para preview
        }));
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduto(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Produto cadastrado:', produto);
    alert('Produto cadastrado com sucesso!');
    navigate('/RestaurantePerfil'); // Redireciona de volta para o perfil do restaurante ou menu
  };

  return (
    <div className="cadastro-container">
      {/* Cabeçalho */}
      <div className="header-cadastro-produto"> {/* Nova classe para o cabeçalho */}
        <Link to="/RestaurantePerfil" className="back-button">
          &larr; Voltar ao Perfil
        </Link>
        <h1>Cadastrar Novo Produto</h1>
      </div>

      <form onSubmit={handleSubmit} className="produto-form">
        <div className="form-row">
          {/* Coluna da Foto */}
          <div className="photo-column">
            <label>Foto do Prato (opcional)</label>
            <label htmlFor="foto-produto" className="foto-upload">
              {produto.foto ? (
                <img src={produto.foto} alt="Preview do Prato" className="foto-preview" />
              ) : (
                <span className="plus-icon">+</span>
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

          {/* Coluna dos Campos Principais */}
          <div className="fields-column">
            <div className="form-group">
              <label htmlFor="nome" className="required-field">Nome do prato</label>
              <input
                type="text"
                id="nome"
                name="nome"
                value={produto.nome}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="preco" className="required-field">Preço</label>
              <input
                type="text"
                id="preco"
                name="preco"
                value={produto.preco}
                onChange={handleChange}
                placeholder="R$ 00,00"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="categoria" className="required-field">Categoria</label>
              <select
                id="categoria"
                name="categoria"
                value={produto.categoria}
                onChange={handleChange}
                required
              >
                <option value="">Selecione a categoria</option>
                <option value="lanches">Bebidas</option>
                <option value="bebidas">Alimentos</option>
                <option value="sobremesas">Sobremesas</option>
                <option value="pratos-principais">Marmitas</option>
                <option value="pratos-principais">Vegetarianos</option>
                <option value="pratos-principais">Lanches</option>
                <option value="vegetarianos">Vegetarianos</option>
              </select>
            </div>
          </div>
        </div>

        {/* Descrição (campo de largura total) */}
        <div className="form-group">
          <label htmlFor="descricao">Descrição do prato (opcional)</label>
          <textarea
            id="descricao"
            name="descricao"
            value={produto.descricao}
            onChange={handleChange}
            rows="4"
            placeholder="Descreva seu prato, ingredientes, etc."
          />
        </div>

        <button type="submit" className="submit-button">
          Cadastrar Produto
        </button>
      </form>
    </div>
  );
};

export default CadastroProdutos;
