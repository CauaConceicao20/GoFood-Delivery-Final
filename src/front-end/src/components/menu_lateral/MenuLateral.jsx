import React, { useRef, useEffect } from 'react';
import './menuLateral.css';
import '../overlay/overlay.css';

const MenuLateral = ({ onClose, children, ativo }) => {
  const menuRef = useRef(null);

  useEffect(() => {
    if (!ativo) return;
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        onClose();
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [ativo, onClose]);

  if (!ativo) return null;
  return (
    <>
      <div className="overlay" />
      <aside className="menu-lateral ativo" id="menuLateral" ref={menuRef}>
        <h2>Menu</h2>
        <nav className="navegacao-menu" id="navegacaoMenu">
          {children}
        </nav>
      </aside>
    </>
  );
};

export default MenuLateral;