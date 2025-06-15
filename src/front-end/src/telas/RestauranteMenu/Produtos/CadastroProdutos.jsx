import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './CadastroProdutos.css';
import Footer from '../../../components/footer/Footer';
import Header from '../../../components/header/Header';
import ModalErro from '../../../components/modal_erro/ModalErro.jsx'; // ajuste o caminho se necessário

const CadastroProdutos = () => {
  const [produto, setProduto] = useState({
    foto: null,
    fotoPreview: null,
    nome: '',
    preco: '',
    categoria: '',
    descricao: ''
  });

  const [mensagemModal, setMensagemModal] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProduto(prev => ({ ...prev, foto: file }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setProduto(prev => ({ ...prev, fotoPreview: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduto(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const produtoDto = {
      nome: produto.nome,
      descricao: produto.descricao,
      preco: parseFloat(produto.preco),
      categoriaId: parseInt(produto.categoria),
      restauranteId: 1
    };

    const formData = new FormData();
    formData.append("produto", JSON.stringify(produtoDto));
    if (produto.foto) {
      formData.append("arquivo", produto.foto);
    }

    try {
      const response = await fetch("http://localhost:3001/api/v1/produtos/register", {
        method: "POST",
        body: formData,
        credentials: 'include'
      });

      const responseData = await response.json();

      if (!response.ok) {
        const mensagemErro = responseData.erro || "Erro inesperado ao cadastrar produto.";
        setMensagemModal(mensagemErro);
        return;
      }

      setMensagemModal("Produto cadastrado com sucesso!");

    } catch (error) {
      console.error("Erro de rede ou inesperado:", error);
      setMensagemModal("Erro ao conectar com o servidor.");
    }
  };

  const fecharModal = () => {
    const sucesso = mensagemModal === "Produto cadastrado com sucesso!";
    setMensagemModal(null);

    if (sucesso) {
      window.location.reload();
    }
  };

  return (
    <>
      <Header />
      <main>
        <section className="section-cadastro-produtos">
          <div className="cadastro-container">
            <div className="header-cadastro-de-produto">
              <h1>Cadastrar Novo Produto</h1>
              <Link to="/RestaurantePerfil" className="btn-voltar-perfil">
                &larr; Voltar ao Perfil
              </Link>
            </div>

            <form onSubmit={handleSubmit} className="produto-form">
              <div className="form-row">
                <div className="photo-column">
                  <label>Foto do Prato (obrigatória)</label>
                  <label htmlFor="foto-produto" className="foto-upload">
                    {produto.fotoPreview ? (
                      <img src={produto.fotoPreview} alt="Preview do Prato" className="foto-preview" />
                    ) : (
                      <span className="plus-icon">+</span>
                    )}
                  </label>
                  <input
                    id="foto-produto"
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    style={{ display: 'none' }}
                    required
                  />
                </div>

                <div className="fields-column">
                  <div className="form-group">
                    <label htmlFor="nome" className="required-field">Nome do prato</label>
                    <input
                      type="text"
                      id="nome"
                      name="nome"
                      value={produto.nome}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="preco" className="required-field">Preço</label>
                    <input
                      type="number"
                      step="0.01"
                      id="preco"
                      name="preco"
                      value={produto.preco}
                      onChange={handleChange}
                      placeholder="R$ 00,00"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="categoria" className="required-field">Categoria</label>
                    <select
                      id="categoria"
                      name="categoria"
                      value={produto.categoria}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Selecione a categoria</option>
                      <option value="1">Bebidas</option>
                      <option value="2">Alimentos</option>
                      <option value="3">Sobremesas</option>
                      <option value="4">Marmitas</option>
                      <option value="5">Vegetarianos</option>
                      <option value="6">Lanches</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="descricao">Descrição do prato (opcional)</label>
                <textarea
                  id="descricao"
                  name="descricao"
                  value={produto.descricao}
                  onChange={handleChange}
                  rows="4"
                  placeholder="Descreva seu prato, ingredientes, etc."
                />
              </div>

              <button type="submit" className="submit-button">
                Cadastrar Produto
              </button>
            </form>
          </div>
        </section>
      </main>
      <Footer />

      <ModalErro mensagem={mensagemModal} onClose={fecharModal} />
    </>
  );
};

export default CadastroProdutos;
