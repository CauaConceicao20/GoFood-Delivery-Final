import React, { useState } from 'react';
import './EdicaoDados.css';
import { Link } from 'react-router-dom';
import Header from '../../components/header/Header.jsx';
import Footer from '../../components/footer/Footer.jsx';
// Não há necessidade de importar './EdicaoDados.css' aqui, será carregado no HTML ou de forma global

// Componente principal da aplicação
function App() {
  // Estado para armazenar os dados do restaurante
  const [restaurantData, setRestaurantData] = useState({
    nome: '', // Nome do restaurante
    desc: '', // Descrição
    foto: null, // URL da pré-visualização da foto
    cep: '', // CEP
    logradouro: '', // Logradouro
    numero: '', // Número
    complemento: '', // Complemento
    bairro: '', // Bairro (agora um select)
    cidade: '', // Cidade (agora um input de texto)
    razaoSocial: '', // Razão Social
  });

  // Array vazio para as opções do select de 'bairro', conforme solicitado
  const bairroOptions = [];

  // Lida com as mudanças nos campos de entrada
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'foto' && files && files[0]) {
      // Se for um input de arquivo, cria uma URL para pré-visualização
      setRestaurantData((prevData) => ({
        ...prevData,
        [name]: URL.createObjectURL(files[0]),
      }));
    } else {
      // Para outros inputs de texto e select
      setRestaurantData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  // Lida com o envio do formulário
  const handleSubmit = (e) => {
    e.preventDefault();
    // Exibe os dados no console (simulando um salvamento)
    console.log('Dados a serem salvos:', restaurantData);
    // Em uma aplicação real, você enviaria esses dados para um servidor.
  };

  return (
    <>
          <Header toggleAddressModal={() => { }} />

      <div className="app-container">
        <div className="form-wrapper">
          {/* Seção de Cabeçalho */}
          <div className="headerED">
            <Link to="/">
              <button className="back-button"> Voltar</button>
            </Link>

            <h1 className="page-title">Requisições</h1>
          </div>


          <form onSubmit={handleSubmit} className="restaurant-form">
            {/* Seção de Informações do Restaurante */}
            <section className="form-section">
              <h2 className="section-title">Informações do Restaurante</h2>
              <div className="form-grid-2-cols">
                {/* Upload de Foto */}
                <div className="photo-upload-group">
                  <input
                    type="file"
                    id="foto"
                    name="foto"
                    accept="image/*"
                    onChange={handleChange}
                    className="photo-input"
                  />
                  {restaurantData.foto ? (
                    <img src={restaurantData.foto} alt="Pré-visualização da foto" className="photo-preview" />
                  ) : (
                    <>
                      <span className="plus-icon">+</span>
                      <label htmlFor="foto" className="photo-label">
                        Logotipo do restaurante
                      </label>
                    </>
                  )}
                </div>

                {/* Nome do Restaurante */}
                <div className="form-group">
                  <label htmlFor="nome" className="form-label">
                    Nome do Restaurante *
                  </label>
                  <input
                    type="text"
                    id="nome"
                    name="nome"
                    value={restaurantData.nome}
                    onChange={handleChange}
                    required
                    className="form-input"
                  />
                </div>

                {/* Descrição do Restaurante */}
                <div className="form-group full-width">
                  <label htmlFor="desc" className="form-label">
                    Faça uma breve descrição do seu restaurante
                  </label>
                  <textarea
                    id="desc"
                    name="desc"
                    value={restaurantData.desc}
                    onChange={handleChange}
                    rows="4"
                    className="form-textarea"
                  ></textarea>
                </div>
              </div>
            </section>

            {/* Seção de Informações de Endereço */}
            <section className="form-section">
              <h2 className="section-title">Endereço</h2>
              <div className="form-grid-2-cols">
                {/* CEP */}
                <div className="form-group">
                  <label htmlFor="cep" className="form-label">
                    CEP *
                  </label>
                  <input
                    type="text"
                    id="cep"
                    name="cep"
                    value={restaurantData.cep}
                    onChange={handleChange}
                    required
                    className="form-input"
                    placeholder="Ex: 00000-000"
                  />
                </div>

                {/* Logradouro */}
                <div className="form-group">
                  <label htmlFor="logradouro" className="form-label">
                    Logradouro *
                  </label>
                  <input
                    type="text"
                    id="logradouro"
                    name="logradouro"
                    value={restaurantData.logradouro}
                    onChange={handleChange}
                    required
                    className="form-input"
                  />
                </div>

                {/* Número */}
                <div className="form-group">
                  <label htmlFor="numero" className="form-label">
                    Número *
                  </label>
                  <input
                    type="text"
                    id="numero"
                    name="numero"
                    value={restaurantData.numero}
                    onChange={handleChange}
                    required
                    className="form-input"
                  />
                </div>

                {/* Complemento */}
                <div className="form-group">
                  <label htmlFor="complemento" className="form-label">
                    Complemento
                  </label>
                  <input
                    type="text"
                    id="complemento"
                    name="complemento"
                    value={restaurantData.complemento}
                    onChange={handleChange}
                    className="form-input"
                  />
                </div>

                {/* Bairro (Select) - Agora sem opções pré-definidas */}
                <div className="form-group">
                  <label htmlFor="bairro" className="form-label">
                    Bairro *
                  </label>
                  <select
                    id="bairro"
                    name="bairro"
                    value={restaurantData.bairro}
                    onChange={handleChange}
                    required
                    className="form-select"
                  >
                    {/* Opção padrão para garantir que o select não esteja completamente vazio visualmente */}
                    <option value="">Selecione o Bairro</option>
                    {bairroOptions.map((option, index) => (
                      <option key={index} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Cidade (Input de Texto) */}
                <div className="form-group">
                  <label htmlFor="cidade" className="form-label">
                    Cidade *
                  </label>
                  <input
                    type="text"
                    id="cidade"
                    name="cidade"
                    value={restaurantData.cidade}
                    onChange={handleChange}
                    required
                    className="form-input"
                  />
                </div>
              </div>
            </section>

            {/* Seção de Informações da Empresa */}
            <section className="form-section">
              <h2 className="section-title">Informações da Empresa</h2>
              <div className="form-group">
                <label htmlFor="razaoSocial" className="form-label">
                  Razão Social *
                </label>
                <input
                  type="text"
                  id="razaoSocial"
                  name="razaoSocial"
                  value={restaurantData.razaoSocial}
                  onChange={handleChange}
                  required
                  className="form-input"
                />
              </div>
            </section>

            {/* Botão de Envio */}
            <button
              type="submit"
              className="submit-button"
            >
              Finalizar Cadastro
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default App;
