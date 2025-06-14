import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './EdicaoUsuario.css'; // Certifique-se de que este CSS está linkado

const EdicaoUsuario = () => {
  const [userData, setUserData] = useState({
    foto: null,
    nomeCompleto: 'João da Silva',
    telefone: '(11) 98765-4321', // Exemplo de dado inicial
    email: 'joao.silva@example.com',
    endereco: 'Rua Exemplo, 123 - Centro, São Paulo',
    dataNascimento: '01/01/1990',
    cpf: '123.456.789-00' // Exemplo de dado inicial
  });

  const navigate = useNavigate();

  useEffect(() => {
    const storedData = localStorage.getItem('userDataProfile');
    if (storedData) {
      setUserData(JSON.parse(storedData));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Simplificamos a manipulação de entrada para não interferir na digitação.
    // A validação de formato (placeholder, maxLength) pode ser feita no submit ou via bibliotecas de formatação.
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
    console.log('Dados do usuário salvos:', userData);
    localStorage.setItem('userDataProfile', JSON.stringify(userData));
    alert('Dados salvos com sucesso!');
    navigate('/perfil');
  };

  const handleCancelClick = () => {
    alert('Edição cancelada!');
    navigate('/perfil');
  };

  return (
    <div className="edit-profile-container">
      <div>
        <Link to="/perfil" className="back-button">
          &larr; Voltar ao Perfil
        </Link>
        <h1>Editar Perfil do Usuário</h1>
      </div>

      <form onSubmit={handleSubmit} className="edit-profile-form">
        <table className="edit-profile-table">
          <tbody>
            {/* Linha 1: Nome Completo */}
            <tr>

              <td className="label-cell">
                <label htmlFor="nomeCompleto" className="required-field">Nome completo</label>
              </td>
              <td>
                <input
                  type="text"
                  id="nomeCompleto"
                  name="nomeCompleto"
                  value={userData.nomeCompleto}
                  onChange={handleChange}
                  required
                />
              </td>
              {/* Esta célula é removida para que o telefone possa ir para a próxima linha */}
              <td colSpan="2"></td> {/* Célula vazia para manter o layout de 4 colunas na linha */}
            </tr>

            {/* Nova Linha 2: Telefone de celular */}
            <tr>
              <td className="label-cell">
                <label htmlFor="telefone" className="required-field">Telefone de celular</label>
              </td>
              <td>
                <input
                  type="tel"
                  id="telefone"
                  name="telefone"
                  value={userData.telefone}
                  onChange={handleChange}
                  placeholder="(XX) XXXXX-XXXX"
                  maxLength="15" // Limite de caracteres para o formato (XX) XXXXX-XXXX
                  required
                />
              </td>
              <td colSpan="2"></td> {/* Célula vazia para manter o layout de 4 colunas na linha */}
            </tr>

            {/* Linha 3 (antiga Linha 2): E-mail */}
            <tr>
              <td className="label-cell">
                <label htmlFor="email" className="required-field">E-mail</label>
              </td>
              <td colSpan="3"> {/* Mantém colSpan="3" para ocupar o restante da linha */}
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={userData.email}
                  onChange={handleChange}
                  required
                />
              </td>
            </tr>

            {/* Linha 4 (antiga Linha 3): Endereço */}
            <tr>
              <td className="label-cell">
                <label htmlFor="endereco" className="required-field">Endereço</label>
              </td>
              <td colSpan="3"> {/* Mantém colSpan="3" para ocupar o restante da linha */}
                <input
                  type="text"
                  id="endereco"
                  name="endereco"
                  value={userData.endereco}
                  onChange={handleChange}
                  required
                />
              </td>
            </tr>

            {/* Linha 5 (antiga Linha 4): Data de nascimento e CPF */}
            <tr>
              {/* Esta célula não está mais sob a foto, então não precisa de rowSpan */}
              <td className="label-cell">
                <label htmlFor="dataNascimento" className="required-field">Data de nascimento</label>
              </td>
              <td>
                <input
                  type="text"
                  id="dataNascimento"
                  name="dataNascimento"
                  value={userData.dataNascimento}
                  onChange={handleChange}
                  placeholder="dd/mm/aaaa"
                  required
                />
              </td>
              <td className="label-cell">
                <label htmlFor="cpf">CPF (Não Editável)</label>
              </td>
              <td>
                <input
                  type="text"
                  id="cpf"
                  name="cpf"
                  value={userData.cpf}
                  readOnly
                  className="read-only-input"
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
          <button type="button" onClick={handleCancelClick} className="cancel-button">
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default EdicaoUsuario;
