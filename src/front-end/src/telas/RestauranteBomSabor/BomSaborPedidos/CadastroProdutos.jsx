import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './CadastroProdutos.css';

const CadastroProdutos = () => {
  const [produto, setProduto] = useState({
    foto: null,
    nome: '',
    preco: '',
    endereco: '',
    telefone: '',
    descricao: ''
  });

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setProduto(prev => ({
        ...prev,
        foto: URL.createObjectURL(e.target.files[0])
      }));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduto(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Produto cadastrado:', produto);
    // Lógica para enviar os dados
  };

  return (
    <div className="cadastro-container">
      <div className="header-actions">
        <Link to="/perfil-restaurante" className="back-button">
          &larr; Voltar ao Perfil
        </Link>
        <h1>Cadastrar produtos</h1>
      </div>
      
      <form onSubmit={handleSubmit} className="produto-form">
        {/* Seção 1 */}
        <div className="form-section">
          <label>Foto (opcional)</label>
          <label htmlFor="foto-produto" className="foto-upload">
            {produto.foto ? (
              <img src={produto.foto} alt="Preview" className="foto-preview" />
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
          
          <div className="form-group">
            <label>Nome do prato</label>
            <input
              type="text"
              name="nome"
              value={produto.nome}
              onChange={handleChange}
            />
          </div>
          
          <div className="form-group">
            <label>Preço</label>
            <input
              type="text"
              name="preco"
              value={produto.preco}
              onChange={handleChange}
              placeholder="R$ 00,00"
            />
          </div>
        </div>
        
        <div className="divider"></div>
        
        {/* Seção 2 */}
        <div className="form-section">
          <div className="form-group">
            <label className="required-field">Endereço completo</label>
            <input
              type="text"
              name="endereco"
              value={produto.endereco}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label className="required-field">Telefone de celular</label>
            <input
              type="tel"
              name="telefone"
              value={produto.telefone}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        
        <div className="divider"></div>
        
        {/* Seção 3 */}
        <div className="form-section">
          <div className="form-group">
            <label>Descrição do prato</label>
            <textarea
              name="descricao"
              value={produto.descricao}
              onChange={handleChange}
              rows="4"
            />
          </div>
        </div>
        
        <button type="submit" className="submit-button">
          Cadastrar Produto
        </button>
      </form>
    </div>
  );
};

export default CadastroProdutos;