import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Importe Link
import './PerfilUsuario.css';

const PerfilUsuario = () => {
  const [userData] = useState({
    foto: null,
    nomeCompleto: 'João da Silva',
    telefone: '(11) 98765-4321',
    email: 'joao.silva@example.com',
    endereco: 'Rua Exemplo, 123 - Centro, São Paulo',
    dataNascimento: '01/01/1990',
    cpf: '123.456.789-00'
  });

  return (
    <div className="profile-container">
      {/* Cabeçalho */}
      <div>
        <Link to="/main_menu" className="back-button">
          &larr; Voltar ao Menu
        </Link>
        <h1>Configuração de perfil do usuário</h1>
      </div>

      {/* Formulário (apenas para exibição) */}
      <div className="profile-form">
        <table className="profile-table">
          <tbody>
            {/* Linha 1: Nome Completo */}
            <tr>
              <td className="label-cell">
                <label className="required-field">Nome completo</label>
              </td>
              <td>
                <span className="display-value">{userData.nomeCompleto}</span>
              </td>
              {/* Adiciona uma célula vazia para manter o layout de 4 colunas na linha */}
              <td colSpan="2"></td>
            </tr>

            {/* Nova Linha 2: Telefone de celular */}
            <tr>
              <td className="label-cell">
                <label className="required-field">Telefone de celular</label>
              </td>
              <td>
                <span className="display-value">{userData.telefone}</span>
              </td>
              {/* Adiciona uma célula vazia para manter o layout de 4 colunas na linha */}
              <td colSpan="2"></td>
            </tr>

            {/* Linha 3 (antiga Linha 2): E-mail */}
            <tr>
              <td className="label-cell">
                <label className="required-field">E-mail</label>
              </td>
              <td colSpan="3"> {/* Mantém colSpan="3" para ocupar o restante da linha */}
                <span className="display-value">{userData.email}</span>
              </td>
            </tr>

            {/* Linha 4 (antiga Linha 3): Endereço */}
            <tr>
              <td className="label-cell">
                <label className="required-field">Endereço</label>
              </td>
              <td colSpan="3"> {/* Mantém colSpan="3" para ocupar o restante da linha */}
                <span className="display-value">{userData.endereco}</span>
              </td>
            </tr>

            {/* Linha 5 (antiga Linha 4): Data de nascimento e CPF */}
            <tr>
              {/* Esta célula não está mais sob a foto, então não precisa de rowSpan */}
              <td className="label-cell">
                <label className="required-field">Data de nascimento</label>
              </td>
              <td>
                <span className="display-value">{userData.dataNascimento}</span>
              </td>
              <td className="label-cell">
                <label>CPF (Opcional)</label>
              </td>
              <td>
                <span className="display-value">{userData.cpf}</span>
              </td>
            </tr>
          </tbody>
        </table>

        {/* Botão de ação - Editar Dados */}
        <div className="form-actions">
          <Link to="/EdicaoUsuario" className="edit-button"> {/* Use Link para navegar */}
            Editar Dados
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PerfilUsuario;