import Pedido from '../model/pedido/Pedido.js';
import PedidoRepository from '../repository/PedidoRepository.js';
import ProdutoService from './ProdutoService.js';
import RestauranteService from './RestauranteService.js';

class PedidoService {

    constructor() {
        this.pedidoRepository = new PedidoRepository();
        this.produtoService = new ProdutoService();
        this.restauranteService = new RestauranteService();
    }

    converteDtoParaPedido(pedidoDto, idUsuario) {
        try {
            const dataCriacao = this.dataHoraAtual = new Date().toLocaleString('sv-SE', { timeZone: 'America/Sao_Paulo' }).replace(' ', 'T');
            const codigo = Math.floor(Math.random() * 1000000).toString().padStart(6, '0');

            return new Pedido(null, codigo, null, 0, 0, 0, dataCriacao, null, null, null, pedidoDto.idMetodoPagamento, idUsuario, null);
        } catch (err) {
            throw err;
        }
    }


    async registra(pedido, itemsPedidoDto) {
        let produto = null
        try {
            for (const itemPedido of itemsPedidoDto) {
                produto = await this.produtoService.buscarPorId(itemPedido.getIdProduto());
                itemPedido.setPrecoUnitario(produto.getPreco());
                let subtotal = produto.getPreco() * itemPedido.getQuantidade();
                pedido.setSubTotal(pedido.getSubTotal() + subtotal);
            }
            const restaurante = await this.restauranteService.buscarPorId(produto.getIdRestaurante());
            pedido.setProdutosId(itemsPedidoDto.map(item => item.getIdProduto()));
            pedido.setRestauranteId(produto.getIdRestaurante());
            pedido.setTaxaFrete(restaurante.getTaxaFrete());
            pedido.setValorTotal(pedido.getSubTotal() + pedido.getTaxaFrete());

            return await this.pedidoRepository.registrar(pedido, itemsPedidoDto);
        } catch (err) {
            throw err;
        }
    }
}

export default PedidoService;