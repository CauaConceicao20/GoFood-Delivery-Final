import React from "react";
import styles from "../../telas/carrinho/Carrinho.module.css";

const CarrinhoItem = ({ item, onIncrease, onDecrease, onDelete }) => {
  const precoFormatado = (Number(item.price) || 0).toFixed(2).replace('.', ',');

  return (
    <article className={styles["alimento-do-carrinho"]}>
      <div className={styles["area-checkbox-e-img"]}>
        <div className={styles["div-checkbox"]}>
          <input type="checkbox" />
        </div>
        <span className={styles["area-imagem"]}>
          <img src={item.imgUrl} alt={item.name} />
        </span>
      </div>
      <div className={styles["conteudo-alimento"]}>
        <h2>{item.name}</h2>
        <div>
          <p>{item.description}</p>
        </div>
        <span className={styles.preco}>Valor: {precoFormatado}</span>
        <div className={styles["linha-de-opcoes"]}>
          <span className={styles["area-btn-diminuir"]}>
            <button onClick={() => onDecrease(item.id)}>-</button>
          </span>
          <span>
            <input type="number" value={item.quantity} min="1" max="100" readOnly />
          </span>
          <span className={styles["area-btn-aumentar"]}>
            <button onClick={() => onIncrease(item.id)}>+</button>
          </span>
          <div className={styles["area-do-btn-excluir"]}>
            <button className={styles["btn-excluir"]} onClick={() => onDelete(item.id)}>Excluir</button>
          </div>
        </div>
      </div>
    </article>
  );
};

export default CarrinhoItem;