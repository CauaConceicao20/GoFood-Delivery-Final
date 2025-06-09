import Connection from "../database/Connection.js";
import FotoProdutoRepository from "./FotoProdutoRepository.js";
import CategoriaProdutoRepository from "./CategoriaProdutoRepository.js";

class ProdutoRepository {

    constructor() {
        this.connection = new Connection();
        this.fotoProdutoRepository = new FotoProdutoRepository();
        this.categoriaProdutoRepository = new CategoriaProdutoRepository();
    }

    async registrar(produto, fotoProduto) {
        let conn;
        try {
            conn = await this.connection.connect();
            await conn.run('BEGIN TRANSACTION');

            let produtoRegistrado = await this.create(produto, conn);
            await this.fotoProdutoRepository.registrar(fotoProduto, produtoRegistrado.getId(), conn);

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
        if(!conn) conn = await this.connection.connect();

        try {
            await this.categoriaProdutoRepository.buscarPorId(produto.getIdCategoria(), conn);
            const result = await conn.run(
                'INSERT INTO produtos (nome, preco, descricao, restaurante_id, ativo, categoria_id) VALUES (?, ?, ?, ?, ?, ?)',
                [produto.getNome(), produto.getPreco(), produto.getDescricao(), produto.getIdRestaurante(), produto.getAtivo(),
                     produto.getIdCategoria()]
            );
            produto.setId(result.lastID);

            return produto;
        }catch (err) {
            throw err;
        }
    }
}

export default ProdutoRepository;