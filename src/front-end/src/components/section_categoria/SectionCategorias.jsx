import React from 'react';
import Categoria from '../categorias/Categorias.jsx';
import './sectionCategorias.css';
import imgBebidas from '../../assets/index/categorias-bebidas.jpg';
import imgAlmocos from '../../assets/index/categorias-almoco.jpg';
import imgSobremesas from '../../assets/index/categorias-sobremesas.png';
import imgMarmitas from '../../assets/index/categorias-marmitas-recorte.jpg';
import imgVegetariana from '../../assets/index/categorias-vegetariana.jpg';
import imgLanches from '../../assets/index/categorias-lanches-recortada.jpg';

const categorias = [
  {
    titulo: 'Bebidas',
    src: imgBebidas,
    alt: 'imagem ilustrativa de bebidas',
  },
  {
    titulo: 'Almoços',
    src: imgAlmocos,
    alt: 'imagem ilustrativa de alimentos',
  },
  {
    titulo: 'Sobremesas',
    src: imgSobremesas,
    alt: 'imagem ilustrativa de sobremesas',
  },
  {
    titulo: 'Marmitas',
    src: imgMarmitas,
    alt: 'imagem ilustrativa de marmitas',
  },
  {
    titulo: 'Vegetariana',
    src: imgVegetariana,
    alt: 'imagem ilustrativa de comida vegetariana',
  },
  {
    titulo: 'Lanches',
    src: imgLanches,
    alt: 'imagem ilustrativa de lanches',
  },
];

const SectionCategorias = () => {
  return (
    <section className="section-categorias">
      <aside className="categorias-alimentos">
        {categorias.map((categoria, index) => (
          <Categoria key={index} {...categoria} />
        ))}
      </aside>
    </section>
  );
};

export default SectionCategorias;