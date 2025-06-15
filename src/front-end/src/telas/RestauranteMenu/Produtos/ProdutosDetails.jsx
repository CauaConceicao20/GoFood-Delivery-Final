import React from 'react';
import './ProdutoDetails.css';
import { Link } from "react-router-dom";
import Header from '../../../components/header/Header.jsx';
import Footer from '../../../components/footer/Footer.jsx';
import CardSection from '../../../components/section_cards/SectionCards.jsx';



const ProductDetails = () => {
    return (
        <>
            <Header toggleAddressModal={() => { }} />
            <main>
                
            </main>
            <div className="PD-container">
                <section className="PD-restaurant-info">
                    <div className="PD-restaurant-logo-container">

                    </div>
                    <div className="PD-restaurant-details">
                        <h1>O BURGUER</h1>
                        <p className="PD-restaurant-description">
                            O BURGUER é um restaurante especializado em hambúrgueres artesanais,
                            oferecendo combinações únicas de sabores com ingredientes frescos e
                            selecionados. Com ambiente moderno e acolhedor, é o lugar ideal para
                            quem busca uma experiência gastronômica autêntica e saborosa.
                        </p>

                        <div className="PD-rating-order">
                            <div className="PD-rating">
                                ⭐ 4,6 <span className="PD-review-count">(197 avaliações)</span>
                            </div>
                            <button className="PD-order-button">Fazer Pedido</button>
                        </div>
                        <p className="PD-delivery-info">Pedido 15-45 min • R$5,00</p>
                    </div>
                </section>



                <section className="PD-suggestions">
                    <CardSection />
                </section>
            </div>
            <Footer />
        </>
    );
};

export default ProductDetails;