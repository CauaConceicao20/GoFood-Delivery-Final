import React, { useState, useRef } from 'react';
import './Login.css';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const emailRef = useRef(null);
  const senhaRef = useRef(null);
  const rememberRef = useRef(null);
  const navigate = useNavigate();

  const [mensagem, setMensagem] = useState('');
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setMensagem('');
    setLoading(true);

    const email = emailRef.current.value;
    const senha = senhaRef.current.value;

    try {
      const response = await fetch('http://localhost:3001/api/v1/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, senha }),
        credentials: 'include'
      });

      const data = await response.json();

      if (response.ok) {
        navigate("/main_menu");
      } else {
        setMensagem(data.erro || 'Erro ao fazer login.');
      }
    } catch (error) {
      setMensagem('Erro de conexão com o servidor.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="section-login">
      <div className="login-container">
        <div className="login-box">
          <div className="login-header">
            <h2>Bem-vindo Ao GoFood</h2>
            <p>Por favor, faça login na sua conta</p>
          </div>

          {mensagem && (
            <div
              className="error-message"
              style={{ color: mensagem.includes('sucesso') ? 'green' : '#E53935' }}
            >
              {mensagem}
            </div>
          )}

          <form id="form-login" onSubmit={handleLogin}>
            <div className="form-group">
              <label htmlFor="input-email">E-mail</label>
              <input
                id="input-email"
                type="email"
                placeholder="Digite seu e-mail"
                ref={emailRef}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="input-senha">Senha</label>
              <input
                id="input-senha"
                type="password"
                placeholder="Digite sua senha"
                ref={senhaRef}
                required
              />
            </div>

            <div className="form-options">
              <div className="remember-me">
                <input
                  type="checkbox"
                  id="remember"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  ref={rememberRef}
                />
                <label htmlFor="remember">Lembrar de mim</label>
              </div>
            </div>

            <button className="btn-login" type="submit" disabled={loading}>
              {loading ? 'Entrando...' : 'Entrar'}
            </button>
          </form>

          <div className="signup-link">
            Não tem uma conta?
            <Link to="/cadastro" className="action-button primary-button"> Cadastre-se
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
