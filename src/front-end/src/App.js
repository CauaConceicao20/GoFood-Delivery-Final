import { Routes, Route } from 'react-router-dom';
import Login from './telas/login/Login';
import Cadastro from './telas/cadastro/Cadastro';
import LoginRestaurante from './telas/restaurante/login/LoginRestaurante';
import CadastroRestaurante from './telas/restaurante/cadastro/CadastroRestaurante';
import MainMenu from './telas/main_menu/MainMenu';
import Carrinho from './telas/carrinho/Carrinho';
import PerfilUsuario from './telas/PerfilUsuario/PerfilUsuario';
import PerfilRestaurante from './telas/RestauranteMenu/RestauranteMenu';
import CadastroProdutos from './telas/RestauranteMenu/Produtos/CadastroProdutos';
import DetalhesPedido from './telas/restaurante/pedidos/DetalhePedido';
import EdicaoRestaurante from './telas/RestauranteMenu/EdicaoDados';
import EdicaoUsuario from './telas/PerfilUsuario/EdicaoUsuario';
import Header from './components/header/Header.jsx';
import AboutScreen from './telas/aboutScreen/AboutScreen.jsx';



function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<MainMenu />} />
        <Route path="/login" element={<Login />} />
        <Route path="/login/restaurante" element={<LoginRestaurante />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/cadastro/restaurante" element={<CadastroRestaurante />} />
        <Route path="/login/restaurante" element={<LoginRestaurante />} />
        <Route path="/main_menu" element={<MainMenu />} />
        <Route path="/carrinho" element={<Carrinho />} />
        <Route path="/perfil" element={<PerfilUsuario />} />
        <Route path="/RestaurantePerfil" element={<PerfilRestaurante />} />
        <Route path="/cadastro-produtos" element={<CadastroProdutos />} />
        <Route path="/detalhes-pedido" element={<DetalhesPedido />} />
        <Route path="/EdicaoRestaurante" element={<EdicaoRestaurante />} />
        <Route path="/EdicaoUsuario" element={<EdicaoUsuario />} />
        <Route path="/sobre" element={<AboutScreen />} />

      </Routes>
    </div>
  );
}

export default App;