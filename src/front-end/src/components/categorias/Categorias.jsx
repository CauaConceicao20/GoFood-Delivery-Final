import React from 'react';
import './categoria.css';

const Categoria = ({ src, alt, titulo }) => {
  return (
    <article className="opcao-categoria">
      <figure>
        <img className="img-categoria" src={src} alt={alt} />
      </figure>
      <h2>{titulo}</h2>
    </article>
  );
};

export default Categoria;