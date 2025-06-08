import React, { useState } from 'react';
import './EdicaoDados.css';
import { Link } from 'react-router-dom';

function EdicaoDados() {
  const [restaurantData, setRestaurantData] = useState({
    // Informações do restaurante
    restaurantName: '',
    fullAddress: '',
    openingHours: '',
    category: '',
    mobilePhone: '',
    landlinePhone: '',
    description: '',

    // Informações da empresa
    corporateName: '',
    activeCNPJ: '',
    stateRegistration: '',
    fantasyName: '',

    // Responsável legal
    fullNameLegal: '',
    cpf: '',
    mobilePhoneLegal: '',
    emailLegal: '',
  });

  // Novo estado para controlar a visibilidade do pop-up de confirmação
  const [showDeactivationConfirm, setShowDeactivationConfirm] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRestaurantData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Dados do restaurante a serem salvos:', restaurantData);
    // Aqui você normalmente enviaria os dados para uma API de backend
    alert('Dados salvos com sucesso (simulado)!');
  };

  // Função para abrir o pop-up de confirmação de desativação
  const handleDeactivateClick = () => {
    setShowDeactivationConfirm(true);
  };

  // Função para confirmar a desativação
  const handleConfirmDeactivation = () => {
    console.log('Restaurante desativado (simulado)!');
    alert('Restaurante desativado com sucesso!'); // Simula a desativação
    setShowDeactivationConfirm(false); // Fecha o pop-up
    // Aqui você enviaria a requisição para desativar o restaurante no backend
  };

  // Função para cancelar a desativação
  const handleCancelDeactivation = () => {
    setShowDeactivationConfirm(false); // Fecha o pop-up
  };

  return (
    <div className="app-container">
      <div className="header">
        <Link to="/RestaurantePerfil" className="back-arrow">Voltar</Link> 
        <h1>Requisições</h1>
      </div>

      <form onSubmit={handleSubmit} className="restaurant-form">
        {/* Informações do restaurante */}
        <section className="form-section">
          <h2>Informações do restaurante</h2>
          <div className="form-row">
            <div className="form-group logo-upload">
              <label>Logotipo do restaurante</label>
              <div className="logo-placeholder">
                <span className="plus-icon">+</span>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="restaurantName">Nome do restaurante *</label>
              <input
                type="text"
                id="restaurantName"
                name="restaurantName"
                value={restaurantData.restaurantName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="category">
                Categoria (ex: hamburgueria, pizzaria, etc.) *
              </label>
              <input
                type="text"
                id="category"
                name="category"
                value={restaurantData.category}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="fullAddress">Endereço completo *</label>
              <input
                type="text"
                id="fullAddress"
                name="fullAddress"
                value={restaurantData.fullAddress}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="mobilePhone">Telefone de celular *</label>
              <input
                type="tel"
                id="mobilePhone"
                name="mobilePhone"
                value={restaurantData.mobilePhone}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="openingHours">Horário de funcionamento *</label>
              <input
                type="text"
                id="openingHours"
                name="openingHours"
                value={restaurantData.openingHours}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="landlinePhone">Telefone de fixo (opcional)</label>
              <input
                type="tel"
                id="landlinePhone"
                name="landlinePhone"
                value={restaurantData.landlinePhone}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="form-group full-width">
            <label htmlFor="description">Faça uma breve descrição do seu restaurante</label>
            <textarea
              id="description"
              name="description"
              value={restaurantData.description}
              onChange={handleChange}
              rows="4"
            ></textarea>
          </div>
        </section>

        {/* Informações da empresa */}
        <section className="form-section">
          <h2>Informações da empresa</h2>
          <div className="form-group">
            <label htmlFor="corporateName">Razão social *</label>
            <input
              type="text"
              id="corporateName"
              name="corporateName"
              value={restaurantData.corporateName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="activeCNPJ">CNPJ ativo *</label>
            <input
              type="text"
              id="activeCNPJ"
              name="activeCNPJ"
              value={restaurantData.activeCNPJ}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="stateRegistration">Inscrição estadual (se aplicável) *</label>
            <input
              type="text"
              id="stateRegistration"
              name="stateRegistration"
              value={restaurantData.stateRegistration}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="fantasyName">Nome fantasia *</label>
            <input
              type="text"
              id="fantasyName"
              name="fantasyName"
              value={restaurantData.fantasyName}
              onChange={handleChange}
              required
            />
          </div>
        </section>

        {/* Responsável legal */}
        <section className="form-section">
          <h2>Responsável legal</h2>
          <div className="form-group">
            <label htmlFor="fullNameLegal">Nome completo *</label>
            <input
              type="text"
              id="fullNameLegal"
              name="fullNameLegal"
              value={restaurantData.fullNameLegal}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="cpf">CPF *</label>
            <input
              type="text"
              id="cpf"
              name="cpf"
              value={restaurantData.cpf}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="mobilePhoneLegal">Telefone celular *</label>
            <input
              type="tel"
              id="mobilePhoneLegal"
              name="mobilePhoneLegal"
              value={restaurantData.mobilePhoneLegal}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="emailLegal">E-mail válido *</label>
            <input
              type="email"
              id="emailLegal"
              name="emailLegal"
              value={restaurantData.emailLegal}
              onChange={handleChange}
              required
            />
          </div>
        </section>

        <button type="submit" className="submit-button">
          Finalizar Cadastro
        </button>

        {/* Novo botão "Desativar Restaurante" */}
        <button
          type="button" // Use type="button" para evitar submeter o formulário
          className="deactivate-button"
          onClick={handleDeactivateClick}
        >
          Desativar Restaurante
        </button>
      </form>

      {/* Pop-up de Confirmação */}
      {showDeactivationConfirm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Confirmar Desativação</h3>
            <p>Tem certeza que deseja desativar o restaurante?</p>
            <div className="modal-actions">
              <button onClick={handleConfirmDeactivation} className="confirm-button">
                Sim
              </button>
              <button onClick={handleCancelDeactivation} className="cancel-button">
                Não
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default EdicaoDados;