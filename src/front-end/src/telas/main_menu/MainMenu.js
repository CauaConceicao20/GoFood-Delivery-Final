// src/telas/main_menu/MainMenu.js

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './MainMenu.css';
import CardItemRestaurante from '../../components/CardItemRestaurante'; // Caminho de importação CORRETO

const MainMenu = () => {
  const [showSideMenu, setShowSideMenu] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [address, setAddress] = useState('');
  const [priceRange, setPriceRange] = useState(500); // Não usado neste exemplo, mas mantido
  const [mlRange, setMlRange] = useState(1000);     // Não usado neste exemplo, mas mantido
  const [distanceRange, setDistanceRange] = useState(10); // Não usado neste exemplo, mas mantido

  const [filters, setFilters] = useState({
    sortByRating: false,
    freeDelivery: false,
    glutenFree: false,
    lactoseFree: false,
    foodTypes: [],
    drinkTypes: [],
    priceMin: 0,
    priceRange: [1, 1000],
    distanceMax: 20
  });

  const toggleSideMenu = () => setShowSideMenu(!showSideMenu);
  const toggleFilters = () => setShowFilters(!showFilters);
  const toggleAddressModal = () => setShowAddressModal(!showAddressModal);

  const handleAddressSubmit = (e) => {
    e.preventDefault();
    // Lógica para salvar endereço
    setShowAddressModal(false);
  };

  const handleFilterChange = (filterName) => (e) => {
    setFilters({
      ...filters,
      [filterName]: e.target.checked
    });
  };

  // --- DADOS DE EXEMPLO PARA OS CARDS DE RESTAURANTE ---
  // Geralmente, isso viria de uma API (fetch, axios, etc.)
  const itensDeExemplo = [
    {
      id: 'item1',
      nomeProduto: 'Pizza Calabresa Familiar',
      preco: 58.99,
      descricaoProduto: 'Molho de tomate, mussarela, calabresa fatiada, cebola e orégano.',
      imagemProduto: '../../components/cachorrquente_img.png'
    },
    {
      id: 'item2',
      nome: 'Sushi Combo Especial',
      preco: 75.00,
      descricao: '20 peças variadas de sushi e sashimi frescos.',
      imagem: '../../components/cachorrquente_img.png'
    },
    {
      id: 'item3',
      nome: 'Marmita Fit Frango Grelhado',
      preco: 29.90,
      descricao: 'Peito de frango grelhado, arroz integral, brócolis e cenoura.',
      imagem: '../../components/cachorrquente_img.png'
    },
    {
      id: 'item4',
      nome: 'Hambúrguer Artesanal Duplo',
      preco: 42.00,
      descricao: 'Dois hambúrgueres de 150g, queijo cheddar, bacon, cebola caramelizada e molho especial.',
      imagem: '../../components/cachorrquente_img.png'
    },
    {
      id: 'item5',
      nome: 'Torta de Limão com Merengue',
      preco: 18.50,
      descricao: 'Fatia generosa de torta de limão com cobertura de merengue tostado.',
      imagem: '../../components/cachorrquente_img.png'
    },
    {
      id: 'item6',
      nome: 'Refrigerante Cola (Lata)',
      preco: 7.00,
      descricao: 'Lata de 350ml de refrigerante sabor cola.',
      imagem: '../../components/cachorrquente_img.png'
    },
    {
      id: 'item7',
      nome: 'Escondidinho de Carne Seca',
      preco: 38.00,
      descricao: 'Creme de mandioca com carne seca desfiada e queijo coalho.',
      imagem: '../../components/cachorrquente_img.png'
    },
    {
      id: 'item8',
      nome: 'Cerveja Artesanal IPA',
      preco: 25.00,
      descricao: 'Cerveja IPA de 500ml, com notas cítricas e amargor pronunciado.',
      imagem: '../../components/cachorrquente_img.png'
    },
    {
      id: 'item9',
      nome: 'Açaí com Granola e Frutas',
      preco: 22.00,
      descricao: 'Tigela de açaí com granola, banana e morango.',
      imagem: '../../components/cachorrquente_img.png'
    },
    {
      id: 'item10',
      nome: 'Risoto de Funghi Secchi',
      preco: 49.50,
      descricao: 'Cremoso risoto italiano com cogumelos funghi secchi e parmesão.',
      imagem: '../../components/cachorrquente_img.png'
    }
  ];
  // --- FIM DOS DADOS DE EXEMPLO ---


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
                <li><Link to="/RestaurantePerfil">Perfil Restaurante</Link></li>
                <li><Link to="/login">Entrar/Cadastro</Link></li>
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

              {/* Seção Ordenar por */}
              <div className="filter-section">
                <h2>Ordenar por</h2>
                <div className="filter-option">
                  <input
                    type="checkbox"
                    id="sort-by-rating"
                    checked={filters.sortByRating}
                    onChange={handleFilterChange('sortByRating')}
                  />
                  <label htmlFor="sort-by-rating">Mais bem avaliados</label>
                </div>
                <div className="filter-option">
                  <input
                    type="checkbox"
                    id="free-delivery"
                    checked={filters.freeDelivery}
                    onChange={handleFilterChange('freeDelivery')}
                  />
                  <label htmlFor="free-delivery">Frete grátis</label>
                </div>
              </div>

              {/* Seção Preço */}
              <div className="filter-section">
                <h2>Preço:</h2>
                <div className="price-display">
                  <span>R$ {filters.priceRange[0]}</span>
                  <span className="price-separator">-</span>
                  <span>R$ {filters.priceRange[1]}+</span>
                </div>
                <div className="range-slider">
                  <input
                    type="range"
                    min="1"
                    max="1000"
                    value={filters.priceRange[0]}
                    onChange={(e) => setFilters({
                      ...filters,
                      priceRange: [parseInt(e.target.value), filters.priceRange[1]]
                    })}
                    className="slider"
                  />
                  <input
                    type="range"
                    min="1"
                    max="1000"
                    value={filters.priceRange[1]}
                    onChange={(e) => setFilters({
                      ...filters,
                      priceRange: [filters.priceRange[0], parseInt(e.target.value)]
                    })}
                    className="slider"
                  />
                </div>
              </div>

              <div className="divider"></div>

              {/* Seção Restrições */}
              <div className="filter-section">
                <h2>Restrições</h2>
                <div className="filter-option">
                  <input
                    type="checkbox"
                    id="gluten-free"
                    checked={filters.glutenFree}
                    onChange={handleFilterChange('glutenFree')}
                  />
                  <label htmlFor="gluten-free">Sem Glúten</label>
                </div>
                <div className="filter-option">
                  <input
                    type="checkbox"
                    id="lactose-free"
                    checked={filters.lactoseFree}
                    onChange={handleFilterChange('lactoseFree')}
                  />
                  <label htmlFor="lactose-free">Sem Lactose</label>
                </div>
              </div>

              <div className="divider"></div>

              {/* Seção Características de Alimentos */}
              <div className="filter-section">
                <h2>Características de Alimentos</h2>
                {['Sopa', 'Brasileira', 'Japonesa', 'Saudável'].map((type) => (
                  <div key={type} className="filter-option">
                    <input
                      type="checkbox"
                      id={`food-${type}`}
                      checked={filters.foodTypes.includes(type)}
                      onChange={(e) => {
                        const newFoodTypes = e.target.checked
                          ? [...filters.foodTypes, type]
                          : filters.foodTypes.filter(t => t !== type);
                        setFilters({ ...filters, foodTypes: newFoodTypes });
                      }}
                    />
                    <label htmlFor={`food-${type}`}>{type}</label>
                  </div>
                ))}
              </div>

              <div className="divider"></div>

              {/* Seção Características de Bebidas */}
              <div className="filter-section">
                <h2>Características de Bebidas</h2>
                {['Alcoólica', 'Coquetel', 'Energético', 'Suco', 'Café', 'Cerveja'].map((type) => (
                  <div key={type} className="filter-option">
                    <input
                      type="checkbox"
                      id={`drink-${type}`}
                      checked={filters.drinkTypes.includes(type)}
                      onChange={(e) => {
                        const newDrinkTypes = e.target.checked
                          ? [...filters.drinkTypes, type]
                          : filters.drinkTypes.filter(t => t !== type);
                        setFilters({ ...filters, drinkTypes: newDrinkTypes });
                      }}
                    />
                    <label htmlFor={`drink-${type}`}>{type}</label>
                  </div>
                ))}
              </div>

              <div className="divider"></div>

              {/* Seção Distância */}
              <div className="filter-section">
                <h2>Distância</h2>
                <div className="distance-options">
                  <span>1km</span>
                  <span>5km</span>
                  <span>10km</span>
                  <span>20km+</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="20"
                  step="1"
                  value={filters.distanceMax}
                  onChange={(e) => setFilters({
                    ...filters,
                    distanceMax: parseInt(e.target.value)
                  })}
                  className="slider"
                />
              </div>

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

        {/* --- cards --- */}
        <section className="container-card-alimentos">
          {itensDeExemplo.map(item => (
            <CardItemRestaurante
              key={item.id} 
              nome={item.nomeProduto}
              preco={item.preco}
              descricao={item.descricaoProduto}
              imagem={item.imagemProduto}
            />
          ))}
        </section>
        {/* --- FIM DA SEÇÃO DOS CARDS --- */}

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