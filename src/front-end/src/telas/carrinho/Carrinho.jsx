import React, { useEffect, useState } from "react";
import styles from "./Carrinho.module.css";
import { Link } from 'react-router-dom';
import IconPesquisar from '../../assets/icon-pesquisar.png';
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import CarrinhoItem from "../../components/item_carrinho/CarrinhoItem.jsx";

const Carrinho = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/api/v1/carrinhos/buscarCarrinho", {
      credentials: "include" // importante para enviar o cookie com JWT
    })
      .then(res => res.json())
      .then(data => {
        const itensConvertidos = data.itens.map((item, index) => ({
          id: `${item.carrinho_id}-${item.produto_id}`, // ID único gerado
          name: item.nome,
          description: item.descricao,
          price: item.preco,
          quantity: item.quantidade,
          imgUrl: `http://localhost:3001${item.fotoUrl}`
        }));
        setItems(itensConvertidos);
      })
      .catch(err => console.error("Erro ao buscar itens do carrinho:", err));
  }, []);

  const handleIncrease = (id) => {
    setItems(prev =>
      prev.map(item =>
        item.id === id && item.quantity < 100
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const handleDecrease = (id) => {
    setItems(prev =>
      prev.map(item =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const handleDelete = (id) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };

  const subTotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

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
      <Footer />
    </div>
  );
};

export default Carrinho;