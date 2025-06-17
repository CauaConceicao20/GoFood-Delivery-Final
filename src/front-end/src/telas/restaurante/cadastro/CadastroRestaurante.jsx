import React, { useState, useEffect } from 'react';
import './CadastroRestaurante.css';
import ModalErro from '../../../components/modal_erro/ModalErro.jsx';
import { useNavigate } from 'react-router-dom';
import Header from '../../../components/header/Header.jsx';
import Footer from '../../../components/footer/Footer.jsx';

const CadastroRestaurante = () => {
  const [restaurante, setRestaurante] = useState({
    foto: null,
    fotoPreview: null,
    nome: '',
    razaoSocial: '',
    cnpj: '',
    taxaFrete: '',
    cep: '',
    logradouro: '',
    numero: '',
    complemento: '',
    bairro: '',
    cidadeId: '',
    descricao: '',
    formasPagamento: []
  });

  const [formasPagamento, setFormasPagamento] = useState([]);
  const [cidades, setCidades] = useState([]);
  const [mensagemErro, setMensagemErro] = useState('');
  const [mostrarModal, setMostrarModal] = useState(false);
  const [sucessoCadastro, setSucessoCadastro] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchFormasPagamento() {
      try {
        const response = await fetch("http://localhost:3001/api/v1/metodos-pagamento/buscarTodos", {
          credentials: 'include'
        });
        if (response.status === 401) throw new Error("Sessão expirada. Faça login novamente.");
        if (response.ok) {
          const data = await response.json();
          setFormasPagamento(data);
        }
      } catch (err) {
        setMensagemErro(err.erro || "Erro ao buscar formas de pagamento");
        setMostrarModal(true);
      }
    }

    async function fetchCidades() {
      try {
        const response = await fetch("http://localhost:3001/api/v1/endereco/buscaTodasCidades", {
          credentials: 'include'
        });
        if (response.status === 401) throw new Error("Sessão expirada. Faça login novamente.");
        if (response.ok) {
          const data = await response.json();
          setCidades(data);
        }
      } catch (err) {
        setMensagemErro(err.erro || "Erro ao buscar cidades");
        setMostrarModal(true);
      }
    }

    fetchFormasPagamento();
    fetchCidades();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRestaurante(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setRestaurante(prev => ({ ...prev, foto: file }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setRestaurante(prev => ({ ...prev, fotoPreview: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFormasPagamentoChange = (e) => {
    const value = parseInt(e.target.value);
    setRestaurante(prev => {
      const jaSelecionado = prev.formasPagamento.includes(value);
      const novasFormas = jaSelecionado
        ? prev.formasPagamento.filter(id => id !== value)
        : [...prev.formasPagamento, value];
      return { ...prev, formasPagamento: novasFormas };
    });
  };

  const handleCloseModal = () => {
    setMostrarModal(false);
    if (sucessoCadastro) {
      navigate('/main_menu');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const restauranteDto = {
      nome: restaurante.nome,
      razaoSocial: restaurante.razaoSocial,
      cnpj: restaurante.cnpj,
      taxaFrete: parseFloat(restaurante.taxaFrete),
      descricao: restaurante.descricao,
      formasPagamento: restaurante.formasPagamento,
      cep: restaurante.cep,
      logradouro: restaurante.logradouro,
      numero: restaurante.numero,
      complemento: restaurante.complemento,
      bairro: restaurante.bairro,
      cidadeId: parseInt(restaurante.cidadeId)
    };

    const formData = new FormData();
    formData.append("restaurante", JSON.stringify(restauranteDto));
    if (restaurante.foto) {
      formData.append("arquivo", restaurante.foto);
    }

    try {
      const response = await fetch("http://localhost:3001/api/v1/restaurantes/registra", {
        method: "POST",
        body: formData,
        credentials: 'include'
      });

      if (response.status === 401) {
        throw new Error("Sessão expirada. Faça login novamente.");
      }

      if (!response.ok) {
        throw new Error("Erro ao cadastrar restaurante");
      }

      await fetch("http://localhost:3001/api/v1/auth/refresh-token", {
        method: "POST",
        credentials: "include"
      });

      setMensagemErro("Restaurante cadastrado com sucesso!");
      setSucessoCadastro(true);
      setMostrarModal(true);
    } catch (err) {
      console.error(err);
      setMensagemErro(err.erro || "Erro ao cadastrar restaurante");
      setSucessoCadastro(false);
      setMostrarModal(true);
    }
  };

  return (
    <>
      <Header />
      <main>
        <div className="cadastro-restaurante-container">
          <h1>Cadastro de Restaurante</h1>
          <form onSubmit={handleSubmit} className="form-section">
            <h2>Informações Gerais</h2>
            <div className="form-grid">
              <div className="photo-column">
                <label>Foto</label>
                <label className="foto-upload">
                  {restaurante.fotoPreview ? (
                    <img src={restaurante.fotoPreview} alt="Preview" className="foto-preview" />
                  ) : (
                    <span className="plus-icon">+</span>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    style={{ display: 'none' }}
                  />
                </label>
              </div>

              <div>
                <div className="form-group">
                  <label htmlFor="nome">Nome</label>
                  <input type="text" id="nome" name="nome" value={restaurante.nome} onChange={handleChange} required />
                </div>

                <div className="form-group">
                  <label htmlFor="razaoSocial">Razão Social</label>
                  <input type="text" id="razaoSocial" name="razaoSocial" value={restaurante.razaoSocial} onChange={handleChange} required />
                </div>

                <div className="form-group">
                  <label htmlFor="cnpj">CNPJ</label>
                  <input type="text" id="cnpj" name="cnpj" value={restaurante.cnpj} onChange={handleChange} required />
                </div>

                <div className="form-group">
                  <label htmlFor="taxaFrete">Taxa de Frete</label>
                  <input type="number" step="0.01" id="taxaFrete" name="taxaFrete" value={restaurante.taxaFrete} onChange={handleChange} required />
                </div>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="descricao">Descrição</label>
              <textarea id="descricao" name="descricao" value={restaurante.descricao} onChange={handleChange} />
            </div>

            <h2>Endereço</h2>
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="cep">CEP</label>
                <input type="text" id="cep" name="cep" value={restaurante.cep} onChange={handleChange} required />
              </div>

              <div className="form-group">
                <label htmlFor="logradouro">Logradouro</label>
                <input type="text" id="logradouro" name="logradouro" value={restaurante.logradouro} onChange={handleChange} required />
              </div>

              <div className="form-group">
                <label htmlFor="numero">Número</label>
                <input type="text" id="numero" name="numero" value={restaurante.numero} onChange={handleChange} required />
              </div>

              <div className="form-group">
                <label htmlFor="complemento">Complemento</label>
                <input type="text" id="complemento" name="complemento" value={restaurante.complemento} onChange={handleChange} />
              </div>

              <div className="form-group">
                <label htmlFor="bairro">Bairro</label>
                <input type="text" id="bairro" name="bairro" value={restaurante.bairro} onChange={handleChange} required />
              </div>

              <div className="form-group">
                <label htmlFor="cidadeId">Cidade</label>
                <select
                  id="cidadeId"
                  name="cidadeId"
                  value={restaurante.cidadeId}
                  onChange={handleChange}
                  required
                >
                  <option value="">Selecione uma cidade</option>
                  {cidades.map(cidade => (
                    <option key={cidade.id} value={cidade.id}>{cidade.nome}</option>
                  ))}
                </select>
              </div>
            </div>

            <h2>Formas de Pagamento</h2>
            <div className="form-group">
              <label htmlFor="formasPagamento">Selecione</label>
              <select id="formasPagamento" name="formasPagamento" onChange={handleFormasPagamentoChange}>
                <option value="">Adicionar forma de pagamento</option>
                {formasPagamento.map(fp => (
                  <option key={fp.id} value={fp.id}>{fp.nome}</option>
                ))}
              </select>
              <ul>
                {restaurante.formasPagamento.map(id => {
                  const forma = formasPagamento.find(fp => fp.id === id);
                  return (
                    <li key={id}>
                      {forma?.nome || `Forma ${id}`} <button type="button" onClick={() =>
                        setRestaurante(prev => ({
                          ...prev,
                          formasPagamento: prev.formasPagamento.filter(f => f !== id)
                        }))
                      }>Remover</button>
                    </li>
                  );
                })}
              </ul>
            </div>

            <button type="submit" className="submit-button">Cadastrar Restaurante</button>
          </form>

          {mostrarModal && (
            <ModalErro
              mensagem={mensagemErro}
              onClose={handleCloseModal}
            />
          )}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default CadastroRestaurante;
