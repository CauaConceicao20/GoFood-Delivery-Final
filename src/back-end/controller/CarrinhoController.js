import express from 'express';
import bodyParser from 'body-parser';
import AuthMiddleware from '../config/security/AuthMiddleware.js';
import CarrinhoService from '../services/CarrinhoService.js';
import TokenService from '../services/TokenService.js';
import RestauranteService from '../services/RestauranteService.js';
import ItemCarrinho from '../model/carrinho/ItemCarrinho.js';
import CarrinhoAddItemRequestDto from '../model/carrinho/dtos/CarrinhoAddItemRequestDto.js';
import UsuarioService from '../services/UsuarioService.js';
import CarrinhoResponseDto from '../model/carrinho/dtos/CarrinhoResponseDto.js';
import ProdutoService from '../services/ProdutoService.js';
import FotoService from '../services/FotoService.js';
import { NotFoundError } from '../exception/GlobalExceptions.js';

class CarrinhoController {
    constructor() {
        this.router = express.Router();
        this.router.use(bodyParser.json());
        this.carrinhoService = new CarrinhoService();
        this.restauranteService = new RestauranteService();
        this.produtoService = new ProdutoService();
        this.authMiddleware = new AuthMiddleware();
        this.usuarioService = new UsuarioService();
        this.tokenService = new TokenService();
        this.fotoService = new FotoService();
        this.iniciaRotas();
    }

    iniciaRotas() {
        this.router.post("/adicionaAoCarrinho",
            this.authMiddleware.autenticar.bind(this.authMiddleware),
            this.authMiddleware.autorizar(['CLIENTE']),
            this.adicionarProduto.bind(this)
        );

        this.router.get("/buscarCarrinho",
            this.authMiddleware.autenticar.bind(this.authMiddleware),
            this.authMiddleware.autorizar(['CLIENTE']),
            this.buscarCarrinhoComItensPorId.bind(this)
        );

        this.router.put("/aumentarQuantidade",
            this.authMiddleware.autenticar.bind(this.authMiddleware),
            this.authMiddleware.autorizar(['CLIENTE']),
            this.aumentarQuantidadeDeItemDoCarrinho.bind(this)
        );

        this.router.put("/diminuirQuantidade",
            this.authMiddleware.autenticar.bind(this.authMiddleware),
            this.authMiddleware.autorizar(['CLIENTE']),
            this.diminuirQuantidadeDeItemDoCarrinho.bind(this)
        );

        this.router.delete("/removerItem/:produtoId",
            this.authMiddleware.autenticar.bind(this.authMiddleware),
            this.authMiddleware.autorizar(['CLIENTE']),
            this.deletarItemDoCarrinho.bind(this)
        );
    }

    async adicionarProduto(req, res) {
        try {
            const itemCarinhoDto = new CarrinhoAddItemRequestDto(req.body);
            const usuario = await this.usuarioService.buscarPorId(req.usuario.id);
            const carrinho = await this.carrinhoService.buscarCarrinhoDoUsuario(usuario.getId());
            await this.carrinhoService.adicionarProdutoAoCarrinho(new ItemCarrinho(itemCarinhoDto.produtoId,
                carrinho.getId(), itemCarinhoDto.quantidade, 0), usuario);

            res.status(200).json({ mensagem: "Produto adicionado ao carrinho com sucesso" });
        } catch (err) {
            throw err;
        }
    }

    async buscarCarrinhoComItensPorId(req, res) {
        try {
            const usuario = await this.usuarioService.buscarPorId(req.usuario.id);

            const carrinho = await this.carrinhoService.buscarCarrinhoDoUsuario(usuario.getId());
            const carrinhoComItens = await this.carrinhoService.buscarCarrinhoComItens(carrinho);

            const itensComProdutoEFoto = await Promise.all(
                (carrinhoComItens.itens || []).map(async (item) => {
                    const produto = await this.produtoService.buscarPorId(item.produto_id);
                    let fotoUrl = null;
                    try {
                        const foto = await this.fotoService.buscarFotoDeProdutoPorId(produto.getId());
                        fotoUrl = foto ? foto.url : null;
                    } catch (err) {
                        fotoUrl = null;
                    }
                    return { produto, item, fotoUrl };
                })
            );
            const carrinhoDto = new CarrinhoResponseDto(
                carrinhoComItens,
                itensComProdutoEFoto,
                usuario.getId()
            );

            res.status(200).json(carrinhoDto);
        } catch (err) {
            console.error(err);
            throw err;
        }
    }

    async aumentarQuantidadeDeItemDoCarrinho(req, res) {
        try {
            await this.usuarioService.buscarPorId(req.usuario.id);

            const carrinho = await this.carrinhoService.buscarCarrinhoDoUsuario(req.usuario.id);
        
            const produto = await this.produtoService.buscarPorId(req.body.produtoId);
            await this.carrinhoService.aumentarQuantidadeDeItemDoCarrinho(produto, carrinho);
            res.status(200).json({ mensagem: "Quantidade do item aumentada com sucesso" });
        } catch (err) {
            throw err;
        }
    }

    async diminuirQuantidadeDeItemDoCarrinho(req, res) {
        try {
            await this.usuarioService.buscarPorId(req.usuario.id);

            const carrinho = await this.carrinhoService.buscarCarrinhoDoUsuario(req.usuario.id);
        
            const produto = await this.produtoService.buscarPorId(req.body.produtoId);
            await this.carrinhoService.diminuirQuantidadeDeItemDoCarrinho(produto, carrinho);
            res.status(200).json({ mensagem: "Quantidade do item diminuida com sucesso" });
        } catch (err) {
            throw err;
        }
    }

    async deletarItemDoCarrinho(req, res) {
        try {
            await this.usuarioService.buscarPorId(req.usuario.id);

            const carrinho = await this.carrinhoService.buscarCarrinhoDoUsuario(req.usuario.id);

            const produto = await this.produtoService.buscarPorId(req.body.produtoId);
            await this.carrinhoService.deletarItemDoCarrinho(produto, carrinho);
            res.status(200).json({ mensagem: "Item deletado do carrinho com sucesso" });
        } catch (err) {
            throw err;
        }
    }
}

export default CarrinhoController;