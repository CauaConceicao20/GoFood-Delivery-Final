import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Cadastro.css';
import ModalErro from '../../components/modal_erro/ModalErro.jsx';

const Cadastro = () => {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    cpf: '',
    senha: '',
    confirmarSenha: ''
  });

  const [mensagemErro, setMensagemErro] = useState('');
  const [mostrarModal, setMostrarModal] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    const cleanValue = ['telefone', 'cpf'].includes(name)
      ? value.replace(/\D/g, '')
      : value;

    setFormData((prev) => ({
      ...prev,
      [name]: cleanValue
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.senha !== formData.confirmarSenha) {
      setMensagemErro('As senhas não coincidem.');
      setMostrarModal(true);
      return;
    }

    if (!/^\d+$/.test(formData.telefone)) {
      setMensagemErro('Telefone deve conter apenas números.');
      setMostrarModal(true);
      return;
    }

    if (!/^\d+$/.test(formData.cpf)) {
      setMensagemErro('CPF deve conter apenas números.');
      setMostrarModal(true);
      return;
    }

    const usuario = {
      nome: formData.nome,
      email: formData.email,
      senha: formData.senha,
      telefone: formData.telefone,
      cpf: formData.cpf
    };

    try {
      const response = await fetch('http://localhost:3001/api/v1/usuarios/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(usuario)
      });

      const data = await response.json();

      if (!response.ok) {
        setMensagemErro(data.erro || 'Erro ao cadastrar.');
        setMostrarModal(true);
        return;
      }

      navigate('/login');
    } catch (err) {
      setMensagemErro('Erro na comunicação com o servidor.');
      setMostrarModal(true);
    }
  };

  return (
    <div className="cadastro-user-container">
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
              type="text"
              name="telefone"
              value={formData.telefone}
              onChange={handleChange}
              placeholder="Somente números (ex: 11999998899)"
              required
            />
          </div>

          <div className="form-group">
            <label>CPF</label>
            <input
              type="text"
              name="cpf"
              value={formData.cpf}
              onChange={handleChange}
              placeholder="Somente números (ex: 12345678900)"
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

          <div className="login-link">
            Já tem uma conta? <Link to="/login">Faça login</Link>
          </div>
        </form>
      </div>

      <ModalErro
        mensagem={mostrarModal ? mensagemErro : ''}
        onClose={() => setMostrarModal(false)}
      />
    </div>
  );
};

export default Cadastro;
