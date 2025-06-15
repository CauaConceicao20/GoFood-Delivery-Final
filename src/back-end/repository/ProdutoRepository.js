import Connection from "../database/Connection.js";
import FotoProdutoRepository from "./FotoProdutoRepository.js";
import CategoriaProdutoRepository from "./CategoriaProdutoRepository.js";
import Produto from "../model/produto/Produto.js";
import { BadRequestError } from "../exception/GlobalExceptions.js";

class ProdutoRepository {

    constructor() {
        this.connection = new Connection();
        this.categoriaProdutoRepository = new CategoriaProdutoRepository();
    }

    async registrar(produto, foto) {
        let conn;
        try {
            conn = await this.connection.connect();
            await conn.run('BEGIN TRANSACTION');

            let produtoRegistrado = await this.create(produto, conn);

            await conn.run(
                `INSERT INTO fotos_produto (nome, content_type, tamanho, url, produto_id)
                 VALUES (?, ?, ?, ?, ?)`,
                [foto.getNome(), foto.getContentType(), foto.getTamanho(), foto.getUrl(), produtoRegistrado.getId()]
            );

            await conn.run('COMMIT');

            return produtoRegistrado;
        } catch (err) {
            if (conn) {
                await conn.run('ROLLBACK');
            }
            throw err;
        }
    }

    async create(produto, conn) {
        if (!conn) conn = await this.connection.connect();

        try {
            await this.categoriaProdutoRepository.buscarPorId(produto.getIdCategoria(), conn);
            const result = await conn.run(
                'INSERT INTO produtos (nome, preco, descricao, restaurante_id, ativo, categoria_id) VALUES (?, ?, ?, ?, ?, ?)',
                [produto.getNome(), produto.getPreco(), produto.getDescricao(), produto.getIdRestaurante(), produto.getAtivo(),
                produto.getIdCategoria()]
            );
            produto.setId(result.lastID);

            return produto;
        } catch (err) {
            throw err;
        }
    }

    async buscarTodos() {
        const conn = await this.connection.connect();
        try {
            const produtos = await conn.all('SELECT * FROM produtos');

            if (!produtos || produtos.length === 0) {
                throw new BadRequestError('Nenhum produto encontrado.');
            }

            return produtos.map(produto => new Produto(produto.id, produto.nome, produto.descricao, produto.preco,
                produto.restaurante_id, produto.categoria_id));
        } catch (err) {
            throw err;
        }

    }

    async buscarPorId(id, conn) {
        try {
            if (!conn) conn = await this.connection.connect();

            const produto = await conn.get('SELECT * FROM produtos WHERE id = ?', [id]);

            if (!produto) {
                throw new BadRequestError(`Produto com ID ${id} não encontrado.`);
            }

            return new Produto(produto.id, produto.nome, produto.descricao, produto.preco,
                produto.restaurante_id, produto.categoria_id);
        } catch (err) {
            throw err;
        }
    }
}

export default ProdutoRepository;