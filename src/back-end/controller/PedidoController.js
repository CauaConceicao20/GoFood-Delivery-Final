import express from 'express';
import bodyParser from 'body-parser';
import AuthMiddleware from '../config/security/AuthMiddleware.js';
import TokenService from '../services/TokenService.js';
import PedidoService from '../services/PedidoService.js';
import PedidoRegisterRequestDto from '../model/pedido/dtos/PedidoRegisterRequestDto.js';
import ItemPedidoService from '../services/ItemPedidoService.js';
import RestauranteService from '../services/RestauranteService.js';
import UsuarioService from '../services/UsuarioService.js';
import PedidoResponseDto from '../model/pedido/dtos/PedidoResponseDto.js';
import { StatusPedidoEnum } from '../model/pedido/enums/StatusPedidoEnum.js';
import ProdutoService from '../services/ProdutoService.js';
import FormaPagamentoService from '../services/FormaPagamentoService.js';

class PedidoController {
    constructor() {
        this.router = express.Router();
        this.router.use(bodyParser.json());
        this.authMiddleware = new AuthMiddleware();
        this.tokenService = new TokenService();
        this.pedidoService = new PedidoService();
        this.itemPedidoService = new ItemPedidoService();
        this.restauranteService = new RestauranteService();
        this.usuarioService = new UsuarioService();
        this.produtoService = new ProdutoService();
        this.formaPagamentoService = new FormaPagamentoService();
        this.iniciaRotas();
    }

    iniciaRotas() {
        this.router.post("/registra",
            this.authMiddleware.autenticar.bind(this.authMiddleware),
            this.authMiddleware.autorizar(['CLIENTE']),
            this.registraPedido.bind(this)
        );

        this.router.get("/pedidosDeRestaurante/:id",
            this.authMiddleware.autenticar.bind(this.authMiddleware),
            this.authMiddleware.autorizar(['RESTAURANTE']),
            this.buscarPedidosDoRestaurante.bind(this)
        );

        this.router.put('/atualizaStatusPedido/:id/status',
            this.authMiddleware.autenticar.bind(this.authMiddleware),
            this.authMiddleware.autorizar(['RESTAURANTE']),
            this.atualizarStatusPedido.bind(this)
        );
    }

    async registraPedido(req, res) {
        try {
            const pedidoDto = new PedidoRegisterRequestDto(req.body);

            const pedido = this.pedidoService.converteDtoParaPedido(pedidoDto, req.usuario.id);
            pedido.setStatusPedido(StatusPedidoEnum.CRIADO);
            const itemsPedido = await this.itemPedidoService.converteDtosParaItemPedido(pedidoDto.itemsPedidoDto);
            await this.pedidoService.registra(pedido, itemsPedido);

            res.status(201).json({ mensagem: "Pedido registrado com sucesso" });
        } catch (err) {
            throw err;
        }
    }

    async buscarPedidosDoRestaurante(req, res) {
        try {
            const pedidos = await this.pedidoService.buscarPedidosDoRestaurante(req.params.id);

            const pedidosCompletos = await Promise.all(pedidos.map(async (pedido) => {
                const usuario = await this.usuarioService.buscarPorId(pedido.getUsuarioId());
                const restaurante = await this.restauranteService.buscarPorId(pedido.getRestauranteId());
                const metodoDePagamento = await this.formaPagamentoService.buscarPorId(pedido.getIdMetodoPagamento());

                const itensPedido = await this.itemPedidoService.buscaItensDePedido(pedido.getId());

                const idsProdutosUnicos = [...new Set(itensPedido.map(item => item.idProduto))];
                const produtos = await Promise.all(
                    idsProdutosUnicos.map(id => this.produtoService.buscarPorId(id))
                );

                return new PedidoResponseDto(pedido, usuario, restaurante, produtos, metodoDePagamento, itensPedido);
            }));
            res.status(200).json(pedidosCompletos);
        } catch (err) {
            throw err;
        }
    }

    async atualizarStatusPedido(req, res) {
        try {
            const pedidoId = req.params.id;
            const status = req.body.status?.toUpperCase();

            if (!status) {
                return res.status(400).json({ erro: 'Status é obrigatório.' });
            }

            const pedido = await this.pedidoService.buscarPorId(pedidoId);

            if (!pedido) {
                return res.status(404).json({ erro: 'Pedido não encontrado.' });
            }
            await this.pedidoService.atualizaStatusDoPedido(pedido, status);

            return res.status(200).json({ mensagem: 'Status atualizado com sucesso.' });
        } catch (err) {
            throw err;
        }
    }
}

export default PedidoController;