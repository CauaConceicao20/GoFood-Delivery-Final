import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // para navegação programática
import './Header.css';
import { Link } from 'react-router-dom';
import MenuPerfil from '../menu_perfil/MenuPerfil.jsx';
import MenuRestaurante from '../menu_restaurante/MenuRestaurante.jsx';

import GoFoodLogo from '../../assets/logo.png';
import IconPesquisar from '../../assets/icon-pesquisar.png';
import IconCarrinho from '../../assets/icon-carrinho-de-compras-.png';
import IconConta from '../../assets/icon-conta.png';
import IconRestaurante from '../../assets/icon-restaurante.png';
import ModalErro from '../modal_erro/ModalErro.jsx'; // ajuste o caminho se necessário

const Header = () => {
  const [showMenuPerfil, setShowMenuPerfil] = useState(false);
  const [menuRestauranteAtivo, setMenuRestauranteAtivo] = useState(false);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [mensagemErro, setMensagemErro] = useState('');

  const perfilRef = useRef(null);
  const restauranteRef = useRef(null);
  const navigate = useNavigate();

  const verificarAutenticacao = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/v1/auth/status", {
        credentials: 'include',
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data?.mensagem || "Erro de autenticação.");
      }

      const data = await response.json();
      return data.logado;

    } catch {
      return false;
    }
  };

  const handlePerfilClick = (event) => {
    event.stopPropagation();
    setShowMenuPerfil((prev) => !prev);
  };

  const handleRestauranteClick = async (event) => {
    event.stopPropagation();

    const logado = await verificarAutenticacao();

    if (logado) {
      setMenuRestauranteAtivo((prev) => !prev);
    } else {
      setMensagemErro("Você precisa estar logado para acessar o menu de restaurantes.");
      setMostrarModal(true);
    }
  };

  const handleCarrinhoClick = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/v1/auth/status", {
        credentials: 'include',
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data?.mensagem || "Erro de autenticação.");
      }

      const data = await response.json();

      if (data.logado) {
        navigate('/carrinho');
      } else {
        setMensagemErro("Você precisa estar logado para acessar o carrinho.");
        setMostrarModal(true);
      }

    } catch (err) {
      setMensagemErro("Você precisa estar logado para acessar o carrinho.");
      setMostrarModal(true);
    }
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
          <Link to="/main_menu">
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

        <button className="btn-carrinho" id="btnCarrinhoHeader" onClick={handleCarrinhoClick}>
          <img src={IconCarrinho} alt="Ícone do carrinho de compras" />
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

      {mostrarModal && (
        <ModalErro
          mensagem={mensagemErro}
          onClose={() => setMostrarModal(false)}
        />
      )}
    </>
  );
};

export default Header;
