import express from 'express';
import bodyParser from 'body-parser';
import AuthMiddleware from '../config/security/AuthMiddleware.js';
import ProdutoService from '../services/ProdutoService.js';
import ProdutoRegisterRequestDto from '../model/produto/dtos/ProdutoRegisterRequestDto.js';
import FotoProduto from '../model/produto/FotoProduto.js';
import Produto from '../model/produto/Produto.js';
import RestauranteService from '../services/RestauranteService.js';

class ProdutoController {

    constructor() {
        this.router = express.Router();
        this.router.use(bodyParser.json());
        this.produtoService = new ProdutoService();
        this.authMiddleware = new AuthMiddleware();
        this.restauranteService = new RestauranteService();

        this.iniciaRotas();
    }

    iniciaRotas() {
        this.router.post("/registra",
            this.authMiddleware.autenticar.bind(this.authMiddleware),
            this.authMiddleware.autorizar('RESTAURANTE'),
            this.registraProduto.bind(this)
        );
    }

    async registraProduto(req, res) {
        try {
            const usuarioId = req.usuario.id;
            const restaurante = await this.restauranteService.buscarRestauranteAssociadoAUsuario(usuarioId);
            const produtoDto = new ProdutoRegisterRequestDto(req.body);

            const fotoProduto = new FotoProduto(null, produtoDto.fotoProduto.nomeFoto, produtoDto.fotoProduto.descricaoFoto,
                produtoDto.fotoProduto.contentType, produtoDto.fotoProduto.urlFoto, produtoDto.fotoProduto.tamanhoFoto);

            const produto = new Produto(null, produtoDto.nome, produtoDto.descricao, produtoDto.preco, restaurante.getId(),
                produtoDto.categoriaId,
            );

            await this.produtoService.registrar(produto, fotoProduto);

            res.status(201).json({ mensagem: "Produto cadastrado com sucesso" });
        } catch (err) {
            throw err;
        }
    }
}

export default ProdutoController;