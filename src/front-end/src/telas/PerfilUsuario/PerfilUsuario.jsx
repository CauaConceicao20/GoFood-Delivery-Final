import React, { useState } from 'react';
import './PerfilUsuario.css';

const PerfilUsuario = () => {
  const [userData, setUserData] = useState({
    nome: '',
    email: '',
    telefone: '',
    endereco: '',
    dataNascimento: '',
    cpf: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Dados enviados:', userData);
    // Aqui você adicionaria a lógica para salvar os dados
  };

  return (
    <div className="perfil-container">
      <h1>Configuração de perfil do usuário</h1>
      
      <form onSubmit={handleSubmit}>
        {/* Estrutura da tabela conforme sua imagem */}
        <div className="profile-grid">
          {/* Linha 1 */}
          <div className="profile-row">
            <div className="profile-cell">
              <label>Foto de perfil</label>
              <div className="foto-placeholder">+</div>
            </div>
            <div className="profile-cell">
              <label>Nome completo *</label>
              <input
                type="text"
                name="nome"
                value={userData.nome}
                onChange={handleChange}
                required
              />
            </div>
            <div className="profile-cell">
              <label>Telefone de celular *</label>
              <input
                type="tel"
                name="telefone"
                value={userData.telefone}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Linha 2 */}
          <div className="profile-row">
            <div className="profile-cell"></div>
            <div className="profile-cell">
              <label>E-mail *</label>
              <input
                type="email"
                name="email"
                value={userData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="profile-cell">
              <label>Endereço *</label>
              <input
                type="text"
                name="endereco"
                value={userData.endereco}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Linha 3 */}
          <div className="profile-row">
            <div className="profile-cell">
              <label>Nome idade:</label>
              <input
                type="text"
                name="idade"
                value={userData.idade}
                onChange={handleChange}
              />
            </div>
            <div className="profile-cell">
              <label>Data de nascimento *</label>
              <input
                type="date"
                name="dataNascimento"
                value={userData.dataNascimento}
                onChange={handleChange}
                required
              />
            </div>
            <div className="profile-cell">
              <label>CPF (Opcional)</label>
              <input
                type="text"
                name="cpf"
                value={userData.cpf}
                onChange={handleChange}
                placeholder="000.000.000-00"
              />
            </div>
          </div>
        </div>

        <button type="submit" className="save-button">
          Salvar Alterações
        </button>
      </form>
    </div>
  );
};

export default PerfilUsuario; // Esta linha é crucial!