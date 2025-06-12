import express from 'express';
import bodyParser from 'body-parser';
import AuthMiddleware from '../config/security/AuthMiddleware.js';
import CarrinhoService from '../services/CarrinhoService.js';
import TokenService from '../services/TokenService.js';
import RestauranteService from '../services/RestauranteService.js';
import ItemCarrinho from '../model/carrinho/ItemCarrinho.js';
import CarrinhoAddItemRequestDto from '../model/carrinho/dtos/CarrinhoAddItemRequestDto.js';
import UsuarioService from '../services/UsuarioService.js';

class CarrinhoController {
    constructor() {
        this.router = express.Router();
        this.router.use(bodyParser.json());
        this.carrinhoService = new CarrinhoService();
        this.restauranteService = new RestauranteService();
        this.authMiddleware = new AuthMiddleware();
        this.usuarioService = new UsuarioService();
        this.tokenService = new TokenService();

        this.iniciaRotas();
    }

    iniciaRotas() {
        this.router.post("/adicionaAoCarrinho",
            this.authMiddleware.autenticar.bind(this.authMiddleware),
            this.authMiddleware.autorizar('CLIENTE'),
            this.adicionarProduto.bind(this)
        );
    }

    async adicionarProduto(req, res) {
        try {
            const itemCarinhoDto = new CarrinhoAddItemRequestDto(req.body);
            const usuario = await this.usuarioService.buscarPorId(req.usuario.id);
            const carrinho = await this.carrinhoService.buscarCarrinhoDoUsuario(usuario.getId());
            await this.carrinhoService.adicionarProdutoAoCarrinho(new ItemCarrinho(itemCarinhoDto.produtoId,
                 carrinho.getId(), itemCarinhoDto.quantidade), usuario);

            res.status(200).json({ mensagem: "Produto adicionado ao carrinho com sucesso" });
        } catch (err) {
            throw err;
        }
    }
}

export default CarrinhoController