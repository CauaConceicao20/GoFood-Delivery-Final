import express from 'express';
import bodyParser from 'body-parser';
import multer from 'multer';
import { unlink } from 'fs/promises';
import path from 'path';
import ConfigMulter from '../config/ConfigMulter.js';
import AuthMiddleware from '../config/security/AuthMiddleware.js';
import ProdutoService from '../services/ProdutoService.js';
import ProdutoRegisterRequestDto from '../model/produto/dtos/ProdutoRegisterRequestDto.js';
import Foto from '../model/foto/Foto.js';
import Produto from '../model/produto/Produto.js';
import RestauranteService from '../services/RestauranteService.js';
import UsuarioService from '../services/UsuarioService.js';
import ProdutoResponseDto from '../model/produto/dtos/ProdutoResponseDto.js';
import FotoRegisterRequestDto from '../model/foto/dtos/FotoRegisterRequestDto.js';
import FotoService from '../services/FotoService.js';
import CategoriaProdutoService from '../services/CategoriaProdutoService.js';

class ProdutoController {
    constructor() {
        this.router = express.Router();
        this.configMulter = new ConfigMulter().getUploader().single('arquivo');
        this.usuarioService = new UsuarioService();
        this.restauranteService = new RestauranteService();
        this.authMiddleware = new AuthMiddleware();
        this.produtoService = new ProdutoService();
        this.categoriaService = new CategoriaProdutoService();
        this.fotoService = new FotoService();

        this.iniciaRotas();
    }

    iniciaRotas() {
        this.router.post('/register',
            this.configMulter,
            this.authMiddleware.autenticar.bind(this.authMiddleware),
            this.authMiddleware.autorizar('RESTAURANTE'),
            this.registraProduto.bind(this)
        );

        this.router.get("/buscarTodos",
            this.authMiddleware.autenticar.bind(this.authMiddleware),
            this.authMiddleware.autorizar('CLIENTE'),
            this.buscarTodosProdutos.bind(this)
        );
    }

    async registraProduto(req, res) {
        try {
            const usuarioId = req.usuario.id;
            await this.usuarioService.buscarPorId(usuarioId);
            const produtoDto = new ProdutoRegisterRequestDto(JSON.parse(req.body.produto));
            const restaurante = await this.restauranteService.buscarPorId(produtoDto.restauranteId);
            const file = req.file;

            if (!file) {
                return res.status(400).json({ erro: 'Arquivo da foto é obrigatório' });
            }

            const fotoProdutoDto = new FotoRegisterRequestDto(file);

            const fotoProduto = new Foto(null, fotoProdutoDto.nome, fotoProdutoDto.content_type,
                fotoProdutoDto.url, fotoProdutoDto.tamanho
            );

            const produto = new Produto(null, produtoDto.nome, produtoDto.descricao, produtoDto.preco,
                restaurante.getId(), produtoDto.categoriaId,
            );

            await this.produtoService.registrar(produto, fotoProduto);
            res.status(201).json({ mensagem: "Produto cadastrado com sucesso" });

        } catch (err) {
            if (req.file) {
                const uploadsDir = path.resolve(path.dirname(''), 'uploads');
                const filePath = path.join(uploadsDir, req.file.filename);
                try {
                    await unlink(filePath);
                } catch (e) {
                    console.error('Erro ao remover arquivo órfão:', e);
                }
            }
            throw (err);
        }
    }

    async buscarTodosProdutos(req, res) {
        try {
            const produtos = await this.produtoService.buscarTodos();

            const produtosDto = await Promise.all(produtos.map(async (produto) => {
                const categoria = await this.categoriaService.buscarPorId(produto.getIdCategoria());
                const restaurante = await this.restauranteService.buscarPorId(produto.getIdRestaurante());
                const foto = await this.fotoService.buscarFotoDeProdutoPorId(produto.getId());
                return new ProdutoResponseDto(produto, categoria, restaurante, foto);
            }));
            res.status(200).json(produtosDto);
        } catch (err) {
            throw err;
        }
    }
}

export default ProdutoController;