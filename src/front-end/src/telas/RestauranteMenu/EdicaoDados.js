import React, { useState, useEffect } from 'react'; 
import { Link } from 'react-router-dom';
import './EdicaoDados.css';
import Header from '../../components/header/Header.jsx';
import Footer from '../../components/footer/Footer.jsx';


function EdicaoDados() { 

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


    useEffect(() => {
        const fetchCidades = async () => {
            try {
              
                const response = await new Promise(resolve => setTimeout(() => {
                    resolve({
                        json: () => Promise.resolve([
                            { id: '1', nome: 'Salvador' },
                            { id: '2', nome: 'Feira de Santana' },
                            { id: '3', nome: 'Vitória da Conquista' },
                            { id: '4', nome: 'Camaçari' }
                        ])
                    });
                }, 500)); 

                const data = await response.json();
                setCidadeOptions(data); 
            } catch (error) {
                console.error("Erro ao buscar cidades:", error);
               
            }
        };

        fetchCidades();
    }, []); 

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

            <div className="EDR-app-container">
                <div className="EDR-form-wrapper">

                    <div className="EDR-headerED">
                        <Link to="/RestaurantePerfil">

                            <button className="EDR-back-button"> Voltar</button>
                        </Link>

                        <h1 className="EDR-page-title">Editar Informações</h1>
                    </div>



                    <form onSubmit={handleSubmit} className="EDR-restaurant-form">

                        <section className="EDR-form-section">

                            <h2 className="EDR-section-title">Informações do Restaurante</h2>
           
                            <div className="EDR-form-grid-2-cols">

                                <div className="EDR-photo-upload-group">
                                    <input
                                        type="file"
                                        id="foto"
                                        name="foto"
                                        accept="image/*"
                                        onChange={handleChange}
                                        className="EDR-photo-input" 
                                    />
                                    {restaurantData.foto ? (
                                        <img src={restaurantData.foto} alt="Pré-visualização da foto" className="EDR-photo-preview" /> // Ajuste do className
                                    ) : (
                                        <>
                                            <span className="EDR-plus-icon">+</span>
                                            <label htmlFor="foto" className="EDR-photo-label">
                                                Logotipo do restaurante
                                            </label>
                                        </>
                                    )}
                                </div>

                                <div className="EDR-form-group">
                                    <label htmlFor="nome" className="EDR-form-label"> 
                                    </label>
                                    <input
                                        type="text"
                                        id="nome"
                                        name="nome"
                                        value={restaurantData.nome}
                                        onChange={handleChange}
                                        required
                                        className="EDR-form-input" 
                                    />
                                </div>

                                <div className="EDR-form-group EDR-full-width"> 
                                    <label htmlFor="desc" className="EDR-form-label"> 
                                        Faça uma breve descrição do seu restaurante
                                    </label>
                                    <textarea
                                        id="desc"
                                        name="desc"
                                        value={restaurantData.desc}
                                        onChange={handleChange}
                                        rows="4"
                                        className="EDR-form-textarea" 
                                    ></textarea>
                                </div>
                            </div>
                        </section>

                        <section className="EDR-form-section"> 
                            <h2 className="EDR-section-title">Endereço</h2> 
                            <div className="EDR-form-grid-2-cols"> 
                                <div className="EDR-form-group">
                                    <label htmlFor="cep" className="EDR-form-label">
                                        CEP *
                                    </label>
                                    <input
                                        type="text"
                                        id="cep"
                                        name="cep"
                                        value={restaurantData.cep}
                                        onChange={handleChange}
                                        required
                                        className="EDR-form-input" 
                                        placeholder="Ex: 00000-000"
                                    />
                                </div>

                                <div className="EDR-form-group"> 
                                    <label htmlFor="logradouro" className="EDR-form-label"> 
                                        Logradouro *
                                    </label>
                                    <input
                                        type="text"
                                        id="logradouro"
                                        name="logradouro"
                                        value={restaurantData.logradouro}
                                        onChange={handleChange}
                                        required
                                        className="EDR-form-input" 
                                    />
                                </div>

                                <div className="EDR-form-group">
                                    <label htmlFor="numero" className="EDR-form-label"> 
                                        Número *
                                    </label>
                                    <input
                                        type="text"
                                        id="numero"
                                        name="numero"
                                        value={restaurantData.numero}
                                        onChange={handleChange}
                                        required
                                        className="EDR-form-input" 
                                    />
                                </div>

                                <div className="EDR-form-group">
                                    <label htmlFor="complemento" className="EDR-form-label"> 
                                        Complemento
                                    </label>
                                    <input
                                        type="text"
                                        id="complemento"
                                        name="complemento"
                                        value={restaurantData.complemento}
                                        onChange={handleChange}
                                        className="EDR-form-input" 
                                    />
                                </div>

                                <div className="EDR-form-group"> 
                                    <label htmlFor="bairro" className="EDR-form-label"> 
                                        Bairro *
                                    </label>
                                    <input
                                        type="text"
                                        id="bairro"
                                        name="bairro"
                                        value={restaurantData.bairro}
                                        onChange={handleChange}
                                        required
                                        className="EDR-form-input" 
                                    />
                                </div>


                                <div className="EDR-form-group"> 
                                    <label htmlFor="cidade" className="EDR-form-label"> 
                                        Cidade *
                                    </label>
                                    <select
                                        id="cidade"
                                        name="cidade"
                                        value={restaurantData.cidade}
                                        onChange={handleChange}
                                        required
                                        className="EDR-form-select"
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

                        <section className="EDR-form-section"> 
                            <h2 className="EDR-section-title">Informações da Empresa</h2> 
                            <div className="EDR-form-group"> 
                                <label htmlFor="razaoSocial" className="EDR-form-label"> 
                                    Razão Social *
                                </label>
                                <input
                                    type="text"
                                    id="razaoSocial"
                                    name="razaoSocial"
                                    value={restaurantData.razaoSocial}
                                    onChange={handleChange}
                                    required
                                    className="EDR-form-input" 
                                />
                            </div>
                        </section>


                        <button
                            type="submit"
                            className="EDR-submit-button"
                        >
                            Finalizar Edição
                        </button>
                    </form>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default EdicaoDados; // Exportando como EdicaoDados