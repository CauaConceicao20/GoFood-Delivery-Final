import React from "react";
import RangeComBalao from "../range_com_balao/RangeComBalao";

const FiltrosRestaurantes = () => {
  return (
    <section className="filtros-de-restaurante">
      <h1>Restaurantes</h1>

      <label htmlFor="distanciaRange"><h2>Distância</h2></label>
      <div className="range-labels">
        <span>1km</span>
        <span>20km+</span>
      </div>
       <div className="range-wrapper">
          <RangeComBalao
            min={1}
            max={20}
            step={1}
            tipo="km"
            valorInicial={1}
            idInput="distanciaRange"
            idOutput="distanciaValor"
          />
        </div>

      <ul className="filtro-de-ordenacao-de-restaurantes">
        <li><input type="checkbox" id="aberto" /><label htmlFor="aberto">Aberto</label></li>
        <li><input type="checkbox" id="fechado" /><label htmlFor="fechado">Fechado</label></li>
      </ul>
    </section>
  );
};

export default FiltrosRestaurantes;
