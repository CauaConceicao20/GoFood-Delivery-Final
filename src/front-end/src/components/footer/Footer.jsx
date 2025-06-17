import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './footer.css';
import MenuInferior from '../menu_inferior/MenuInferior';
import IconeInicio from '../../assets/index/mobile/icons8-home-50.png';
import IconeHamburguer from '../../assets/index/mobile/icons8-cardápio-50.png';
import IconeCarrinho from '../../assets/icon-carrinho-de-compras-.png';
import IconRestaurante from '../../assets/icon-restaurante.png';
import ModalErro from '../modal_erro/ModalErro.jsx';

function Footer() {
  const [menuGeralAtivo, setMenuGeralAtivo] = useState(false);
  const [menuRestaurantesAtivo, setMenuRestaurantesAtivo] = useState(false);
  const [restaurantes, setRestaurantes] = useState([]);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [mensagemErro, setMensagemErro] = useState('');

  const abrirMenuGeral = () => setMenuGeralAtivo(true);
  const fecharMenuGeral = () => setMenuGeralAtivo(false);

  const abrirMenuRestaurantes = async () => {
    try {
      const statusResponse = await fetch("http://localhost:3001/api/v1/auth/status", {
        credentials: 'include',
      });

      if (!statusResponse.ok) {
        const data = await statusResponse.json();
        throw new Error(data?.erro || 'Erro de autenticação');
      }

      const statusData = await statusResponse.json();
      if (!statusData.logado) {
        throw new Error("Você precisa estar logado para acessar o menu de restaurantes.");
      }

      const restaurantesResponse = await fetch('http://localhost:3001/api/v1/restaurantes/buscaRestaurantesAssociados', {
        credentials: 'include',
      });

      if (!restaurantesResponse.ok) {
        throw new Error('Você não possui restaurantes, vá em menu');
      }

      const restaurantesData = await restaurantesResponse.json();
      setRestaurantes(restaurantesData);
      setMenuRestaurantesAtivo(true);

    } catch (error) {
      setMensagemErro(error.message || 'Erro inesperado');
      setMostrarModal(true);
    }
  };

  const fecharMenuRestaurantes = () => setMenuRestaurantesAtivo(false);

  return (
    <>
      <footer>
        <div className="footer-copyright">
          <p>&copy; 2025 GoFood Delivery. Todos os direitos reservados.</p>
        </div>

        <nav className="bottom-bar">
          <div className="opcao-footer" id="btnInicio">
            <div className="area-opcao-bottom-bar">
              <Link to="/main_menu">
                <img src={IconeInicio} alt="icone de inicio" />
              </Link>
              <div><span>Início</span></div>
            </div>
          </div>

          <div className="divisao-bottom-bar"></div>

          <div className="opcao-footer" id="btnPerfilFooter" onClick={abrirMenuRestaurantes}>
            <div className="area-opcao-bottom-bar">
              <div className="btn-restaurante-inferior" id="btn-restaurante-inferior">
                <img src={IconRestaurante} alt="Ícone de restaurante" />
              </div>
              <div><span>Restaurante</span></div>
            </div>
          </div>

          <div className="divisao-bottom-bar"></div>

          <div className="opcao-footer" id="btnCarrinhoFooter">
            <div className="area-opcao-bottom-bar">
              <Link to="/carrinho">
                <img src={IconeCarrinho} alt="icone de carrinho" />
              </Link>
              <div><span>Carrinho</span></div>
            </div>
          </div>

          <div className="divisao-bottom-bar"></div>

          <div className="opcao-footer" id="btnHamburguerFooter" onClick={abrirMenuGeral}>
            <div className="area-opcao-bottom-bar">
              <img src={IconeHamburguer} alt="icone menu hamburguer" />
              <div><span>Menu</span></div>
            </div>
          </div>
        </nav>
      </footer>

      <div className="lista-inferior">
        <MenuInferior onClose={fecharMenuGeral} ativo={menuGeralAtivo}>
          <li><Link to="/configuracoes">Configurações</Link></li>
          <li><Link to="/sobre">Sobre</Link></li>
          <li><Link to="/perfil">Perfil</Link></li>
          <li><Link to="/cadastro/restaurante">Cadastrar Restaurante</Link></li>
        </MenuInferior>
      </div>

      <div className="lista-inferior">
        <MenuInferior onClose={fecharMenuRestaurantes} ativo={menuRestaurantesAtivo}>
          <ul className="menu-opcoes">
            {restaurantes.length > 0 ? (
              restaurantes.map((restaurante) => (
                <li
                  key={restaurante.id}
                  onClick={() => {
                    fecharMenuRestaurantes();
                    window.location.href = `/RestaurantePerfil/${restaurante.id}`;
                  }}
                >
                  <img
                    src={
                      restaurante.fotoUrl
                        ? `http://localhost:3001${restaurante.fotoUrl}`
                        : '/default-logo.png'
                    }
                    alt={`Logo de ${restaurante.nome}`}
                  />
                  <span>{restaurante.nome}</span>
                </li>
              ))
            ) : (
              <li style={{ textAlign: 'center' }}>Você não possui restaurantes</li>
            )}
          </ul>
        </MenuInferior>
      </div>

      {mostrarModal && (
        <ModalErro
          mensagem={mensagemErro}
          onClose={() => setMostrarModal(false)}
        />
      )}
    </>
  );
}

export default Footer;