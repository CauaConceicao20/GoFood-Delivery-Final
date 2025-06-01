import { Routes, Route } from 'react-router-dom';
import Login from './telas/login/Login';
import Cadastro from './telas/cadastro/Cadastro';
import LoginRestaurante from './telas/restaurante/login/LoginRestaurante';
import CadastroRestaurante from './telas/restaurante/cadastro/CadastroRestaurante';
import MainMenu from './telas/main_menu/MainMenu';


function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/login/restaurante" element={<LoginRestaurante />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/cadastro/restaurante" element={<CadastroRestaurante />} />
        <Route path="/login/restaurante" element={<LoginRestaurante />} />
        <Route path="/main_menu" element={<MainMenu />} />
      </Routes>
    </div>
  );
}

export default App;