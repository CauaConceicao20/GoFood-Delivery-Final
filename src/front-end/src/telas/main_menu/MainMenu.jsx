// src/telas/main_menu/MainMenu.js
import React, { useState } from 'react';
import './MainMenu.css';
import Header from '../../components/header/Header.jsx';
import Footer from '../../components/footer/Footer.jsx';
import CategoriaSection from '../../components/section_categoria/SectionCategorias.jsx';
import SectionFiltros from '../../components/section_filtro/SectionFiltros.jsx';
import CardSection from '../../components/section_cards/SectionCards.jsx';
import SectionUltimosPedidos from '../../components/section_ultimos_pedidos/SectionUltimosPedidos';


const MainMenu = () => {
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
