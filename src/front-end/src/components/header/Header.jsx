import React, { useState } from 'react'; // Importe useState para gerenciar o estado do menu lateral
import { Link } from 'react-router-dom';
import './Header.css'; // Importa o arquivo CSS para o componente
import GoFoodLogo from './logo.png'; // Importa a imagem do logo

const Header = ({ toggleAddressModal }) => { // Remova toggleSideMenu das props, pois será gerenciado internamente

  // Estado para controlar a visibilidade do menu lateral
  const [showSideMenu, setShowSideMenu] = useState(false);

  // Função para alternar a visibilidade do menu lateral
  const toggleSideMenu = () => {
    setShowSideMenu(!showSideMenu);
  };

  return (
    <> {/* Fragment para permitir que o componente retorne múltiplos elementos irmãos */}
      <header className="main-header">
        <div className="container-logo">
          <Link to="/">
            <img src={GoFoodLogo} alt="GoFood Logo" id="logo-gofood" />
          </Link>
        </div>

        <form className="container-busca">
          <button type="submit" className="icone-de-busca">
            <span role="img" aria-label="search">🔍</span> {/* Adicione um ícone de lupa aqui */}
          </button>
          <input
            id="input-de-busca-do-header"
            type="text"
            placeholder="Busca de restaurantes e produtos"
          />
        </form>

        <button className="btn-endereco" onClick={toggleAddressModal}>
          Insira seu endereço
        </button>

        <button className="btn-carrinho">
          <Link to="/carrinho">
            <span role="img" aria-label="cart">🛒</span>
          </Link>
        </button>

        {/* Botão de perfil que agora chama o toggleSideMenu interno do Header */}
        <button className="btn-perfil" onClick={toggleSideMenu}>
          <span role="img" aria="profile">👤</span>
        </button>
      </header>

      {/* CÓDIGO DO MENU LATERAL E OVERLAY */}
      {showSideMenu && (
        <>
          {/* Overlay: Fundo escuro que cobre a tela quando o menu está aberto */}
          <div className="overlay" onClick={toggleSideMenu}></div>
          
          {/* Menu Lateral */}
          <aside className="menu-lateral">
            <h2>Menu</h2>
            <nav className="navegacao-menu">
              <ul>
                <li><Link to="/pedidos" onClick={toggleSideMenu}>Pedidos</Link></li>
                <li><Link to="/perfil" onClick={toggleSideMenu}>Perfil</Link></li>
                <li><Link to="/RestaurantePerfil" onClick={toggleSideMenu}>Perfil Restaurante</Link></li>
                <li><Link to="/login" onClick={toggleSideMenu}>Entrar/Cadastro</Link></li>
              </ul>
            </nav>
            {/* Opcional: Um botão de fechar dentro do menu lateral */}
            {/* <button className="btn-fechar-menu" onClick={toggleSideMenu}>X</button> */}
          </aside>
        </>
      )}
    </>
  );
};

export default Header;