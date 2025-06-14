import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './EdicaoUsuario.css'; 
import Header from '../../components/header/Header.jsx';
import Footer from '../../components/footer/Footer.jsx';


const EdicaoUsuario = () => {
  const [userData, setUserData] = useState({
    foto: null,
    nomeCompleto: 'João da Silva',
    telefone: '(11) 98765-4321', 
    email: 'joao.silva@example.com',
    endereco: 'Rua Exemplo, 123 - Centro, São Paulo',
    dataNascimento: '01/01/1990',
    cpf: '123.456.789-00' 
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
    <>
    <Header toggleAddressModal={() => { }} />
    <main className="edit-profile-container">

      <div>
        <Link to="/perfil" className="back-buton">
          &larr; Voltar ao Perfil
        </Link>
        <h1>Editar Perfil do Usuário</h1>
      </div>

      <form onSubmit={handleSubmit} className="edit-profile-form">
        <table className="edit-profile-table">
          <tbody>

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

              <td colSpan="2"></td> 
            </tr>


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
                  maxLength="15" 
                  required
                />
              </td>
              <td colSpan="2"></td> 
            </tr>


            <tr>
              <td className="label-cell">
                <label htmlFor="email" className="required-field">E-mail</label>
              </td>
              <td colSpan="3"> 
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


            <tr>
              <td className="label-cell">
                <label htmlFor="endereco" className="required-field">Endereço</label>
              </td>
              <td colSpan="3"> 
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

            <tr>
              
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
    </main>
     <Footer />
    </>
  );
};

export default EdicaoUsuario;
