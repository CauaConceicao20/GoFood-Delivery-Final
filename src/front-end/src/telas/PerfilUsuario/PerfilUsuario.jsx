import React, { useState } from 'react';
import './PerfilUsuario.css';

const PerfilUsuario = () => {
  const [userData, setUserData] = useState({
    foto: null,
    nomeCompleto: '',
    telefone: '',
    email: '',
    endereco: '',
    idade: '',
    dataNascimento: '',
    cpf: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setUserData(prev => ({ ...prev, foto: event.target.result }));
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Dados salvos:', userData);
  };

  return (
    <div className="profile-container">
      <h1>Configuração de perfil do usuário</h1>
      
      <form onSubmit={handleSubmit} className="profile-form">
        <table className="profile-table">
          <tbody>
            {/* Linha 1 */}
            <tr>
              <td rowSpan="3" className="photo-cell">
                <label>Foto de perfil</label>
                <label htmlFor="photo-upload" className="photo-upload-btn">
                  {userData.foto ? (
                    <img src={userData.foto} alt="Foto do perfil" className="profile-image" />
                  ) : (
                    '+'
                  )}
                </label>
                <input
                  id="photo-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  style={{ display: 'none' }}
                />
              </td>
              <td className="label-cell">
                <label className="required-field">Nome completo</label>
              </td>
              <td>
                <input
                  type="text"
                  name="nomeCompleto"
                  value={userData.nomeCompleto}
                  onChange={handleChange}
                  required
                />
              </td>
              <td className="label-cell">
                <label className="required-field">Telefone de celular</label>
              </td>
              <td>
                <input
                  type="tel"
                  name="telefone"
                  value={userData.telefone}
                  onChange={handleChange}
                  required
                />
              </td>
            </tr>

            {/* Linha 2 */}
            <tr>
              <td className="label-cell">
                <label className="required-field">E-mail</label>
              </td>
              <td colSpan="3">
                <input
                  type="email"
                  name="email"
                  value={userData.email}
                  onChange={handleChange}
                  required
                />
              </td>
            </tr>

            {/* Linha 3 */}
            <tr>
              <td className="label-cell">
                <label className="required-field">Endereço</label>
              </td>
              <td colSpan="3">
                <input
                  type="text"
                  name="endereco"
                  value={userData.endereco}
                  onChange={handleChange}
                  required
                />
              </td>
            </tr>

            {/* Linha 4 */}
            <tr>
              <td className="label-cell">
                <label>Nome idade:</label>
              </td>
              <td>
                <input
                  type="text"
                  name="idade"
                  value={userData.idade}
                  onChange={handleChange}
                />
              </td>
              <td className="label-cell">
                <label className="required-field">Data de nascimento</label>
              </td>
              <td>
                <input
                  type="text"
                  name="dataNascimento"
                  value={userData.dataNascimento}
                  onChange={handleChange}
                  placeholder="dd/mm/aaaa"
                  required
                />
              </td>
            </tr>

            {/* Linha 5 */}
            <tr>
              <td className="label-cell">
                <label>CPF (Opcional)</label>
              </td>
              <td colSpan="3">
                <input
                  type="text"
                  name="cpf"
                  value={userData.cpf}
                  onChange={handleChange}
                  placeholder="000.000.000-00"
                />
              </td>
            </tr>
          </tbody>
        </table>

        <div className="form-actions">
          <button type="submit" className="save-button">
            Salvar Alterações
          </button>
        </div>
      </form>
    </div>
  );
};

export default PerfilUsuario;