import React, { useRef, useState, useEffect } from "react";
import "./rangeComBalao.css";

const RangeComBalao = ({ min, max, step, tipo, valorInicial, idInput, idOutput }) => {
  const [valor, setValor] = useState(valorInicial);
  const inputRef = useRef(null);
  const outputRef = useRef(null);

  useEffect(() => {
    const porcentagem = (valor - min) / (max - min);
    if (outputRef.current) {
      outputRef.current.textContent = valor >= max ? `${max}${tipo}` : `${valor}${tipo}`;
      outputRef.current.style.left = `calc(${porcentagem * 100}% - 10px)`;
    }
    if (inputRef.current) {
      inputRef.current.style.background = `linear-gradient(to right, #E53935 0%, #E53935 ${porcentagem * 100}%, #ddd ${porcentagem * 100}%, #ddd 100%)`;
    }
  }, [valor, min, max, tipo]);

  return (
    <div className="range-wrapper">
      <output className="balao-range-valor" id={idOutput} ref={outputRef}>
        {valor}{tipo}
      </output>
      <input
        ref={inputRef}
        type="range"
        id={idInput}
        min={min}
        max={max}
        step={step}
        value={valor}
        onChange={e => setValor(Number(e.target.value))}
      />
    </div>
  );
};

export default RangeComBalao;