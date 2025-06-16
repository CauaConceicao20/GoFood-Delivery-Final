import React, { useEffect, useState } from "react";
import styles from "./Carrinho.module.css";
import { Link } from 'react-router-dom';
import IconPesquisar from '../../assets/icon-pesquisar.png';
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import CarrinhoItem from "../../components/item_carrinho/CarrinhoItem.jsx";
import ModalErro from "../../components/modal_erro/ModalErro";

const Carrinho = () => {
  const [items, setItems] = useState([]);
  const [mensagemErro, setMensagemErro] = useState("");
  const [mensagemSucesso, setMensagemSucesso] = useState("");
  const [metodosPagamento, setMetodosPagamento] = useState([]);
  const [itensSelecionados, setItensSelecionados] = useState([]);
  const [metodoSelecionado, setMetodoSelecionado] = useState("");

  const buscarCarrinho = () => {
    fetch("http://localhost:3001/api/v1/carrinhos/buscarCarrinho", { credentials: "include" })
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

    fetch("http://localhost:3001/api/v1/metodos-pagamento/buscarTodos", { credentials: "include" })
      .then(res => {
        if (!res.ok) throw new Error("Erro ao buscar métodos de pagamento");
        return res.json();
      })
      .then(data => setMetodosPagamento(data))
      .catch(err => console.error("Erro ao buscar métodos de pagamento:", err));
  }, []);

  const handleIncrease = async (id) => {
    const item = items.find(i => i.id === id);
    if (!item) return;

    try {
      const response = await fetch("http://localhost:3001/api/v1/carrinhos/aumentarQuantidade", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ produtoId: item.produtoId, carrinhoId: item.carrinhoId })
      });

      if (!response.ok) throw new Error("Falha ao aumentar quantidade");

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
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ produtoId: item.produtoId, carrinhoId: item.carrinhoId })
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
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ produtoId: item.produtoId, carrinhoId: item.carrinhoId })
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

  const toggleItemSelecionado = (id) => {
    setItensSelecionados(prev =>
      prev.includes(id) ? prev.filter(itemId => itemId !== id) : [...prev, id]
    );
  };

  const handleFinalizarPedido = async () => {
    if (itensSelecionados.length === 0) {
      setMensagemErro("Selecione ao menos um item do carrinho.");
      return;
    }

    const metodo = metodosPagamento.find(m => m.id.toString() === metodoSelecionado);
    if (!metodo) {
      setMensagemErro("Selecione um método de pagamento válido.");
      return;
    }

    const produtos = items
      .filter(item => itensSelecionados.includes(item.id))
      .map(item => ({
        idProduto: item.produtoId,
        quantidade: item.quantity,
        observacao: "Sem observação"
      }));

    try {
      const response = await fetch("http://localhost:3001/api/v1/pedidos/registra", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          produtos,
          idMetodoPagamento: metodo.id,
          nomeMetodoPagamento: metodo.nome
        })
      });

      const body = await response.json();

      if (!response.ok) {
        setMensagemErro(body.erro || "Erro ao finalizar o pedido.");
        return;
      }

      // Pedido finalizado com sucesso, agora removemos os itens selecionados do carrinho
      for (const id of itensSelecionados) {
        const item = items.find(i => i.id === id);
        if (!item) continue;

        try {
          const deleteResponse = await fetch(
            `http://localhost:3001/api/v1/carrinhos/removerItem/${item.produtoId}`,
            {
              method: "DELETE",
              headers: { "Content-Type": "application/json" },
              credentials: "include",
              body: JSON.stringify({ produtoId: item.produtoId, carrinhoId: item.carrinhoId })
            }
          );

          // Mesmo que falhe na remoção de algum item, não para o fluxo, só registra erro no console
          if (!deleteResponse.ok) {
            const deleteBody = await deleteResponse.json();
            console.error(`Falha ao remover item ${item.produtoId}:`, deleteBody.erro || "Erro desconhecido");
          }
        } catch (err) {
          console.error(`Erro interno ao remover item ${item.produtoId}:`, err);
        }
      }

      setMensagemSucesso("Pedido realizado com sucesso.");
      setItensSelecionados([]);
      setMetodoSelecionado("");
      buscarCarrinho();
    } catch (error) {
      console.error("Erro ao finalizar pedido:", error);
      setMensagemErro("Erro interno ao finalizar pedido.");
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
                  onToggleSelect={toggleItemSelecionado}
                  isSelected={itensSelecionados.includes(item.id)}
                />
              ))
            )}
          </div>

          <div className={styles["area-metodo-pagamento"]}>
            <label htmlFor="metodoPagamento">Método de Pagamento:</label>
            <select
              id="metodoPagamento"
              name="metodoPagamento"
              value={metodoSelecionado}
              onChange={(e) => setMetodoSelecionado(e.target.value)}
            >
              <option value="">Selecione um método</option>
              {metodosPagamento.map((metodo) => (
                <option key={metodo.id} value={metodo.id}>
                  {metodo.nome}
                </option>
              ))}
            </select>
          </div>

          <hr className={styles["linha-de-separacao"]} />

          <div className={styles.summary}>
            <div className={styles["area-de-preco"]}>
              <span>SubTotal ({items.length} {items.length === 1 ? "produto" : "produtos"}):</span>
              <span>R$ {subTotal.toFixed(2).replace('.', ',')}</span>
            </div>
            <div className={styles["botao-finalizar"]}>
              <button onClick={handleFinalizarPedido}>Finalizar pedido</button>
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
