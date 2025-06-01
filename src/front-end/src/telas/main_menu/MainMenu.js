import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './MainMenu.css';

const MainMenu = () => {
  const [showSideMenu, setShowSideMenu] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [address, setAddress] = useState('');
  const [priceRange, setPriceRange] = useState(500);
  const [mlRange, setMlRange] = useState(1000);
  const [distanceRange, setDistanceRange] = useState(10);

  const toggleSideMenu = () => setShowSideMenu(!showSideMenu);
  const toggleFilters = () => setShowFilters(!showFilters);
  const toggleAddressModal = () => setShowAddressModal(!showAddressModal);

  const handleAddressSubmit = (e) => {
    e.preventDefault();
    // Lógica para salvar endereço
    setShowAddressModal(false);
  };

  return (
    <div className="main-container">
      {/* Header */}
      <header className="main-header">
        <div className="container-logo">
          <Link to="/">
            <div id="logo-gofood">GoFood</div>
          </Link>
        </div>

        <form className="container-busca">
          <button type="submit" className="icone-de-busca">
            <span role="img" aria-label="search">🔍</span>
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

        <button className="btn-perfil" onClick={toggleSideMenu}>
          <span role="img" aria-label="profile">👤</span>
        </button>
      </header>

      {/* Overlays e Menus Laterais */}
      {showSideMenu && (
        <>
          <div className="overlay" onClick={toggleSideMenu}></div>
          <aside className="menu-lateral">
            <h2>Menu</h2>
            <nav className="navegacao-menu">
              <ul>
                <li><Link to="/pedidos">Pedidos</Link></li>
                <li><Link to="/perfil">Perfil</Link></li>
                <li><Link to="/configuracoes">Configurações</Link></li>
                <li><Link to="/sobre">Sobre</Link></li>
              </ul>
            </nav>
          </aside>
        </>
      )}

      {/* Modal de Endereço */}
      {showAddressModal && (
        <div className="modal-area">
          <div className="modal-conteudo">
            <span className="btn-fechar-modal" onClick={toggleAddressModal}>&times;</span>
            <h2>Digite Seu Endereço:</h2>
            <input 
              className="input-endereco" 
              type="text" 
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            <div className="area-btn-modal">
              <button 
                className="btn-adicionar-endereco-modal"
                onClick={handleAddressSubmit}
              >
                Adicionar Endereço
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Botão e Filtros */}
      <button className="btn-abrir-filtros" onClick={toggleFilters}>
        Filtros
      </button>

      {showFilters && (
        <>
          <div className="overlay" onClick={toggleFilters}></div>
          <aside className="filtros">
            <div className="area-btn-fechar-filtro">
              <span className="btn-fechar-filtro" onClick={toggleFilters}>&times;</span>
            </div>

            <section className="alimentos-e-bebidas">
              <h1>Alimentos/Bebidas</h1>
              
              {/* Seção de Filtros - Implementar conforme necessário */}
              {/* ... */}
              
              <div className="area-btn-aplicar-filtro">
                <button className="btn-aplicar-filtro" onClick={toggleFilters}>
                  Aplicar Filtro
                </button>
              </div>
            </section>
          </aside>
        </>
      )}

      {/* Conteúdo Principal */}
      <main>
        <section className="section-ultimos-pedidos">
          <div className="section-ultimos-pedidos-conteudo">
            <div className="titulo-secao-utlimos-pedidos">
              <h1>Seus últimos pedidos</h1>
              <span>Repetir pedido</span>
            </div>
            <div className="area-ultimos-pedidos">
              <article className="ultimos-pedidos">
                <h2 className="titulo-ultimos-pedidos">Marmita fit - Restaurante Bom Sabor</h2>
                <button className="btn-repetir-pedido">Repetir pedido</button>
              </article>
              <article className="ultimos-pedidos">
                <h2 className="titulo-ultimos-pedidos">Marmita fit - Restaurante Bom Sabor</h2>
                <button className="btn-repetir-pedido">Repetir pedido</button>
              </article>
            </div>
          </div>
        </section>

        <section className="section-categorias">
          <aside className="categorias-alimentos">
            {['Bebidas', 'Almoços', 'Sobremesas', 'Marmitas', 'Vegetariana', 'Lanches'].map((categoria) => (
              <article key={categoria} className="opcao-categoria">
                <div className="img-categoria-placeholder"></div>
                <h2>{categoria}</h2>
              </article>
            ))}
          </aside>
        </section>

        <hr className="linha-de-separacao-2" />

        <section className="container-card-alimentos">
          {[...Array(10)].map((_, index) => (
            <article key={index} className="card-alimentos">
              <div className="card-image-placeholder"></div>
              <div className="descricao-do-alimento">
                <span className="card-titulo">Cheeseburger Clássico</span>
                <div className="card-restaurante-responsavel">
                  <span className="card-img-restaurante"></span>
                  <span>Burger da Rua</span>
                  <span className="card-avaliacao">4.9</span>
                  <span className="icon-estrela">★</span>
                </div>
                <div className="card-preco">
                  <span className="rs">R$</span><span className="valor">24,90</span>
                </div>
                <div className="card-container-botao">
                  <button>Adicionar ao carrinho</button>
                </div>
              </div>
            </article>
          ))}
        </section>
      </main>

      {/* Footer */}
      <footer>
        <div className="footer-copyright">
          <p>&copy; 2025 GoFood Delivery. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
};

export default MainMenu;