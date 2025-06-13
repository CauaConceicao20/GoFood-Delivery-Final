import React, { useState } from 'react';
import './footer.css';
import MenuInferior from '../menu_inferior/MenuInferior';
import IconeInicio from '../../assets/index/mobile/icons8-home-50.png';
import IconeHamburguer from '../../assets/index/mobile/icons8-cardápio-50.png';
import IconeCarrinho from '../../assets/icon-carrinho-de-compras-.png';
import IconePerfil from '../../assets/icon-conta.png';

function Footer () {
  const [menuAtivo, setMenuAtivo] = useState(false);

  const abrirMenuInferior = () => setMenuAtivo(true);
  const fecharMenuInferior = () => setMenuAtivo(false);

  return (
    <>
      <footer>
        <div className="footer-copyright">
          <p>&copy; 2025 GoFood Delivery. Todos os direitos reservados.</p>
        </div>

        <nav className="bottom-bar">
          <div className="opcao-footer" id="btnInicio" onClick={abrirMenuInferior}>
            <div className="area-opcao-bottom-bar">
              <a href="">
                <img src={IconeInicio} alt="icone de inicio" />
              </a>
              <div><span>Início</span></div>
            </div>
          </div>

          <div className="divisao-bottom-bar"></div>

          <div className="opcao-footer" id="btnPerfilFooter" onClick={abrirMenuInferior}>
            <div className="area-opcao-bottom-bar">
              <img src={IconePerfil} alt="icone de perfil" />
              <div><span>Perfil</span></div>
            </div>
          </div>

          <div className="divisao-bottom-bar"></div>

          <div className="opcao-footer" id="btnCarrinhoFooter" onClick={abrirMenuInferior}>
            <div className="area-opcao-bottom-bar">
              <a href="/src/carrinho.html">
                <img src={IconeCarrinho} alt="icone de carrinho" />
              </a>
              <div><span>Carrinho</span></div>
            </div>
          </div>

          <div className="divisao-bottom-bar"></div>

          <div className="opcao-footer" id="btnHamburguerFooter" onClick={abrirMenuInferior}>
            <div className="area-opcao-bottom-bar">
              <img src={IconeHamburguer} alt="icone menu hamburguer" />
              <div><span>Menu</span></div>
            </div>
          </div>
        </nav>
      </footer>

      {/* MenuInferior aparece quando menuAtivo for true */}
       <MenuInferior onClose={fecharMenuInferior} ativo={menuAtivo}>
        <li>Opção 1</li>
        <li>Opção 2</li>
        <li>Opção 3</li>
        {/* Adicione as opções reais do seu menu aqui */}
      </MenuInferior>
    </>
  );
};

export default Footer;