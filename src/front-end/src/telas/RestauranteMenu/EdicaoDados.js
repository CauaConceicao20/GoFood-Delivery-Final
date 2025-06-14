import React, { useState, useEffect } from 'react'; // Certifique-se de importar useEffect
import { Link } from 'react-router-dom';
import './EdicaoDados.css';
import Header from '../../components/header/Header.jsx';
import Footer from '../../components/footer/Footer.jsx';


function EdicaoDados() { // Renomeado App para EdicaoDados para melhor clareza

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

    // useEffect para buscar as cidades do backend
    useEffect(() => {
        const fetchCidades = async () => {
            try {
                // Simulação de chamada de API para obter cidades
                // Substitua esta URL pela sua rota real do backend
                const response = await new Promise(resolve => setTimeout(() => {
                    resolve({
                        json: () => Promise.resolve([
                            { id: '1', nome: 'Salvador' },
                            { id: '2', nome: 'Feira de Santana' },
                            { id: '3', nome: 'Vitória da Conquista' },
                            { id: '4', nome: 'Camaçari' }
                        ])
                    });
                }, 500)); // Simula um delay de rede de 0.5 segundos

                const data = await response.json();
                setCidadeOptions(data); // Popula o estado com as cidades
            } catch (error) {
                console.error("Erro ao buscar cidades:", error);
                // Opcional: Adicionar tratamento de erro na UI
            }
        };

        fetchCidades();
    }, []); // Array de dependências vazio para executar apenas uma vez


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
                            {/* Ajuste do className para o botão de voltar */}
                            <button className="EDR-back-button"> Voltar</button>
                        </Link>

                        {/* Ajuste do className para o título da página */}
                        <h1 className="EDR-page-title">Informações</h1>
                    </div>


                    {/* Ajuste do className para o formulário principal */}
                    <form onSubmit={handleSubmit} className="EDR-restaurant-form">
                        {/* Ajuste do className para a seção do formulário */}
                        <section className="EDR-form-section">
                            {/* Ajuste do className para o título da seção */}
                            <h2 className="EDR-section-title">Informações do Restaurante</h2>
                            {/* Ajuste do className para o grid de 2 colunas */}
                            <div className="EDR-form-grid-2-cols">
                                {/* Upload de Foto */}
                                <div className="EDR-photo-upload-group">
                                    <input
                                        type="file"
                                        id="foto"
                                        name="foto"
                                        accept="image/*"
                                        onChange={handleChange}
                                        className="EDR-photo-input" // Ajuste do className
                                    />
                                    {restaurantData.foto ? (
                                        <img src={restaurantData.foto} alt="Pré-visualização da foto" className="EDR-photo-preview" /> // Ajuste do className
                                    ) : (
                                        <>
                                            <span className="EDR-plus-icon">+</span> {/* Ajuste do className */}
                                            <label htmlFor="foto" className="EDR-photo-label"> {/* Ajuste do className */}
                                                Logotipo do restaurante
                                            </label>
                                        </>
                                    )}
                                </div>

                                <div className="EDR-form-group"> {/* Ajuste do className */}
                                    <label htmlFor="nome" className="EDR-form-label"> {/* Ajuste do className */}
                                        Nome do Restaurante *
                                    </label>
                                    <input
                                        type="text"
                                        id="nome"
                                        name="nome"
                                        value={restaurantData.nome}
                                        onChange={handleChange}
                                        required
                                        className="EDR-form-input" // Ajuste do className
                                    />
                                </div>

                                <div className="EDR-form-group EDR-full-width"> {/* Ajuste do className */}
                                    <label htmlFor="desc" className="EDR-form-label"> {/* Ajuste do className */}
                                        Faça uma breve descrição do seu restaurante
                                    </label>
                                    <textarea
                                        id="desc"
                                        name="desc"
                                        value={restaurantData.desc}
                                        onChange={handleChange}
                                        rows="4"
                                        className="EDR-form-textarea" // Ajuste do className
                                    ></textarea>
                                </div>
                            </div>
                        </section>

                        <section className="EDR-form-section"> {/* Ajuste do className */}
                            <h2 className="EDR-section-title">Endereço</h2> {/* Ajuste do className */}
                            <div className="EDR-form-grid-2-cols"> {/* Ajuste do className */}
                                <div className="EDR-form-group"> {/* Ajuste do className */}
                                    <label htmlFor="cep" className="EDR-form-label"> {/* Ajuste do className */}
                                        CEP *
                                    </label>
                                    <input
                                        type="text"
                                        id="cep"
                                        name="cep"
                                        value={restaurantData.cep}
                                        onChange={handleChange}
                                        required
                                        className="EDR-form-input" // Ajuste do className
                                        placeholder="Ex: 00000-000"
                                    />
                                </div>

                                <div className="EDR-form-group"> {/* Ajuste do className */}
                                    <label htmlFor="logradouro" className="EDR-form-label"> {/* Ajuste do className */}
                                        Logradouro *
                                    </label>
                                    <input
                                        type="text"
                                        id="logradouro"
                                        name="logradouro"
                                        value={restaurantData.logradouro}
                                        onChange={handleChange}
                                        required
                                        className="EDR-form-input" // Ajuste do className
                                    />
                                </div>

                                <div className="EDR-form-group"> {/* Ajuste do className */}
                                    <label htmlFor="numero" className="EDR-form-label"> {/* Ajuste do className */}
                                        Número *
                                    </label>
                                    <input
                                        type="text"
                                        id="numero"
                                        name="numero"
                                        value={restaurantData.numero}
                                        onChange={handleChange}
                                        required
                                        className="EDR-form-input" // Ajuste do className
                                    />
                                </div>

                                <div className="EDR-form-group"> {/* Ajuste do className */}
                                    <label htmlFor="complemento" className="EDR-form-label"> {/* Ajuste do className */}
                                        Complemento
                                    </label>
                                    <input
                                        type="text"
                                        id="complemento"
                                        name="complemento"
                                        value={restaurantData.complemento}
                                        onChange={handleChange}
                                        className="EDR-form-input" // Ajuste do className
                                    />
                                </div>

                                <div className="EDR-form-group"> {/* Ajuste do className */}
                                    <label htmlFor="bairro" className="EDR-form-label"> {/* Ajuste do className */}
                                        Bairro *
                                    </label>
                                    <input
                                        type="text"
                                        id="bairro"
                                        name="bairro"
                                        value={restaurantData.bairro}
                                        onChange={handleChange}
                                        required
                                        className="EDR-form-input" // Ajuste do className
                                    />
                                </div>


                                <div className="EDR-form-group"> {/* Ajuste do className */}
                                    <label htmlFor="cidade" className="EDR-form-label"> {/* Ajuste do className */}
                                        Cidade *
                                    </label>
                                    <select
                                        id="cidade"
                                        name="cidade"
                                        value={restaurantData.cidade}
                                        onChange={handleChange}
                                        required
                                        className="EDR-form-select" // Ajuste do className
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

                        <section className="EDR-form-section"> {/* Ajuste do className */}
                            <h2 className="EDR-section-title">Informações da Empresa</h2> {/* Ajuste do className */}
                            <div className="EDR-form-group"> {/* Ajuste do className */}
                                <label htmlFor="razaoSocial" className="EDR-form-label"> {/* Ajuste do className */}
                                    Razão Social *
                                </label>
                                <input
                                    type="text"
                                    id="razaoSocial"
                                    name="razaoSocial"
                                    value={restaurantData.razaoSocial}
                                    onChange={handleChange}
                                    required
                                    className="EDR-form-input" // Ajuste do className
                                />
                            </div>
                        </section>

                        {/* Ajuste do className para o botão de submissão */}
                        <button
                            type="submit"
                            className="EDR-submit-button"
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

export default EdicaoDados; // Exportando como EdicaoDados