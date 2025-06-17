import React from 'react';
import styles from './produtoCardapio.module.css';

const ProdutoCardapio = ({ nome, descricao, preco, fotoUrl }) => {
  return (
    <div className={styles.itemCardapio}>
      <img src={`http://localhost:3001${fotoUrl}`} alt={nome} className={styles.imagemProduto} />
      <div className={styles.itemTexto}>
        <div className={styles.itemInfo}>
          <span>{nome}</span>
          <span className={styles.itemPreco}>R$ {preco.toFixed(2)}</span>
        </div>
        <p className={styles.itemDescricao}>{descricao}</p>
      </div>
    </div>
  );
};

export default ProdutoCardapio;