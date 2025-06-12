import Connection from "../database/Connection.js";

class PedidoRepository {
    constructor() {
        this.connection = new Connection();
    }

    async registrar(pedido, itemsPedido) {
        let conn = null;
        try {
            conn = await this.connection.connect();
            await conn.run('BEGIN TRANSACTION');

            const result = await conn.run(`INSERT INTO pedidos (codigo, sub_total, taxa_frete, valor_total, data_criacao, data_confirmacao,
            data_entrega, data_cancelamento, status_pedido, usuario_id, restaurante_id, forma_pagamento_id) VALUES
            (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, [pedido.getCodigo(), pedido.getSubTotal(), pedido.getTaxaFrete(),
            pedido.getValorTotal(), pedido.getDataCriacao(), pedido.getDataConfirmacao(), pedido.getDataEntrega(),
            pedido.getDataCancelamento(), pedido.getStatusPedido(), pedido.getUsuarioId(), pedido.getRestauranteId(),
            pedido.getMetodoPagamento()]);

            for (const itemPedido of itemsPedido) {
                await this.associaItemAoPedido(result.lastID, itemPedido, conn);
            }

            await conn.run('COMMIT');
        } catch (err) {
            await conn.run('ROLLBACK');
            throw err;
        }
    }

    async associaItemAoPedido(pedidoId, itemPedido, conn) {
    try {
        if (!conn) conn = await this.connection.connect();
        await conn.run(
            'INSERT INTO itens_pedido (pedido_id, produto_id, quantidade, preco_unitario, observacao) VALUES (?, ?, ?, ?, ?)',
            [pedidoId, itemPedido.getIdProduto(), itemPedido.getQuantidade(), itemPedido.getPrecoUnitario(), itemPedido.getObservacao()]
        );
    } catch (err) {
        throw err;
    }
}
}   

export default PedidoRepository;