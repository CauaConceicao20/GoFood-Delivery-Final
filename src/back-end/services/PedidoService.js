import Pedido from '../model/pedido/Pedido.js';
import PedidoRepository from '../repository/PedidoRepository.js';
import ProdutoService from './ProdutoService.js';
import RestauranteService from './RestauranteService.js';
import RestaurantePagamentoService from './RestaurantePagamentoService.js';
import { PaymentMethodNotAcceptedError, NotFoundError, PedidoStatusUpdateError } from '../exception/GlobalExceptions.js';

class PedidoService {

    constructor() {
        this.pedidoRepository = new PedidoRepository();
        this.produtoService = new ProdutoService();
        this.restauranteService = new RestauranteService();
        this.restaurantePagamentoService = new RestaurantePagamentoService();
    }

    converteDtoParaPedido(pedidoDto, idUsuario) {
        try {
            const dataCriacao = this.dataHoraAtual = new Date().toLocaleString('sv-SE', { timeZone: 'America/Sao_Paulo' }).replace(' ', 'T');
            const codigo = Math.floor(Math.random() * 1000000).toString().padStart(6, '0');

            return new Pedido(null, codigo, 0, 0, 0, dataCriacao, null, null, null, pedidoDto.idMetodoPagamento, idUsuario, null);
        } catch (err) {
            throw err;
        }
    }

    async registra(pedido, itemsPedidoDto) {
        let produto = null
        let condicao = false;

        try {
            for (const itemPedido of itemsPedidoDto) {
                produto = await this.produtoService.buscarPorId(itemPedido.getIdProduto());
                itemPedido.setPrecoUnitario(produto.getPreco());
                let subtotal = produto.getPreco() * itemPedido.getQuantidade();
                pedido.setSubTotal(pedido.getSubTotal() + subtotal);
            }

            const restaurante = await this.restauranteService.buscarPorId(produto.getIdRestaurante());
            const formasDePagamento = await this.restaurantePagamentoService.buscaFormasDePagamentoAssociadasAoRestaurante(produto.getIdRestaurante());

            for (const formaDePagamento of formasDePagamento) {
                if (formaDePagamento.getId() === pedido.getIdMetodoPagamento()) {
                    condicao = true;
                }
            }

            if (!condicao) throw new PaymentMethodNotAcceptedError(`O ${restaurante.getNome()} não aceita esse metodo de pagamento`);

            pedido.setRestauranteId(produto.getIdRestaurante());
            pedido.setTaxaFrete(restaurante.getTaxaFrete());
            pedido.setValorTotal(pedido.getSubTotal() + pedido.getTaxaFrete());

            return await this.pedidoRepository.registrar(pedido, itemsPedidoDto);
        } catch (err) {
            throw err;
        }
    }

    async buscarPorId(id) {
        try {
            const pedido = await this.pedidoRepository.buscarPorId(id)
            if (!pedido) {
                throw new NotFoundError(`Pedido com id ${id} não encontrado`);
            }
            return pedido;
        } catch (err) {
            throw err;
        }
    }

    async atualizaStatusDoPedido(pedido, novoStatus) {
        try {
            const statusAtual = pedido.getStatusPedido();

            if (['CONCLUIDA', 'CANCELADO'].includes(statusAtual)) {
                throw new PedidoStatusUpdateError(`Já está como ${statusAtual.toLowerCase()} e não pode ser alterado`);
            }

            const statusPermitidos = ['CONFIRMADO', 'CANCELADO', 'ENTREGUE', 'CONCLUIDA'];

            if (!statusPermitidos.includes(novoStatus)) {
                throw new PedidoStatusUpdateError('Status do pedido inválido');
            }

            if (novoStatus === 'CONCLUIDA' && statusAtual !== 'ENTREGUE') {
                throw new PedidoStatusUpdateError('Só é possível concluir um pedido que já foi entregue');
            }

            if (novoStatus === 'ENTREGUE') {
                pedido.setDataEntrega(this.geraDataAtual());
            }

            if (novoStatus === 'CANCELADO') {
                if (pedido.getDataCancelamento()) {
                    throw new PedidoStatusUpdateError('Pedido já foi cancelado');
                }
                pedido.setDataCancelamento(this.geraDataAtual());
            }

            if (novoStatus === 'CONFIRMADO') {
                if (pedido.getDataConfirmacao()) {
                    throw new PedidoStatusUpdateError('Pedido já foi confirmado');
                }
                pedido.setDataConfirmacao(this.geraDataAtual());
            }

            pedido.setStatusPedido(novoStatus);
            await this.pedidoRepository.atualizaStatusDoPedido(pedido);
        } catch (err) {
            throw err;
        }
    }

    async buscarPedidosDoRestaurante(idRestaurante) {
        try {
            const pedidos = await this.pedidoRepository.buscarPedidosDoRestaurante(idRestaurante);

            if (!pedidos || pedidos.length === 0) {
                throw new NotFoundError('Nenhum pedido encontrado.');
            }

            return pedidos;
        } catch (err) {
            throw err;
        }
    }


    geraDataAtual() {
        return new Date().toLocaleString('sv-SE', { timeZone: 'America/Sao_Paulo' }).replace(' ', 'T');
    }
}


export default PedidoService;