import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import './EdicaoDados.css';
import Header from '../../components/header/Header.jsx';
import Footer from '../../components/footer/Footer.jsx';
import ModalErro from '../../components/modal_erro/ModalErro.jsx';

function EdicaoDados() {
    const { id } = useParams();
    const navigate = useNavigate();

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
    const [mensagemModal, setMensagemModal] = useState('');
    const [ehSucesso, setEhSucesso] = useState(false);

    useEffect(() => {
        async function fetchCidades() {
            try {
                const response = await fetch("http://localhost:3001/api/v1/endereco/buscaTodasCidades", {
                    credentials: 'include'
                });
                if (response.status === 401) throw new Error("Sessão expirada. Faça login novamente.");
                if (!response.ok) throw new Error("Erro ao buscar cidades.");
                const data = await response.json();
                setCidadeOptions(data);
            } catch (err) {
                setMensagemModal(err.message || "Erro ao buscar cidades.");
                setEhSucesso(false);
            }
        }

        fetchCidades();
    }, []);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'foto' && files && files[0]) {
            setRestaurantData((prevData) => ({
                ...prevData,
                [name]: files[0],
                fotoPreview: URL.createObjectURL(files[0]),
            }));
        } else {
            setRestaurantData((prevData) => ({
                ...prevData,
                [name]: value,
            }));
        }
    };

    const validarFormulario = () => {
        if (restaurantData.nome && !restaurantData.nome.trim()) {
            return "Nome é obrigatório, se preenchido, não pode ser vazio.";
        }

        if (restaurantData.razaoSocial && !restaurantData.razaoSocial.trim()) {
            return "Razão social é obrigatória, se preenchida, não pode ser vazia.";
        }

        if (restaurantData.cep && !/^\d{5}-?\d{3}$/.test(restaurantData.cep)) {
            return "CEP inválido. Use o formato 00000-000 ou 00000000.";
        }

        if (restaurantData.logradouro && !restaurantData.logradouro.trim()) {
            return "Logradouro é obrigatório, se preenchido, não pode ser vazio.";
        }

        if (restaurantData.numero && !restaurantData.numero.trim()) {
            return "Número é obrigatório, se preenchido, não pode ser vazio.";
        }

        if (restaurantData.bairro && !restaurantData.bairro.trim()) {
            return "Bairro é obrigatório, se preenchido, não pode ser vazio.";
        }

        if (restaurantData.cidade && restaurantData.cidade === "") {
            return "Selecione uma cidade válida.";
        }

        return null;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const erro = validarFormulario();
        if (erro) {
            setMensagemModal(erro);
            setEhSucesso(false);
            return;
        }

        try {
            const formData = new FormData();
            const restaurantePayload = {
                nome: restaurantData.nome,
                descricao: restaurantData.desc,
                razaoSocial: restaurantData.razaoSocial,
                cep: restaurantData.cep,
                logradouro: restaurantData.logradouro,
                numero: restaurantData.numero,
                complemento: restaurantData.complemento,
                bairro: restaurantData.bairro,
                cidadeId: restaurantData.cidade
            };

            formData.append('restaurante', JSON.stringify(restaurantePayload));
            if (restaurantData.foto) {
                formData.append('arquivo', restaurantData.foto);
            }

            const response = await fetch(`http://localhost:3001/api/v1/restaurantes/atualizaRestaurante/${id}`, {
                method: 'PUT',
                body: formData,
                credentials: 'include',
            });

            if (!response.ok) throw new Error("Erro ao atualizar restaurante");

            const data = await response.json();
            setMensagemModal("Restaurante atualizado com sucesso!");
            setEhSucesso(true);
        } catch (err) {
            setMensagemModal(err.message || "Erro ao atualizar restaurante.");
            setEhSucesso(false);
        }
    };

    const fecharModal = () => {
        setMensagemModal('');
        if (ehSucesso) {
            navigate(`/RestaurantePerfil/${id}`);
        }
    };

    return (
        <>
            <Header toggleAddressModal={() => { }} />
            <div className="EDR-app-container">
                <div className="EDR-form-wrapper">
                    <div className="EDR-headerED">
                        <Link to={`/RestaurantePerfil/${id}`}>
                            <button className="EDR-back-button">Voltar</button>
                        </Link>
                        <h1 className="EDR-page-title">Informações</h1>
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
                                    {restaurantData.fotoPreview ? (
                                        <img src={restaurantData.fotoPreview} alt="Pré-visualização" className="EDR-photo-preview" />
                                    ) : (
                                        <>
                                            <span className="EDR-plus-icon">+</span>
                                            <label htmlFor="foto" className="EDR-photo-label">Logotipo do restaurante</label>
                                        </>
                                    )}
                                </div>

                                <div className="EDR-form-group">
                                    <label htmlFor="nome" className="EDR-form-label">Nome do Restaurante *</label>
                                    <input
                                        type="text"
                                        id="nome"
                                        name="nome"
                                        value={restaurantData.nome}
                                        onChange={handleChange}
                                        className="EDR-form-input"
                                    />
                                </div>

                                <div className="EDR-form-group EDR-full-width">
                                    <label htmlFor="desc" className="EDR-form-label">Descrição</label>
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
                                    <label htmlFor="cep" className="EDR-form-label">CEP *</label>
                                    <input
                                        type="text"
                                        id="cep"
                                        name="cep"
                                        value={restaurantData.cep}
                                        onChange={handleChange}
                                        className="EDR-form-input"
                                    />
                                </div>

                                <div className="EDR-form-group">
                                    <label htmlFor="logradouro" className="EDR-form-label">Logradouro *</label>
                                    <input
                                        type="text"
                                        id="logradouro"
                                        name="logradouro"
                                        value={restaurantData.logradouro}
                                        onChange={handleChange}
                                        className="EDR-form-input"
                                    />
                                </div>

                                <div className="EDR-form-group">
                                    <label htmlFor="numero" className="EDR-form-label">Número *</label>
                                    <input
                                        type="text"
                                        id="numero"
                                        name="numero"
                                        value={restaurantData.numero}
                                        onChange={handleChange}
                                        className="EDR-form-input"
                                    />
                                </div>

                                <div className="EDR-form-group">
                                    <label htmlFor="complemento" className="EDR-form-label">Complemento</label>
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
                                    <label htmlFor="bairro" className="EDR-form-label">Bairro *</label>
                                    <input
                                        type="text"
                                        id="bairro"
                                        name="bairro"
                                        value={restaurantData.bairro}
                                        onChange={handleChange}
                                        className="EDR-form-input"
                                    />
                                </div>

                                <div className="EDR-form-group">
                                    <label htmlFor="cidade" className="EDR-form-label">Cidade *</label>
                                    <select
                                        id="cidade"
                                        name="cidade"
                                        value={restaurantData.cidade}
                                        onChange={handleChange}
                                        className="EDR-form-select"
                                    >
                                        <option value="">Selecione a Cidade</option>
                                        {cidadeOptions.map((cidade) => (
                                            <option key={cidade.id} value={cidade.id}>
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
                                <label htmlFor="razaoSocial" className="EDR-form-label">Razão Social *</label>
                                <input
                                    type="text"
                                    id="razaoSocial"
                                    name="razaoSocial"
                                    value={restaurantData.razaoSocial}
                                    onChange={handleChange}
                                    className="EDR-form-input"
                                />
                            </div>
                        </section>

                        <button type="submit" className="EDR-submit-button">
                            Aplicar Alterações
                        </button>
                    </form>
                </div>
            </div>
            <Footer />
            <ModalErro mensagem={mensagemModal} onClose={fecharModal} />
        </>
    );
}

export default EdicaoDados;
