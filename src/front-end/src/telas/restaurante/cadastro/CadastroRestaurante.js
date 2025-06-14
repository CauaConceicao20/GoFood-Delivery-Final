import React, { useState, useEffect } from 'react'; // Importe useEffect aqui
import { Link } from 'react-router-dom';
import './CadastroRestaurante.css';
import Header from '../../../components/header/Header.jsx';
import Footer from '../../../components/footer/Footer.jsx';

const CadastroRestaurante = () => {
    const [formData, setFormData] = useState({
        // Informações do restaurante
        logo: null,
        nomeRestaurante: '',
        categoria: '',
        // Removido 'endereco' e adicionado os campos separados
        rua: '',
        numero: '',
        bairro: '',
        cidade: '', // Novo campo para a cidade
        telefoneCelular: '',
        telefoneFixo: '',
        horarioFuncionamento: '',
        descricao: '',

        // Informações da empresa
        razaoSocial: '',
        cnpj: '',
        inscricaoEstadual: '',
        nomeFantasia: '',

        // Responsável legal
        nomeResponsavel: '',
        cpfResponsavel: '',
        telefoneResponsavel: '',
        emailResponsavel: ''
    });

    const [cidades, setCidades] = useState([]); // Estado para armazenar as cidades

    // useEffect para buscar as cidades do backend
    useEffect(() => {
        const fetchCidades = async () => {
            try {
                // Simulação de chamada de API para obter cidades
                const response = await new Promise(resolve => setTimeout(() => {
                    resolve({
                        json: () => Promise.resolve([
                            { id: '1', nome: 'São Paulo' },
                            { id: '2', nome: 'Rio de Janeiro' },
                            { id: '3', nome: 'Belo Horizonte' },
                            { id: '4', nome: 'Salvador' }
                        ])
                    });
                }, 500)); // Simula um delay de rede de 0.5 segundos

                const data = await response.json();
                setCidades(data);
            } catch (error) {
                console.error("Erro ao buscar cidades:", error);
                // Opcional: Adicionar tratamento de erro na UI
            }
        };

        fetchCidades();
    }, []); // Array de dependências vazio para executar apenas uma vez

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        setFormData(prev => ({ ...prev, logo: e.target.files[0] }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Dados do cadastro:', formData);
        // Aqui você faria a chamada à API com os dados completos do formData
    };

    // Funções para formatar CNPJ e CPF
    const formatCNPJ = (value) => {
        return value
            .replace(/\D/g, '')
            .replace(/^(\d{2})(\d)/, '$1.$2')
            .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
            .replace(/\.(\d{3})(\d)/, '.$1/$2')
            .replace(/(\d{4})(\d)/, '$1-$2')
            .substring(0, 18);
    };

    const formatCPF = (value) => {
        return value
            .replace(/\D/g, '')
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d{1,2})$/, '$1-$2')
            .substring(0, 14);
    };

    const formatTelefone = (value) => {
        return value
            .replace(/\D/g, '')
            .replace(/(\d{2})(\d)/, '($1) $2')
            .replace(/(\d{5})(\d)/, '$1-$2')
            .substring(0, 15);
    };

    return (
        <>
            <Header toggleAddressModal={() => { }} />
            <main>
                <div className="cadastro-restaurante-container">
                    <h1>Cadastro de Restaurante</h1>

                    <form onSubmit={handleSubmit}>
                        <section className="form-section">
                            <h2>Informações do restaurante</h2>

                            <div className="form-grid">
                                <div className="form-group logo-upload">
                                    <label htmlFor="logo">Logotipo do restaurante</label>
                                    <input
                                        type="file"
                                        id="logo"
                                        name="logo"
                                        accept="image/*"
                                        onChange={handleFileChange}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="nomeRestaurante">Nome do restaurante *</label>
                                    <input
                                        type="text"
                                        id="nomeRestaurante"
                                        name="nomeRestaurante"
                                        value={formData.nomeRestaurante}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                {/* NOVOS CAMPOS DE ENDEREÇO */}
                                <div className="form-group">
                                    <label htmlFor="rua">Rua *</label>
                                    <input
                                        type="text"
                                        id="rua"
                                        name="rua"
                                        value={formData.rua}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="numero">Número *</label>
                                    <input
                                        type="text"
                                        id="numero"
                                        name="numero"
                                        value={formData.numero}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="bairro">Bairro *</label>
                                    <input
                                        type="text"
                                        id="bairro"
                                        name="bairro"
                                        value={formData.bairro}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="cidade">Cidade *</label>
                                    <select
                                        id="cidade"
                                        name="cidade"
                                        value={formData.cidade}
                                        onChange={handleChange}
                                        required
                                    >
                                        <option value="">Selecione uma cidade</option>
                                        {cidades.map(cidade => (
                                            <option key={cidade.id} value={cidade.nome}>
                                                {cidade.nome}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                {/* FIM DOS NOVOS CAMPOS DE ENDEREÇO */}

                                <div className="form-group">
                                    <label htmlFor="telefoneCelular">Telefone celular *</label>
                                    <input
                                        type="text"
                                        id="telefoneCelular"
                                        name="telefoneCelular"
                                        value={formatTelefone(formData.telefoneCelular)}
                                        onChange={(e) => {
                                            e.target.value = formatTelefone(e.target.value);
                                            handleChange(e);
                                        }}
                                        required
                                    />
                                </div>

                                <div className="form-group full-width">
                                    <label htmlFor="descricao">Descrição do restaurante</label>
                                    <textarea
                                        id="descricao"
                                        name="descricao"
                                        value={formData.descricao}
                                        onChange={handleChange}
                                        rows="4"
                                    />
                                </div>
                            </div>
                        </section>

                        <section className="form-section">
                            <h2>Informações da empresa</h2>

                            <div className="form-grid">
                                <div className="form-group">
                                    <label htmlFor="razaoSocial">Razão social *</label>
                                    <input
                                        type="text"
                                        id="razaoSocial"
                                        name="razaoSocial"
                                        value={formData.razaoSocial}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="cnpj">CNPJ ativo *</label>
                                    <input
                                        type="text"
                                        id="cnpj"
                                        name="cnpj"
                                        value={formatCNPJ(formData.cnpj)}
                                        onChange={(e) => {
                                            e.target.value = formatCNPJ(e.target.value);
                                            handleChange(e);
                                        }}
                                        required
                                    />
                                </div>


                            </div>
                        </section>



                        <button type="submit" className="submit-button">
                            Finalizar Cadastro
                        </button>
                    </form>
                </div>
            </main>
            <Footer />
        </>
    );
};

export default CadastroRestaurante;