import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import CardSection from '../../components/section_cards/SectionCards.jsx';
import styles from './VisualizarProduto.module.css';
import Header from '../../components/header/Header.jsx';
import Footer from '../../components/footer/Footer.jsx';
import ModalErro from '../../components/modal_erro/ModalErro.jsx';

const VisualizarProduto = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [produto, setProduto] = useState(null);
  const [mensagemModal, setMensagemModal] = useState('');

  useEffect(() => {
    const fetchProduto = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/v1/produtos/buscarProdutoPorId/${id}`, {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          }
        });

        if (!response.ok) throw new Error('Erro ao buscar o produto');
        const data = await response.json();
        setProduto(data);
      } catch (error) {
        console.error('Erro na requisição:', error);
      }
    };

    fetchProduto();
  }, [id]);

  const verificarAutenticacao = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/v1/auth/status', {
        credentials: 'include',
      });

      if (!response.ok) return false;
      const data = await response.json();
      return data.logado;
    } catch {
      return false;
    }
  };

  const adicionarAoCarrinho = async () => {
    const logado = await verificarAutenticacao();

    if (!logado) {
      setMensagemModal('Faça login para adicionar este produto ao seu carrinho');
      return;
    }

    try {
      const response = await fetch('http://localhost:3001/api/v1/carrinhos/adicionaAoCarrinho', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          produtoId: produto.id,
          quantidade: 1,
        }),
      });

      const resultado = await response.json();

      if (response.ok) {
        setMensagemModal(resultado.mensagem || 'Produto adicionado com sucesso.');
      } else {
        setMensagemModal(resultado.erro || 'Erro ao adicionar produto.');
      }
    } catch (err) {
      console.error('Erro inesperado:', err);
      setMensagemModal('Erro inesperado ao adicionar o produto ao carrinho.');
    }
  };

  if (!produto) return <p>Carregando produto...</p>;

  return (
    <div className={styles.pageContainer}>
      <Header />
      <main className={styles.container}>
        <section className={styles.sectionDeProdtuo}></section>

        <div className={styles.areaDoBtnVoltar}>
          <button
            className={styles.btnDeVoltar}
            onClick={() => navigate(-1)}
            aria-label="Voltar"
          >
            <i className="fas fa-arrow-left"></i>
          </button>
        </div>

        <section className={styles.produtoInfo}>
          <div className={styles.produtoAreaImg}>
            <img
              src={`http://localhost:3001${produto.fotoUrl}`}
              alt={produto.nome}
            />
          </div>

          <div className={styles.produtoDetalhes}>
            <h1>{produto.nome}</h1>

            <div className={styles.preco}>
              R$ {parseFloat(produto.preco).toFixed(2).replace('.', ',')}
            </div>

            <div className={styles.ratingDelivery}>
              <span className={styles.rating}>
                <i className="fas fa-star"></i> 4,6
                <span className={styles.reviews}>(197 avaliações)</span>
              </span>
              <span className={styles.deliveryInfo}>Padrão 35-45 min</span>
            </div>

            <p className={styles.descricao}>
              {produto.descricao}
            </p>

            <div className={styles.dadosRestaurante}>
              <span className={styles.cardImgRestaurante}>
                <img
                  src={`http://localhost:3001${produto.logoRestaurante}`}
                  alt={`Logo do restaurante ${produto.restaurante.nome}`}
                />
              </span>
              <span>{produto.restaurante.nome}</span>
            </div>

             <div className={styles.areaDoBtn}>
                <button
                  className={styles.btnFazerPedido}
                  onClick={adicionarAoCarrinho}
                >
                  Adicionar ao Carrinho
                </button>
            </div>
          </div>
        </section>

        <section className={styles.outrosProdutos}>
          <h1 className={styles.tituloSectionOutrosProdutos}>Outros Produtos</h1>
          <CardSection />
        </section>
      </main>

      <Footer />
      <ModalErro mensagem={mensagemModal} onClose={() => setMensagemModal('')} />
    </div>
  );
};

export default VisualizarProduto;
