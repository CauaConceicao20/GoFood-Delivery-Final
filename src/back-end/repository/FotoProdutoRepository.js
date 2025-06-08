import Connection from "../database/Connection.js";
import { BadRequestError } from "../exception/GlobalExceptions.js";

class FotoProdutoRepository {
    constructor() {
        this.connection = new Connection();
    }

    async registrar(fotoProduto, idProduto, conn) {
        if(!conn) conn = await this.connection.connect();

        try {
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
}

export default FotoProdutoRepository;