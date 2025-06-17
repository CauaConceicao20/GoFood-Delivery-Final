import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '../../components/header/Header.jsx';
import Footer from '../../components/footer/Footer.jsx';
import styles from './RestauranteMenu.module.css';
import ProdutoCardapio from '../../components/produto_cardapio/ProdutoCardapio.jsx';
import PedidoCard from '../../components/pedido_card/PedidoCard.jsx';

const Restaurante = () => {
  const { id } = useParams();
  const [restaurante, setRestaurante] = useState(null);
  const [produtos, setProdutos] = useState([]);
  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const buscarRestaurante = async () => {

      try {
        const resposta = await fetch(
          `http://localhost:3001/api/v1/restaurantes/buscaRestaurante/${id}`,
          {
            method: 'GET',
            credentials: 'include',
          }
        );
        if (!resposta.ok) {
          throw new Error('Erro ao buscar restaurante');
        }
        const dados = await resposta.json();
        setRestaurante(dados);
      } catch (erro) {
        console.error('Erro ao carregar restaurante:', erro);
      } finally {
        setLoading(false);
      }
    };

    const buscarProdutos = async () => {
      try {
        const resposta = await fetch(
          `http://localhost:3001/api/v1/produtos/buscarProdutosDeRestaurante/${id}`,
          {
            method: 'GET',
            credentials: 'include',
          }
        );
        if (!resposta.ok) {
          throw new Error('Erro ao buscar produtos');
        }
        const dados = await resposta.json();
        setProdutos(dados);
      } catch (erro) {
        console.error('Erro ao carregar produtos:', erro);
      }
    };

    const buscarPedidos = async () => {
      try {
        const resposta = await fetch(
          `http://localhost:3001/api/v1/pedidos/pedidosDeRestaurante/${id}`,
          {
            method: 'GET',
            credentials: 'include',
          }
        );
        if (!resposta.ok) {
          throw new Error('Erro ao buscar pedidos');
        }
        const dados = await resposta.json();
        setPedidos(dados);
      } catch (erro) {
        console.error('Erro ao carregar pedidos:', erro);
      }
    };

    buscarRestaurante();
    buscarProdutos();
    buscarPedidos();
  }, [id]);

  const excluirRestaurante = () => {
    console.log("Excluir restaurante");
  };

  if (loading) return <p>Carregando...</p>;
  if (!restaurante) return <p>Restaurante não encontrado</p>;

  return (
    <div className={styles["page-container"]}>
      <Header />
      <main className={styles.restauranteView}>
        <div className={styles.restauranteTopo}>
          <img src={`http://localhost:3001${restaurante.fotoUrl}`} alt="Logo Restaurante" className={styles.logoRestaurante} />
          <div className={styles.infoRestaurante}>
            <h1>{restaurante.nome}</h1>
            <p>{restaurante.descricao}</p>
            <div className={styles.linksContainer}>
              <Link to={`/EdicaoRestaurante/${id}`} className={styles.linkAsButton}>Edição Restaurante</Link>
              <button className={`${styles.linkAsButton} ${styles.linkAsButtonExcluir}`} onClick={excluirRestaurante}>
                Excluir Restaurante
              </button>
            </div>
          </div>
        </div>

        <div className={styles.infoExtraRestaurante}>
          <div className={styles.colunaInfo}>
            <h3>Endereço</h3>
            <p><strong>Rua:</strong> {restaurante.endereco.logradouro}</p>
            <p><strong>Número:</strong> {restaurante.endereco.numero}</p>
            <p><strong>Complemento:</strong> {restaurante.endereco.complemento}</p>
            <p><strong>Bairro:</strong> {restaurante.endereco.bairro}</p>
            <p><strong>Cidade:</strong> {restaurante.endereco.cidade.nome}</p>
            <p><strong>Estado:</strong> {restaurante.endereco.cidade.estado.nome} ({restaurante.endereco.cidade.estado.sigla})</p>
            <p><strong>CEP:</strong> {restaurante.endereco.cep}</p>
          </div>

          <div className={styles.colunaInfo}>
            <h3>Formas de Pagamento Aceitas</h3>
            <ul>
              {restaurante.formasPagamento.map(fp => (
                <li key={fp.id}>{fp.nome}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className={styles.blocosHorizontal}>
          <div className={styles.blocoCardapio}>
            <h2>Cardápio</h2>
            <div className={styles.itensCardapio}>
              {produtos.length === 0 ? (
                <p>Nenhum produto cadastrado ainda.</p>
              ) : (
                produtos.map(produto => (
                  <ProdutoCardapio
                    key={produto.id}
                    nome={produto.nome}
                    descricao={produto.descricao}
                    preco={produto.preco}
                    fotoUrl={produto.fotoUrl}
                  />
                ))
              )}
              <Link to={`/cadastro-produtos/${id}`} className={styles.linkAsButton}>Cadastrar Produtos</Link>
            </div>
          </div>


          <div className={styles.blocoPedidos}>
            <h2>Pedidos Recebidos</h2>
            <div className={styles.pedidosLista}>
              {pedidos.length === 0 ? (
                <p>Nenhum pedido foi realizado ainda.</p>
              ) : (
                pedidos.map(pedido => (
                  <PedidoCard key={pedido.id} pedido={pedido} />
                ))
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Restaurante;