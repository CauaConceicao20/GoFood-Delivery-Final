import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './footer.css';
import MenuInferior from '../menu_inferior/MenuInferior';
import IconeInicio from '../../assets/index/mobile/icons8-home-50.png';
import IconeHamburguer from '../../assets/index/mobile/icons8-cardápio-50.png';
import IconeCarrinho from '../../assets/icon-carrinho-de-compras-.png';
import IconePerfil from '../../assets/icon-conta.png';

function Footer() {
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
              <Link to="/">
                <img src={IconeInicio} alt="icone de inicio" />
              </Link>
              <div><span>Início</span></div>
            </div>
          </div>

          <div className="divisao-bottom-bar"></div>

          <div className="opcao-footer" id="btnPerfilFooter" onClick={abrirMenuInferior}>
            <div className="area-opcao-bottom-bar">

              <Link to="/perfil">
                <img src={IconePerfil} alt="icone de perfil" />
              </Link>
              <div><span>Perfil</span></div>
            </div>
          </div>

          <div className="divisao-bottom-bar"></div>

          <div className="opcao-footer" id="btnCarrinhoFooter" onClick={abrirMenuInferior}>
            <div className="area-opcao-bottom-bar">
              <Link to="/carrinho">
                <img src={IconeCarrinho} alt="icone de carrinho" />
              </Link>

              <div>
                <link rel="stylesheet" href="" />
                <span>Carrinho</span></div>
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


      <div className='lista-inferior'>
        <MenuInferior onClose={fecharMenuInferior} ativo={menuAtivo}>
          <li><Link to="/configuracoes">Configurações</Link></li>
          <li><Link to="/sobre">Sobre</Link></li>
          <li><Link to="/cadastro/restaurante">Cadastrar Restaurante</Link></li>
          <li><Link to="/RestaurantePerfil">Restaurante</Link></li>
        </MenuInferior>
      </div>
    </>
  );
};

export default Footer;