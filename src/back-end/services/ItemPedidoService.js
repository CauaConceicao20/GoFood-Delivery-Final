import ItemPedido from '../model/pedido/ItemPedido.js';
import ProdutoService from './ProdutoService.js';
import ItemPedidoRepository from '../repository/ItemPedidoRepository.js';

class ItemPedidoService {

    constructor() {
        this.produtoService = new ProdutoService();
        this.itemPedidoRepository = new ItemPedidoRepository();
    }

    async converteDtosParaItemPedido(itemsPedidoDto) {
        let itemsPedido = [];

        const produtosId = itemsPedidoDto.map(item => item.idProduto);

        if (produtosId.length === 0) {
            throw new Error("Pedido deve conter pelo menos um produto");
        }

        await this.produtoService.verificaSeProdutosPertencemAoMesmoRestaurante(produtosId);

        for (const itemPedido of itemsPedidoDto) {
            let produto = await this.produtoService.buscarPorId(itemPedido.idProduto);
            itemsPedido.push(new ItemPedido(null, produto.getId(), itemPedido.quantidade, produto.getPreco(), itemPedido.observacao));
        }

        return itemsPedido;
    }

    async buscaItensDePedido(idPedido) {
        try {
            const itemsPedido = await this.itemPedidoRepository.buscarItensDoPedido(idPedido);

            if (!itemsPedido || itemsPedido.length === 0) {
                throw new NotFoundError('Nenhum item de pedido encontrado.');
            }

            return itemsPedido;
        } catch (err) {
            throw err;
        }

    }
}
export default ItemPedidoService;