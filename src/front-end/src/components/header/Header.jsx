import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import MenuPerfil from '../menu_perfil/MenuPerfil.jsx';
import MenuRestaurante from '../menu_restaurante/MenuRestaurante.jsx';

import GoFoodLogo from '../../assets/logo.png';
import IconPesquisar from '../../assets/icon-pesquisar.png';
import IconCarrinho from '../../assets/icon-carrinho-de-compras-.png';
import IconConta from '../../assets/icon-conta.png';
import IconRestaurante from '../../assets/icon-restaurante.png';

const Header = () => {
  const [showMenuPerfil, setShowMenuPerfil] = useState(false);
  const [menuRestauranteAtivo, setMenuRestauranteAtivo] = useState(false);

  const perfilRef = useRef(null);
  const restauranteRef = useRef(null);

  const handlePerfilClick = (event) => {
    event.stopPropagation();
    setShowMenuPerfil((prev) => !prev);
  };

  const handleRestauranteClick = (event) => {
    event.stopPropagation();
    setMenuRestauranteAtivo((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (perfilRef.current && !perfilRef.current.contains(event.target)) {
        setShowMenuPerfil(false);
      }
      if (restauranteRef.current && !restauranteRef.current.contains(event.target)) {
        setMenuRestauranteAtivo(false);
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

        <div ref={restauranteRef}>
          <button className="btn-restaurante" id="btn-restaurante" onClick={handleRestauranteClick}>
            <img src={IconRestaurante} alt="Ícone de restaurante" />
          </button>
          <MenuRestaurante ativo={menuRestauranteAtivo} />
        </div>

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

          {showMenuPerfil && <MenuPerfil ativo={showMenuPerfil} />}
        </div>
      </header>
    </>
  );
};

export default Header;
