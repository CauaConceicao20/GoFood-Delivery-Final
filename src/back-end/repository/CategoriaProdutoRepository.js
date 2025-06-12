import Connection from "../database/Connection.js";
import Categoria from "../model/produto/Categoria.js";

class CategoriaProdutoRepository {
    constructor() {
        this.connection = new Connection();
    }

    async buscarPorId(id, conn) {
        try {
            if (!conn) conn = await this.connection.connect();
            const result = await conn.get(
                'SELECT * FROM categorias WHERE id = ?',
                [id]
            );

            if (!result) {
                throw new BadRequestError('Categoria não encontrada');
            }

            return new Categoria(result.id, result.nome);

        } catch (err) {
            throw err;
        }
    }
}

export default CategoriaProdutoRepository;