import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Cadastro.css';

const Cadastro = () => {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    cep: '',
    senha: '',
    confirmarSenha: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validação e envio dos dados
    console.log('Dados do cadastro:', formData);
  };

  return (
    <div className="cadastro-container">
      <div className="cadastro-box">
        <h2>Criar Conta</h2>
        <p>Preencha seus dados para se cadastrar</p>
        
        <form onSubmit={handleSubmit} className="cadastro-form">
          <div className="form-group">
            <label>Nome Completo</label>
            <input
              type="text"
              name="nome"
              value={formData.nome}
              onChange={handleChange}
              placeholder="Digite seu nome completo"
              required
            />
          </div>

          <div className="form-group">
            <label>E-mail</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Digite seu e-mail"
              required
            />
          </div>

          <div className="form-group">
            <label>Telefone</label>
            <input
              type="tel"
              name="telefone"
              value={formData.telefone}
              onChange={handleChange}
              placeholder="(00) 00000-0000"
              required
            />
          </div>

          <div className="form-group">
            <label>CEP</label>
            <input
              type="text"
              name="cep"
              value={formData.cep}
              onChange={handleChange}
              placeholder="00000-000"
              required
            />
          </div>

          <div className="form-group">
            <label>Senha</label>
            <input
              type="password"
              name="senha"
              value={formData.senha}
              onChange={handleChange}
              placeholder="Crie uma senha"
              required
            />
          </div>

          <div className="form-group">
            <label>Confirmar Senha</label>
            <input
              type="password"
              name="confirmarSenha"
              value={formData.confirmarSenha}
              onChange={handleChange}
              placeholder="Repita a senha"
              required
            />
          </div>

          <button type="submit" className="cadastro-button">
            Cadastrar
          </button>

          <div className="login-link">Já tem uma conta? <Link to="/login">Faça login</Link></div>

        </form>
      </div>
    </div>
  );
};

export default Cadastro;