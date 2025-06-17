import Connection from "../database/Connection.js";
import Pedido from "../model/pedido/Pedido.js";

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
            pedido.getIdMetodoPagamento()]);

            for (const itemPedido of itemsPedido) {
                await this.associaItemAoPedido(result.lastID, itemPedido, conn);
            }

            await conn.run('COMMIT');
        } catch (err) {
            await conn.run('ROLLBACK');
            throw err;
        }
    }

    async buscarPorId(id) {
        let conn;
        try {
            conn = await this.connection.connect();
            const pedido = await conn.get(`SELECT * FROM pedidos WHERE id = ?`, [id]);

            return new Pedido(pedido.id, pedido.codigo, pedido.sub_total, pedido.taxa_frete, pedido.valor_total,
                pedido.data_criacao, pedido.data_confirmacao, pedido.data_entrega, pedido.data_cancelamento,
                pedido.forma_pagamento_id, pedido.usuario_id, pedido.restaurante_id, pedido.status_pedido
            );
        } catch (err) {
            throw err;
        }
    }

    async atualizaStatusDoPedido(pedido, conn) {
    try {
        if (!conn) conn = await this.connection.connect();

        let query = 'UPDATE pedidos SET status_pedido = ?';
        const params = [pedido.getStatusPedido()];

        if (pedido.getStatusPedido() === 'CONFIRMADO') {
            query += ', data_confirmacao = ?';
            params.push(pedido.getDataConfirmacao());
        } else if (pedido.getStatusPedido() === 'ENTREGUE') {
            query += ', data_entrega = ?';
            params.push(pedido.getDataEntrega());
        } else if (pedido.getStatusPedido() === 'CANCELADO') {
            query += ', data_cancelamento = ?';
            params.push(pedido.getDataCancelamento());
        }

        query += ' WHERE id = ?';
        params.push(pedido.getId());

        await conn.run(query, params);
    } catch (err) {
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

    async buscarPedidosDoRestaurante(idRestaurante) {
        const conn = await this.connection.connect();
        try {
            const result = await conn.all('SELECT * FROM pedidos WHERE restaurante_id=?', [idRestaurante]);

            const pedidos = result.map(pedido => new Pedido(pedido.id, pedido.codigo,
                pedido.sub_total, pedido.taxa_frete, pedido.valor_total, pedido.data_criacao,
                pedido.data_confirmacao, pedido.data_entrega, pedido.data_cancelamento,
                pedido.forma_pagamento_id, pedido.usuario_id, pedido.restaurante_id, pedido.status_pedido
            ));

            return pedidos;
        } catch (err) {
            throw err;
        }
    }
}

export default PedidoRepository;