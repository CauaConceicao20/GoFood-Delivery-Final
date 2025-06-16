import React, { useEffect, useState } from "react";
import styles from "./Carrinho.module.css";
import { Link } from 'react-router-dom';
import IconPesquisar from '../../assets/icon-pesquisar.png';
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import CarrinhoItem from "../../components/item_carrinho/CarrinhoItem.jsx";
import ModalErro from "../../components/modal_erro/ModalErro"; // Modal para erro e sucesso

const Carrinho = () => {
  const [items, setItems] = useState([]);
  const [mensagemErro, setMensagemErro] = useState("");
  const [mensagemSucesso, setMensagemSucesso] = useState("");

  const buscarCarrinho = () => {
    fetch("http://localhost:3001/api/v1/carrinhos/buscarCarrinho", {
      credentials: "include"
    })
      .then(res => res.json())
      .then(data => {
        const itensConvertidos = data.itens.map((item) => ({
          id: `${item.carrinho_id}-${item.produto_id}`,
          produtoId: item.produto_id,
          carrinhoId: item.carrinho_id,
          name: item.nome,
          description: item.descricao,
          price: Number(item.preco ?? 0),
          quantity: item.quantidade,
          imgUrl: `http://localhost:3001${item.fotoUrl}`
        }));
        setItems(itensConvertidos);
      })
      .catch(err => console.error("Erro ao buscar itens do carrinho:", err));
  };

  useEffect(() => {
    buscarCarrinho();
  }, []);

  const handleIncrease = async (id) => {
    const item = items.find(i => i.id === id);
    if (!item) return;

    try {
      const response = await fetch("http://localhost:3001/api/v1/carrinhos/aumentarQuantidade", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify({
          produtoId: item.produtoId,
          carrinhoId: item.carrinhoId
        })
      });

      if (!response.ok) {
        throw new Error("Falha ao aumentar quantidade");
      }

      buscarCarrinho();
    } catch (error) {
      console.error("Erro ao aumentar item do carrinho:", error);
      setMensagemErro("Erro ao aumentar quantidade do item.");
    }
  };

  const handleDecrease = async (id) => {
    const item = items.find(i => i.id === id);
    if (!item) return;

    try {
      const response = await fetch("http://localhost:3001/api/v1/carrinhos/diminuirQuantidade", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify({
          produtoId: item.produtoId,
          carrinhoId: item.carrinhoId
        })
      });

      const body = await response.json();

      if (!response.ok) {
        const mensagem = body.erro || "Falha ao diminuir quantidade";
        setMensagemErro(mensagem);
        return;
      }

      buscarCarrinho();
    } catch (error) {
      console.error("Erro ao diminuir item do carrinho:", error);
      setMensagemErro("Erro interno ao tentar diminuir item.");
    }
  };

  const handleDelete = async (id) => {
    const item = items.find(i => i.id === id);
    if (!item) return;

    try {
      const response = await fetch(`http://localhost:3001/api/v1/carrinhos/removerItem/${item.produtoId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify({
          produtoId: item.produtoId,
          carrinhoId: item.carrinhoId
        })
      });

      const body = await response.json();

      if (!response.ok) {
        const mensagem = body.erro || "Falha ao remover item";
        setMensagemErro(mensagem);
        return;
      }

      buscarCarrinho();
      setMensagemSucesso(body.mensagem || "Item removido com sucesso");

    } catch (error) {
      console.error("Erro ao remover item do carrinho:", error);
      setMensagemErro("Erro interno ao tentar remover item.");
    }
  };

  const subTotal = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  return (
    <div className={styles["page-container"]}>
      <Header />
      <main>
        <section className={styles.carrinho}>
          <div className={styles["area-do-btn-voltar"]}>
            <button className={styles["btn-de-voltar"]}>
              <Link to="/">
                <i className="fas fa-arrow-left"></i>
              </Link>
            </button>
          </div>

          <div className={styles["header-do-carrinho"]}>
            <h1>Carrinho</h1>
            <div className={styles["area-de-busca-alimento-carrinho"]}>
              <button className={styles["icone-de-busca-carrinho"]}>
                <img src={IconPesquisar} alt="Ícone de busca" />
              </button>
              <input type="text" placeholder="Buscar item" />
            </div>
          </div>

          <div className={styles["conteudo-do-carrinho"]}>
            {items.length === 0 ? (
              <p>O carrinho está vazio.</p>
            ) : (
              items.map(item => (
                <CarrinhoItem
                  key={item.id}
                  item={item}
                  onIncrease={handleIncrease}
                  onDecrease={handleDecrease}
                  onDelete={handleDelete}
                />
              ))
            )}
          </div>

          <hr className={styles["linha-de-separacao"]} />

          <div className={styles.summary}>
            <div className={styles["area-de-preco"]}>
              <span>SubTotal ({items.length} {items.length === 1 ? "produto" : "produtos"}):</span>
              <span>R$ {subTotal.toFixed(2).replace('.', ',')}</span>
            </div>
            <div className={styles["botao-finalizar"]}>
              <button>Finalizar pedido</button>
            </div>
          </div>
        </section>
      </main>

      <ModalErro mensagem={mensagemErro} onClose={() => setMensagemErro("")} />
      <ModalErro mensagem={mensagemSucesso} onClose={() => setMensagemSucesso("")} />

      <Footer />
    </div>
  );
};

export default Carrinho;
