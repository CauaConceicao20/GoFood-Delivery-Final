import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './CadastroRestaurante.css';

const CadastroRestaurante = () => {
    const [formData, setFormData] = useState({
        // Informações do restaurante
        logo: null,
        nomeRestaurante: '',
        categoria: '',
        endereco: '',
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
        // Aqui você faria a chamada à API
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
        <div className="cadastro-restaurante-container">
            <h1>Cadastro de Restaurante</h1>

            <form onSubmit={handleSubmit}>
                <section className="form-section">
                    <h2>Informações do restaurante</h2>

                    <div className="form-grid">
                        <div className="form-group logo-upload">
                            <label>Logotipo do restaurante</label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                            />
                        </div>

                        <div className="form-group">
                            <label>Nome do restaurante *</label>
                            <input
                                type="text"
                                name="nomeRestaurante"
                                value={formData.nomeRestaurante}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Categoria *</label>
                            <input
                                type="text"
                                name="categoria"
                                value={formData.categoria}
                                onChange={handleChange}
                                placeholder="ex: hamburgueria, pizzaria, etc."
                                required
                            />
                        </div>

                        <div className="form-group full-width">
                            <label>Endereço completo *</label>
                            <input
                                type="text"
                                name="endereco"
                                value={formData.endereco}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Telefone celular *</label>
                            <input
                                type="text"
                                name="telefoneCelular"
                                value={formatTelefone(formData.telefoneCelular)}
                                onChange={(e) => {
                                    e.target.value = formatTelefone(e.target.value);
                                    handleChange(e);
                                }}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Horário de funcionamento *</label>
                            <input
                                type="text"
                                name="horarioFuncionamento"
                                value={formData.horarioFuncionamento}
                                onChange={handleChange}
                                placeholder="ex: 10:00 às 22:00"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Telefone fixo (opcional)</label>
                            <input
                                type="text"
                                name="telefoneFixo"
                                value={formatTelefone(formData.telefoneFixo)}
                                onChange={(e) => {
                                    e.target.value = formatTelefone(e.target.value);
                                    handleChange(e);
                                }}
                            />
                        </div>

                        <div className="form-group full-width">
                            <label>Descrição do restaurante</label>
                            <textarea
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
                            <label>Razão social *</label>
                            <input
                                type="text"
                                name="razaoSocial"
                                value={formData.razaoSocial}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>CNPJ ativo *</label>
                            <input
                                type="text"
                                name="cnpj"
                                value={formatCNPJ(formData.cnpj)}
                                onChange={(e) => {
                                    e.target.value = formatCNPJ(e.target.value);
                                    handleChange(e);
                                }}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Inscrição estadual (se aplicável)</label>
                            <input
                                type="text"
                                name="inscricaoEstadual"
                                value={formData.inscricaoEstadual}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="form-group">
                            <label>Nome fantasia *</label>
                            <input
                                type="text"
                                name="nomeFantasia"
                                value={formData.nomeFantasia}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>
                </section>

                <section className="form-section">
                    <h2>Responsável legal</h2>

                    <div className="form-grid">
                        <div className="form-group">
                            <label>Nome completo *</label>
                            <input
                                type="text"
                                name="nomeResponsavel"
                                value={formData.nomeResponsavel}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>CPF *</label>
                            <input
                                type="text"
                                name="cpfResponsavel"
                                value={formatCPF(formData.cpfResponsavel)}
                                onChange={(e) => {
                                    e.target.value = formatCPF(e.target.value);
                                    handleChange(e);
                                }}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Telefone celular *</label>
                            <input
                                type="text"
                                name="telefoneResponsavel"
                                value={formatTelefone(formData.telefoneResponsavel)}
                                onChange={(e) => {
                                    e.target.value = formatTelefone(e.target.value);
                                    handleChange(e);
                                }}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>E-mail válido *</label>
                            <input
                                type="email"
                                name="emailResponsavel"
                                value={formData.emailResponsavel}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>
                </section>

                <button type="submit" className="submit-button">
                    Finalizar Cadastro
                </button>
            </form>

            <div className="login-redirect">
                <p>Já tem cadastro? <Link to="/login/restaurante">Faça login</Link></p>
            </div>

        </div>
    );
};

export default CadastroRestaurante