import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './header.css';
import MenuLateral from '../menu_lateral/MenuLateral.jsx';
import ModalEndereco from '../modal_endereco/ModalEndereco.jsx';

import GoFoodLogo from '../../assets/logo.png';
import IconPesquisar from '../../assets/icon-pesquisar.png';
import IconCarrinho from '../../assets/icon-carrinho-de-compras-.png';
import IconConta from '../../assets/icon-conta.png';

const Header = ({ toggleAddressModal }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [estadoDoUsuario, setEstadoDoUsuario] = useState(1);
  const [cep, setCep] = useState('');

  const handlePerfilClick = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setShowMenu(true);
  };

  const handleOverlayClick = () => setShowMenu(false);

  const [modalAberto, setModalAberto] = useState(false);

  const abrirModal = () => setModalAberto(true);
  const fecharModal = () => setModalAberto(false);

  const adicionarEndereco = (novoCep) => {
    setCep(novoCep);
    fecharModal();
  };

  const renderMenuPerfil = () => {
    if (estadoDoUsuario === 1) {
      return (
        <ul>
          <li><Link to="/perfil">Perfil</Link></li>
          <li><Link to="/configuracoes">Configurações</Link></li>
          <li><Link to="/sobre">Sobre</Link></li>
        </ul>
      );
    } else {
      return (
        <ul>
          <li><Link to="/login">Entrar</Link></li>
          <li><Link to="/cadastro">Cadastrar</Link></li>
        </ul>
      );
    }
  };

  return (
    <>
      <header>
        <figure className="container-logo">
          <Link to="/">
            <img id="logo-gofood" src={GoFoodLogo} alt="Logo da empresa" />
          </Link>
        </figure>

        <form className="container-busca" action="" method="GET">
          <button className="icone-de-busca" type="submit">
            <img src={IconPesquisar} alt="Ícone de busca" />
          </button>
          <input
            id="input-de-busca-do-header"
            type="text"
            placeholder="Busca de restaurantes e produtos"
          />
        </form>

        <button className="btn-endereco" id="btnEndereco" onClick={abrirModal}>
          {cep ? `CEP: ${cep}` : "Insira seu CEP"}
        </button>

        <button className="btn-carrinho" id="btnCarrinhoHeader">
          <Link to="/carrinho">
            <img src={IconCarrinho} alt="Ícone do carrinho de compras" />
          </Link>
        </button>

        <button className="btn-perfil" id="btnPerfilHeader" onClick={handlePerfilClick}>
          <img src={IconConta} alt="Ícone de perfil" />
        </button>
      </header>

      <ModalEndereco
        aberto={modalAberto}
        onClose={fecharModal}
        onAddEndereco={adicionarEndereco}
      />

      <MenuLateral onClose={handleOverlayClick} ativo={showMenu}>
        {renderMenuPerfil()}
      </MenuLateral>
    </>
  );
};

export default Header;