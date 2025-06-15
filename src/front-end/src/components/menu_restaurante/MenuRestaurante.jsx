import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "./menuRestaurante.css";

const MenuRestaurante = ({ ativo }) => {
  const [restaurantes, setRestaurantes] = useState([]);
  const menuRef = useRef(null);

  useEffect(() => {
    if (!ativo) return;

    async function fetchRestaurantes() {
      try {
        const response = await fetch("http://localhost:3001/api/v1/restaurantes/buscaRestaurantesAssociados", {
          credentials: "include",
        });
        if (response.ok) {
          const data = await response.json();
          setRestaurantes(data);
        } else {
          setRestaurantes([]);
        }
      } catch {
        setRestaurantes([]);
      }
    }
    fetchRestaurantes();
  }, [ativo]);

  if (!ativo) return null;

  return (
    <>
      <div className="overlay" />
      <aside className="menu-restaurante ativo" id="menuLateral" ref={menuRef}>
        <h2>Restaurantes</h2>
        <nav className="navegacao-menu" id="navegacaoMenu">
          <ul>
            {restaurantes.map((restaurante) => (
              <li key={restaurante.id}>
                <Link to={`/restaurantes/${restaurante.id}`}>
                  <img
                    src={`http://localhost:3001${restaurante.fotoUrl}` || "/default-logo.png"}
                    alt={`Logo de ${restaurante.nome}`}
                    className="logo-restaurante"
                  />
                  {restaurante.nome}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </>
  );
};

export default MenuRestaurante;
