import Connection from "../database/Connection.js";
import { BadRequestError, NotFoundError } from "../exception/GlobalExceptions.js";
import Foto from "../model/foto/Foto.js";

class FotoProdutoRepository {
    constructor() {
        this.connection = new Connection();
    }

    async registrar(fotoProduto, idProduto, conn) {
        try {
            if (!conn) conn = await this.connection.connect();
            const result = await conn.run(
                'INSERT INTO fotos_produto (nome, descricao, content_type, tamanho, url, produto_id) VALUES (?, ?, ?, ?, ?, ?)',
                [fotoProduto.getNome(), fotoProduto.getDescricao(), fotoProduto.getContentType(), fotoProduto.getTamanho(),
                fotoProduto.getUrl(), idProduto]
            );

            if (!result.changes) {
                throw new BadRequestError('Erro ao registrar foto do produto');
            }

            fotoProduto.setId(result.lastID);

            return fotoProduto;

        } catch (err) {
            throw err;
        }
    }

    async buscarFotoDeProdutoPorId(id, conn) {
        try {
            if (!conn) conn = await this.connection.connect();
            const result = await conn.get(
                'SELECT * FROM fotos WHERE entidade_id = ? AND entidade_tipo = "PRODUTO"',
                [id]
            );

            if (!result) {
                return null
            }

            return new Foto(result.id, result.nome, result.content_type,
                result.url, result.tamanho)

        } catch (err) {
            throw err;
        }
    }

    async buscarFotoDeRestaurantePorId(id, conn) {
        try {
            if (!conn) conn = await this.connection.connect();
            const result = await conn.get(
                'SELECT * FROM fotos WHERE entidade_id = ? AND entidade_tipo = "RESTAURANTE"',
                [id]
            );

            if (!result) {
                return null
            }

            return new Foto(result.id, result.nome, result.content_type,
                result.url, result.tamanho)

        } catch (err) {
            throw err;
        }
    }
}

export default FotoProdutoRepository;