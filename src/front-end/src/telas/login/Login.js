import React, { useState } from 'react';
import './Login.css';
import { Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // Validação básica
    if (!email || !password) {
      setError('Por favor, preencha todos os campos');
      return;
    }

    //chamada à API de autenticação
    console.log('Dados do login:', { email, password, rememberMe });

    // Simulação de login bem-sucedido
    // alert('Login realizado com sucesso!');
  };

  return (
    <div className="login-container">


      <div className="login-box">
        <div className="login-header">
          <h2>Bem-vindo Ao GoFood</h2>
          <p>Por favor, faça login na sua conta</p>
        </div>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="email">E-mail</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Digite seu e-mail"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Senha</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Digite sua senha"
            />
          </div>

          <div className="form-options">
            <div className="remember-me">
              <input
                type="checkbox"
                id="remember"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <label htmlFor="remember">Lembrar de mim</label>
            </div>

            <a href="/forgot-password" className="forgot-password">
              Esqueceu a senha?
            </a>
          </div>

          <button type="submit" className="login-button">
            Entrar
          </button>
        </form>

        <div className="signup-link">
          Não tem uma conta?
          <Link to="/cadastro" className="action-button primary-button">Cadastre-se</Link>
        </div>


        <div className="restaurant-access">
          <p>Acesso para restaurantes:</p>
          <Link to="/login/restaurante" className="restaurant-button">
            Entrar como Restaurante
          </Link>
        </div>

        {/* Link temporário para o menu - remover na versão final */}
        <div className="temp-menu-link">
          <Link to="/main_menu" className="temp-menu-link">Acesso temporário ao Menu</Link>
        </div>

      </div>
    </div>
  );
};

export default Login;