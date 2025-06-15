import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './CadastroRestaurante.css';
import Header from '../../../components/header/Header.jsx';
import Footer from '../../../components/footer/Footer.jsx';
import ModalErro from '../../../components/modal_erro/ModalErro.jsx';

const CadastroRestaurante = () => {
  const [formData, setFormData] = useState({
    nomeRestaurante: '',
    rua: '',
    numero: '',
    bairro: '',
    cidade: '', // agora será o ID da cidade
    descricao: '',
    razaoSocial: '',
    cnpj: ''
  });

  const [logo, setLogo] = useState(null);
  const [previewLogo, setPreviewLogo] = useState(null);
  const [erroMensagem, setErroMensagem] = useState('');
  const [cidades, setCidades] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/api/v1/endereco/buscaTodasCidades')
      .then(res => res.json())
      .then(data => setCidades(data))
      .catch(() => setErroMensagem('Erro ao carregar cidades.'));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setLogo(file);
      const reader = new FileReader();
      reader.onloadend = () => setPreviewLogo(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const formatCNPJ = (cnpj) => {
    return cnpj
      .replace(/\D/g, '')
      .replace(/^(\d{2})(\d)/, '$1.$2')
      .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
      .replace(/\.(\d{3})(\d)/, '.$1/$2')
      .replace(/(\d{4})(\d)/, '$1-$2');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const cidadeId = parseInt(formData.cidade);
    if (isNaN(cidadeId)) {
      setErroMensagem('Cidade inválida.');
      return;
    }

    const dto = {
      nome: formData.nomeRestaurante,
      razaoSocial: formData.razaoSocial,
      taxaFrete: 0,
      descricao: formData.descricao,
      cnpj: formData.cnpj,
      formasPagamento: [],
      endereco: {
        cep: '',
        logradouro: formData.rua,
        numero: formData.numero,
        complemento: '',
        bairro: formData.bairro,
        cidadeId: cidadeId
      }
    };

    const data = new FormData();
    data.append("restaurante", JSON.stringify(dto));
    if (logo) data.append("arquivo", logo);

    try {
      const res = await fetch("http://localhost:3001/api/v1/restaurantes/registra", {
        method: "POST",
        body: data,
        credentials: 'include'
      });

      const result = await res.json();

      if (!res.ok) {
        setErroMensagem(result.erro || 'Erro ao cadastrar restaurante.');
        return;
      }

      setErroMensagem('Restaurante cadastrado com sucesso!');
      setTimeout(() => window.location.reload(), 1500);

    } catch (err) {
      console.error(err);
      setErroMensagem('Erro de rede ou servidor indisponível.');
    }
  };

  return (
    <>
      <Header toggleAddressModal={() => { }} />
      <main>
        <div className="cadastro-restaurante-container">
          <h1>Cadastro de Restaurante</h1>

          <form onSubmit={handleSubmit} noValidate>
            <section className="form-section">
              <h2>Informações do restaurante</h2>

              <div className="form-grid">
                <div className="photo-column">
                  <label>Logotipo do restaurante (obrigatório)</label>
                  <label htmlFor="logo" className="foto-upload" tabIndex={0} onKeyPress={e => { if (e.key === 'Enter') document.getElementById('logo').click() }}>
                    {previewLogo ? (
                      <img src={previewLogo} alt="Preview do logotipo" className="foto-preview" />
                    ) : (
                      <span className="plus-icon">+</span>
                    )}
                  </label>
                  <input
                    id="logo"
                    type="file"
                    name="logo"
                    accept="image/*"
                    onChange={handleFileChange}
                    style={{ display: 'none' }}
                    required
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
                    {cidades.map((cidade) => (
                      <option key={cidade.id} value={cidade.id}>
                        {cidade.nome}
                      </option>
                    ))}
                  </select>
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
                    value={formData.cnpj}
                    onChange={(e) => {
                      e.target.value = formatCNPJ(e.target.value);
                      handleChange(e);
                    }}
                    maxLength={18}
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
      <ModalErro mensagem={erroMensagem} onClose={() => setErroMensagem('')} />
      <Footer />
    </>
  );
};

export default CadastroRestaurante;
