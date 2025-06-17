import React from 'react';
import styles from './PedidoCard.module.css';
import { useState } from "react";

const PedidoCard = ({ pedido }) => {
    const [novoStatus, setNovoStatus] = useState(pedido.statusPedido);
    const [loading, setLoading] = useState(false);

    const handleAtualizarStatus = async () => {
        try {
            setLoading(true);
            const response = await fetch(`http://localhost:3000/pedidos/${pedido.id}/status`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ status: novoStatus })
            });

            if (!response.ok) {
                throw new Error("Erro ao atualizar status");
            }

            alert("Status atualizado com sucesso!");
        } catch (error) {
            console.error(error);
            alert("Erro ao atualizar status.");
        } finally {
            setLoading(false);
        }
    };

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
                                <li><strong>Nome:</strong> {produto.nome}</li>
                                <li><strong>Preço unitário:</strong> R$ {produto.preco.toFixed(2)}</li>
                                <li><strong>Quantidade:</strong> {produto.quantidade}</li>
                            </ul>
                        </div>
                    ))}
                </ul>
            </div>
            <label>
                <strong>Alterar Status:</strong>
                <select value={novoStatus} onChange={e => setNovoStatus(e.target.value)}>
                    <option value="AGUARDANDO_CONFIRMACAO">Aguardando Confirmação</option>
                    <option value="CONFIRMADO">Confirmado</option>
                    <option value="EM_ENTREGA">Em Entrega</option>
                    <option value="ENTREGUE">Entregue</option>
                    <option value="CANCELADO">Cancelado</option>
                </select>
            </label>
            <button onClick={handleAtualizarStatus} disabled={loading || novoStatus === pedido.statusPedido}>
                {loading ? "Atualizando..." : "Atualizar Status"}
            </button>
        </div>
    );
};

export default PedidoCard;
