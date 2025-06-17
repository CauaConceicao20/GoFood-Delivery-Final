import Connection from "../database/Connection.js";
import ItemPedido from "../model/pedido/ItemPedido.js";

class ItemPedidoRepository {
    constructor() {
        this.connection = new Connection();
    }

    async buscarItensDoPedido(idPedido) {
        const conn = await this.connection.connect();
        try {
            const result = await conn.all('SELECT * FROM itens_pedido WHERE pedido_id=?', [idPedido]);
            
            return result.map(item => new ItemPedido(
                item.pedido_id, item.produto_id,  item.quantidade, item.valor_unitario, item.valor_total
            ));

        } catch (err) {
            throw err;
        }
    }
}

export default ItemPedidoRepository