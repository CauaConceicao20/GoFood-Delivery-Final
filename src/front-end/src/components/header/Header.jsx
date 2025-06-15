import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import ModalEndereco from '../modal_endereco/ModalEndereco.jsx';
import MenuPerfil from '../menu_perfil/MenuPerfil.jsx';

import GoFoodLogo from '../../assets/logo.png';
import IconPesquisar from '../../assets/icon-pesquisar.png';
import IconCarrinho from '../../assets/icon-carrinho-de-compras-.png';
import IconConta from '../../assets/icon-conta.png';

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [modalAberto, setModalAberto] = useState(false);
  const [cep, setCep] = useState('');

  const perfilRef = useRef(null);

  const abrirModal = () => setModalAberto(true);
  const fecharModal = () => setModalAberto(false);

  const adicionarEndereco = (novoCep) => {
    setCep(novoCep);
    fecharModal();
  };

  const handlePerfilClick = (event) => {
    event.stopPropagation();
    setShowMenu((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (perfilRef.current && !perfilRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

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
          { cep ? `CEP: ${cep}` : 'Insira seu CEP' }
        </button>

        <button className="btn-carrinho" id="btnCarrinhoHeader">
          <Link to="/carrinho">
            <img src={IconCarrinho} alt="Ícone do carrinho de compras" />
          </Link>
        </button>

        <div className="perfil-wrapper" ref={perfilRef}>
          <button
            type="button"
            className="btn-perfil"
            id="btnPerfilHeader"
            onClick={handlePerfilClick}
          >
            <img src={IconConta} alt="Ícone de perfil" />
          </button>

          {showMenu && <MenuPerfil ativo={showMenu} />}
        </div>
      </header>

      <ModalEndereco
        aberto={modalAberto}
        onClose={fecharModal}
        onAddEndereco={adicionarEndereco}
      />
    </>
  );
};

export default Header;