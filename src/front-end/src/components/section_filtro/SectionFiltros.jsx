import React, { useState, useEffect } from "react";
import FiltrosAlimentosEBebidas from "./FiltrosAlimentosEBebidas.jsx";
import FiltrosRestaurantes from "./FiltrosRestaurantes.jsx";
import Botao from "../botao/Botao.jsx";
import "./sectionFiltros.css";

const SectionFiltros = () => {
  const [menuAtivo, setMenuAtivo] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1366);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1366);
      if (window.innerWidth > 1366) setMenuAtivo(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (isMobile && menuAtivo) {
      document.body.classList.add('menu-aberto');
    } else {
      document.body.classList.remove('menu-aberto');
    }
    return () => document.body.classList.remove('menu-aberto');
  }, [isMobile, menuAtivo]);
  const handleOverlayClick = () => setMenuAtivo(false);

  return (
    <>
      {isMobile && menuAtivo && (
        <div
          className="overlay ativo"
          id="overlayMenuFiltro"
          onClick={handleOverlayClick}
          style={{ zIndex: 1999 }}
        ></div>
      )}

      {isMobile && (
        <button
          className="btn-abrir-filtros"
          onClick={() => setMenuAtivo(true)}
          id="btnAbrirFiltros"
        >
          Filtros
        </button>
      )}

      <aside
        className={
          isMobile
            ? `filtros flutuante${menuAtivo ? " ativo" : ""}`
            : "filtros"
        }
        id="filtrosMenu"
        style={isMobile && menuAtivo ? { zIndex: 2000 } : undefined}
      >
        {isMobile && (
          <div className="area-btn-fechar-filtro">
            <span
              className="btn-fechar-filtro"
              id="btnFecharFiltro"
              onClick={() => setMenuAtivo(false)}
            >
              &times;
            </span>
          </div>
        )}
        <FiltrosAlimentosEBebidas />
        <FiltrosRestaurantes />
        {isMobile && (
          <div className="area-btn-aplicar-filtro">
            <Botao className="btn-aplicar-filtro" onClick={() => setMenuAtivo(false)}>
              Aplicar Filtro
            </Botao>
          </div>
        )}
      </aside>
    </>
  );
};

export default SectionFiltros;