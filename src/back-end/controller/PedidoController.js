import express from 'express';
import bodyParser from 'body-parser';
import AuthMiddleware from '../config/security/AuthMiddleware.js';
import TokenService from '../services/TokenService.js';
import PedidoService from '../services/PedidoService.js';
import PedidoRegisterRequestDto  from '../model/pedido/dtos/PedidoRegisterRequestDto.js';
import ItemPedidoService from '../services/ItemPedidoService.js';

class PedidoController {
     constructor() {
            this.router = express.Router();
            this.router.use(bodyParser.json());
            this.authMiddleware = new AuthMiddleware();
            this.tokenService = new TokenService();
            this.pedidoService = new PedidoService();
            this.itemPedidoService = new ItemPedidoService();
            this.iniciaRotas();
        }

    iniciaRotas() {
        this.router.post("/registra",
            this.authMiddleware.autenticar.bind(this.authMiddleware),
            this.authMiddleware.autorizar('CLIENTE, RESTAURANTE'),
            this.registraPedido.bind(this)
        );
    }	

    async registraPedido(req, res) {
        try {
            const pedidoDto = new PedidoRegisterRequestDto(req.body);

            const pedido = this.pedidoService.converteDtoParaPedido(pedidoDto, req.usuario.id);
            const itemsPedido = await this.itemPedidoService.converteDtosParaItemPedido(pedidoDto.itemsPedidoDto);
            await this.pedidoService.registra(pedido, itemsPedido);

            res.status(201).json({ mensagem: "Pedido registrado com sucesso" });
        } catch (err) {
            throw err;
        }
    }
}   

export default PedidoController;