import React from 'react';
import './aboutScreen.css'; // Importa o arquivo CSS
import { Link } from 'react-router-dom';
import Header from '../../components/header/Header.jsx';
import Footer from '../../components/footer/Footer.jsx';


const AboutScreen = () => {
  return (
    <>
    <Header toggleAddressModal={() => { }} />
    <div className="about-container">
      <div className="about-content">
        <h1 className="about-title">Sobre o GoFood Delivery</h1>
        <p className="about-paragraph">
          Bem-vindo ao <strong className="highlight">GoFood Delivery</strong>! Somos mais que um aplicativo de entrega; somos o seu parceiro para uma experiência gastronômica fácil, rápida e deliciosa. Nascemos com a missão de conectar você aos seus restaurantes favoritos, levando o sabor que você ama direto para sua casa ou onde estiver.
        </p>
        <p className="about-paragraph">
          No GoFood Delivery, valorizamos a <strong className="highlight">conveniência</strong>, a <strong className="highlight">qualidade</strong> e a <strong className="highlight">diversidade</strong>. Por isso, trabalhamos incansavelmente para oferecer:
        </p>
        <ul className="about-list">
          <li>
            <strong className="list-item-title">Uma ampla seleção de restaurantes</strong>: Desde aquele prato tradicional que conforta a alma até as últimas novidades culinárias, temos opções para todos os gostos e momentos.
          </li>
          <li>
            <strong className="list-item-title">Entregas rápidas e eficientes</strong>: Nosso time de entregadores parceiros está sempre pronto para levar seu pedido até você com agilidade e cuidado.
          </li>
          <li>
            <strong className="list-item-title">Experiência de uso intuitiva</strong>: Navegar pelo GoFood Delivery é simples e prazeroso, do pedido ao rastreamento.
          </li>
          <li>
            <strong className="list-item-title">Suporte ao cliente dedicado</strong>: Estamos aqui para garantir que sua experiência seja a melhor possível, do início ao fim.
          </li>
        </ul>
        <p className="about-paragraph">
          Acreditamos que a boa comida tem o poder de unir pessoas, celebrar momentos e tornar o dia a dia mais saboroso. Por isso, estamos sempre buscando inovar e aprimorar nossos serviços para que cada pedido seja uma experiência memorável.
        </p>
        <h2 className="about-tagline">GoFood Delivery: Seu pedido, seu sabor, na sua porta!</h2>
      </div>
    </div>
    <Footer />
    </>
  );
};

export default AboutScreen;