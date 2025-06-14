import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "./menuPerfil.css";

const MenuPerfil = ({ ativo }) => {
  const [usuario, setUsuario] = useState(null);
  const menuRef = useRef(null);

  useEffect(() => {
    if (!ativo) return;

    async function fetchUsuario() {
      try {
        const response = await fetch("http://localhost:3001/api/v1/auth/me", {
          credentials: "include",
        });
        if (response.ok) {
          const data = await response.json();
          setUsuario(data);
        } else {
          setUsuario(null);
        }
      } catch {
        setUsuario(null);
      }
    }

    fetchUsuario();
  }, [ativo]);

  const rolesValidas = ["CLIENTE", "RESTAURANTE", "ADMIN"];
  const temRoleValida =
    usuario &&
    usuario.grupos &&
    usuario.grupos.some((g) => rolesValidas.includes(g.nome));

  if (!ativo) return null;

  return (
    <>
      <div className="overlay" />
      <aside className="menu-perfil ativo" id="menuLateral" ref={menuRef}>
        <h2>Menu</h2>
        <nav className="navegacao-menu" id="navegacaoMenu">
          {temRoleValida ? (
            <ul>
              <li><Link to="/pedidos">Pedidos</Link></li>
              <li><Link to="/perfil">Perfil</Link></li>
              <li><Link to="/configuracoes">Configurações</Link></li>
              <li><Link to="/sobre">Sobre</Link></li>
            </ul>
          ) : (
            <ul>
              <li><Link to="/login">Entrar</Link></li>
              <li><Link to="/cadastro">Cadastrar</Link></li>
            </ul>
          )}
        </nav>
      </aside>
    </>
  );
};

export default MenuPerfil;
