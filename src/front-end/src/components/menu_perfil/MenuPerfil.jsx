import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import "./menuPerfil.css";

const MenuPerfil = ({ ativo }) => {
  const menuRef = useRef(null);
  const navigate = useNavigate();

  if (!ativo) return null;

  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/v1/auth/logout", {
        method: "GET",
        credentials: "include",
      });

      if (response.ok) {
        navigate("/login", { replace: true });
      } else {
        console.error("Erro no logout");
      }
    } catch (error) {
      console.error("Erro no logout", error);
    }
  };

  return (
    <>
      <div className="overlay" />
      <aside className="menu-perfil ativo" id="menuLateral" ref={menuRef}>
        <h2>Menu</h2>
        <nav className="navegacao-menu" id="navegacaoMenu">
          <ul>
            <li><Link to="/pedidos">Pedidos</Link></li>
            <li><Link to="/perfil">Perfil</Link></li>
            <li><Link to="/configuracoes">Configurações</Link></li>
            <li><Link to="/sobre">Sobre</Link></li>
            <li><Link to="/cadastro/restaurante">Cadastrar Restaurante</Link></li>
            <li>
              <a href="#" role="button" onClick={(e) => { e.preventDefault(); handleLogout(); }}>Logout</a></li>
          </ul>
        </nav>
      </aside>
    </>
  );
};

export default MenuPerfil;