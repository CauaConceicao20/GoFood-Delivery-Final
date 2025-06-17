import React from 'react';
import styles from './PedidoCard.module.css';

const PedidoCard = ({ pedido }) => {
    return (
        <div className={styles.pedidoCard}>
            <h3>Pedido #{pedido.codigo}</h3>
            <p><strong>Status:</strong> {pedido.statusPedido}</p>
            <p><strong>Taxa de Frete:</strong> R$ {pedido.taxaFrete}</p>
            <p><strong>Total:</strong> R$ {pedido.valorTotal.toFixed(2)}</p>
            <p><strong>SubTotal:</strong> R$ {pedido.subTotal.toFixed(2)}</p>
            <p><strong>Pagamento:</strong> {pedido.metodoDePagamento}</p>
            <p><strong>Cliente:</strong> {pedido.usuario.nome} ({pedido.usuario.email})</p>
            <div>
                <strong>Produtos:</strong>
                <ul>
                    {pedido.produtos.map((produto) => (
                        <div key={produto.id}>
                            <ul>
                                <li >
                                    <strong>Nome: </strong>{produto.nome}
                                </li>
                                <li><strong>Preço unitario: </strong> R$ {produto.preco.toFixed(2)}</li>
                                <li><strong>Quantidade: </strong> {produto.quantidade}</li>
                            </ul>

                        </div>

                    ))}
                </ul>
            </div>
        </div>
    );
};

export default PedidoCard;
