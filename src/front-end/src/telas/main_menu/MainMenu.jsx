// src/telas/main_menu/MainMenu.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './MainMenu.css';
import Header from '../../components/header/Header.jsx';
import Footer from '../../components/footer/Footer.jsx';
import CategoriaSection from '../../components/section_categoria/SectionCategorias.jsx';
import SectionFiltros from '../../components/section_filtro/SectionFiltros.jsx';
import CardSection from '../../components/section_cards/SectionCards.jsx';
import SectionUltimosPedidos from '../../components/section_ultimos_pedidos/SectionUltimosPedidos';
import Botao from '../../components/botao/Botao.jsx';


const MainMenu = () => {
  const [showSideMenu, setShowSideMenu] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [address, setAddress] = useState('');
  const [priceRange, setPriceRange] = useState(500);
  const [mlRange, setMlRange] = useState(1000);
  const [distanceRange, setDistanceRange] = useState(10);

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
    setShowAddressModal(false);
  };

  const handleFilterChange = (filterName) => (e) => {
    setFilters({
      ...filters,
      [filterName]: e.target.checked
    });
  };

  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);

  return (
    <>
      <Header />
      <main>
        <SectionFiltros />
        <section className="conteudo-principal">
          <SectionUltimosPedidos />
          <CategoriaSection />
          <CardSection />
        </section>
      </main>
      <Footer />
    </>
  );
};

export default MainMenu;

/*
  <Botao class="btn-abrir-filtros" id="btnAbrirFiltros">Filtros</Botao>
  */