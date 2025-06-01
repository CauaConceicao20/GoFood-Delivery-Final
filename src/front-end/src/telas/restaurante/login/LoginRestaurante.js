import React from 'react';
import { Link } from 'react-router-dom';
import './LoginRestaurante.css';

const LoginRestaurante = () => {
  const [formData, setFormData] = React.useState({
    cnpj: '',
    senha: ''
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
    // Lógica de login para restaurantes
    console.log('Dados do restaurante:', formData);
  };

  return (
    <div className="login-restaurante-container">
      <h2>Login para Restaurantes</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>CNPJ</label>
          <input
            type="text"
            name="cnpj"
            value={formData.cnpj}
            onChange={handleChange}
            placeholder="00.000.000/0000-00"
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
            placeholder="Digite sua senha"
            required
          />
        </div>

        <button type="submit" className="login-button">
          Acessar
        </button>
      </form>

      <div className="signup-link">
        Novo restaurante? <Link to="/cadastro/restaurante">Cadastre-se aqui</Link>
      </div>

      <div className="back-link">
        <Link to="/login">Voltar para login principal</Link>
      </div>
    </div>
  );
};

export default LoginRestaurante; // Exportação correta