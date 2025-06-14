import React, { useState } from 'react';
import './EdicaoDados.css';
import { Link } from 'react-router-dom';
import Header from '../../components/header/Header.jsx';
import Footer from '../../components/footer/Footer.jsx';


function App() {

  const [restaurantData, setRestaurantData] = useState({
    nome: '',
    desc: '',
    foto: null,
    cep: '',
    logradouro: '',
    numero: '',
    complemento: '',
    bairro: '',
    cidade: '',
    razaoSocial: '',
  });


  const [cidadeOptions, setCidadeOptions] = useState([]);


  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'foto' && files && files[0]) {

      setRestaurantData((prevData) => ({
        ...prevData,
        [name]: URL.createObjectURL(files[0]),
      }));
    } else {

      setRestaurantData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log('Dados a serem salvos:', restaurantData);

  };

  return (
    <>
      <Header toggleAddressModal={() => { }} />

      <div className="app-container">
        <div className="form-wrapper">

          <div className="headerED">
            <Link to="/RestaurantePerfil">
              <button className="back-button"> Voltar</button>
            </Link>

            <h1 className="page-title">Informações</h1>
          </div>


          <form onSubmit={handleSubmit} className="restaurant-form">
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

            <section className="form-section">
              <h2 className="section-title">Endereço</h2>
              <div className="form-grid-2-cols">
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

                <div className="form-group">
                  <label htmlFor="bairro" className="form-label">
                    Bairro *
                  </label>
                  <input
                    type="text"
                    id="bairro"
                    name="bairro"
                    value={restaurantData.bairro}
                    onChange={handleChange}
                    required
                    className="form-input"
                  />
                </div>


                <div className="form-group">
                  <label htmlFor="cidade" className="form-label">
                    Cidade *
                  </label>
                  <select
                    id="cidade"
                    name="cidade"
                    value={restaurantData.cidade}
                    onChange={handleChange}
                    required
                    className="form-select"
                  >
                    <option value="">Selecione a Cidade</option>
                    {cidadeOptions.map((cidade, index) => (
                      <option key={cidade.id || index} value={cidade.nome}>
                        {cidade.nome}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </section>

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
