import React from 'react';
import RangeComBalao from '../range_com_balao/RangeComBalao.jsx'

const FiltrosAlimentosEBebidas = () => {
  return (
    <section className="alimentos-e-bebidas">
      <h1>Alimentos/Bebidas</h1>

      <h2>Ordenar por</h2>
      <ul className="filtros-de-ordenacao">
        <li>
          <input type="checkbox" id="mais-bem-avaliados" />
          <label htmlFor="mais-bem-avaliados">Mais bem avaliados</label>
        </li>
        <li>
          <input type="checkbox" id="frete-gratis" />
          <label htmlFor="frete-gratis">Frete grátis</label>
        </li>
      </ul>

      <div className="filtro-de-preco">
        <label htmlFor="precoRange"><h2>Preço:</h2></label>
        <div className="range-labels">
          <span>R$ 1</span>
          <span className="max-label">R$ 1000+</span>
        </div>
        <div className="range-wrapper">
          <RangeComBalao
            min={1}
            max={20}
            step={1}
            tipo="R$"
            valorInicial={10}
            idInput="distanciaRange"
            idOutput="distanciaValor"
          />
        </div>
      </div>

      <h3>Restrições</h3>
      <ul className="filtro-de-restricoes-de-alimentos">
        <li>
          <input type="checkbox" id="sem-gluten" />
          <label htmlFor="sem-gluten">Sem Glúten</label>
        </li>
        <li>
          <input type="checkbox" id="sem-lactose" />
          <label htmlFor="sem-lactose">Sem Lactose</label>
        </li>
      </ul>

      <h2>Características de Alimentos</h2>
      <ul className="filtro-caracteristicas-de-alimentos">
        <li><input type="checkbox" id="sopa" /><label htmlFor="sopa">Sopa</label></li>
        <li><input type="checkbox" id="brasileira-alimento" /><label htmlFor="brasileira-alimento">Brasileira</label></li>
        <li><input type="checkbox" id="japonesa" /><label htmlFor="japonesa">Japonesa</label></li>
        <li><input type="checkbox" id="saudavel" /><label htmlFor="saudavel">Saudável</label></li>
      </ul>

      <h2>Características de Bebidas</h2>
      <ul className="filtro-caracteristicas-de-bebidas">
        <li><input type="checkbox" id="alcoolica" /><label htmlFor="alcoolica">Alcoólica</label></li>
        <li><input type="checkbox" id="coquetel" /><label htmlFor="coquetel">Coquetel</label></li>
        <li><input type="checkbox" id="energetico" /><label htmlFor="energetico">Energético</label></li>
        <li><input type="checkbox" id="suco" /><label htmlFor="suco">Suco</label></li>
        <li><input type="checkbox" id="cafe" /><label htmlFor="cafe">Café</label></li>
        <li><input type="checkbox" id="cerveja" /><label htmlFor="cerveja">Cerveja</label></li>
      </ul>

      <label htmlFor="mlRange"><h2>Quantidade (ML)</h2></label>
      <div className="range-labels">
        <span>100ml</span>
        <span>1000ml+</span>
      </div>
         <div className="range-wrapper">
          <RangeComBalao
            min={1}
            max={1000}
            step={1}
            tipo="ml"
            valorInicial={500}
            idInput="distanciaRange"
            idOutput="distanciaValor"
          />
        </div>
    </section>
  );
};

export default FiltrosAlimentosEBebidas;