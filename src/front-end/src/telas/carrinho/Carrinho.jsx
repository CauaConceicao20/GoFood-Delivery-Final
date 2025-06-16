import React from "react";
import styles from "./Carrinho.module.css";
import ImgHamburguer from "../../assets/hamburguer-card.jpg";
import IconPesquisar from '../../assets/icon-pesquisar.png';
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";

const Carrinho = () => {
  return (
     <div className={styles["page-container"]}>
      <Header />
      <main>
        <section className={styles.carrinho}>
          <div className={styles["area-do-btn-voltar"]}>
            <button className={styles["btn-de-voltar"]}>
              <i className="fas fa-arrow-left"></i>
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
            {[1].map((_, index) => (
              <article key={index} className={styles["alimento-do-carrinho"]}>
                <div className={styles["area-checkbox-e-img"]}>
                  <div className={styles["div-checkbox"]}>
                    <input type="checkbox" />
                  </div>
                  <span className={styles["area-imagem"]}>
                    <img src={ImgHamburguer} alt="" />
                  </span>
                </div>
                <div className={styles["conteudo-alimento"]}>
                  <h2>Hamburger de costela</h2>
                  <div>
                    <p>
                      Suculento, rústico e cheio de sabor. Esse hambúrguer artesanal é feito com carne de
                      costela selecionada, garantindo uma textura macia e um gosto marcante defumado na
                      medida certa.
                    </p>
                  </div>
                  <span className={styles.preco}>Valor: 27,90</span>
                  <div className={styles["linha-de-opcoes"]}>
                    <span className={styles["area-btn-diminuir"]}>
                      <button>-</button>
                    </span>
                    <span>
                      <input type="number" value="1" min="1" max="100" readOnly />
                    </span>
                    <span className={styles["area-btn-aumentar"]}>
                      <button>+</button>
                    </span>
                    <div className={styles["area-do-btn-excluir"]}>
                      <button className={styles["btn-excluir"]}>Excluir</button>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <hr className={styles["linha-de-separacao"]} />

          <div className={styles.summary}>
            <div className={styles["area-de-preco"]}>
              <span>SubTotal(2 produtos):</span>
              <span>R$55,80</span>
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
