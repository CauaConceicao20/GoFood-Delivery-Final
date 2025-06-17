import React, { useState } from 'react';
import styles from './PedidoCard.module.css';
import ModalErro from '../modal_erro/ModalErro.jsx';

const PedidoCard = ({ pedido }) => {
    const [novoStatus, setNovoStatus] = useState('');
    const [statusAtual, setStatusAtual] = useState(pedido.statusPedido);
    const [loading, setLoading] = useState(false);
    const [mensagemModal, setMensagemModal] = useState('');
    const [mostrarModal, setMostrarModal] = useState(false);

    const handleAtualizarStatus = async () => {
        if (!novoStatus) return;

        try {
            setLoading(true);
            const response = await fetch(`http://localhost:3001/api/v1/pedidos/atualizaStatusPedido/${pedido.id}/status`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ status: novoStatus }),
                credentials: "include"
            });

            if (!response.ok) {
                const erro = await response.json();
                throw new Error(erro.erro || 'Erro ao atualizar status.');
            }

            setStatusAtual(novoStatus);
            setMensagemModal("Status atualizado com sucesso!");
            setNovoStatus('');
        } catch (error) {
            console.error(error);
            setMensagemModal(error.message || "Erro ao atualizar status.");
        } finally {
            setLoading(false);
            setMostrarModal(true);
        }
    };

    const fecharModal = () => {
        setMostrarModal(false);
        setMensagemModal('');
    };

    return (
        <div className={styles.pedidoCard}>
            <h3>Pedido #{pedido.codigo}</h3>
            <p><strong>Status atual:</strong> {statusAtual}</p>

            <p><strong>Taxa de Frete:</strong> R$ {pedido.taxaFrete}</p>
            <p><strong>Total:</strong> R$ {pedido.valorTotal.toFixed(2)}</p>
            <p><strong>SubTotal:</strong> R$ {pedido.subTotal.toFixed(2)}</p>
            <p><strong>Pagamento:</strong> {pedido.metodoDePagamento}</p>
            <p><strong>Cliente:</strong> {pedido.usuario.nome} ({pedido.usuario.email})</p>

            <div>
                <strong>Produtos:</strong>
                <ul>
                    {pedido.produtos.map((produto) => (
                        <li key={produto.id}>
                            <ul>
                                <li><strong>Nome:</strong> {produto.nome}</li>
                                <li><strong>Preço unitário:</strong> R$ {produto.preco.toFixed(2)}</li>
                                <li><strong>Quantidade:</strong> {produto.quantidade}</li>
                            </ul>
                        </li>
                    ))}
                </ul>
            </div>

            <label>
                <strong>Alterar Status:</strong>
                <select 
                    value={novoStatus} 
                    onChange={e => setNovoStatus(e.target.value)}
                >
                    <option value="" disabled>Alterar Status</option>
                    <option value="CONFIRMADO">Confirmado</option>
                    <option value="ENTREGUE">Entregue</option>
                    <option value="CANCELADO">Cancelado</option>
                    <option value="CONCLUIDA">Concluída</option>
                </select>
            </label>

            <button
                onClick={handleAtualizarStatus}
                disabled={loading || !novoStatus}  // Aqui permite enviar mesmo se for igual ao statusAtual
            >
                {loading ? "Atualizando..." : "Atualizar Status"}
            </button>

            {mostrarModal && (
                <ModalErro mensagem={mensagemModal} onClose={fecharModal} />
            )}
        </div>
    );
};

export default PedidoCard;
