import Connection from "../database/Connection.js";
import Carrinho from "../model/carrinho/Carrinho.js";

class CarrinhoRepository {

    constructor() {
        this.connection = new Connection();
    }

    async registra(carrinho, idUsuario) {
        try {
            const conn = await this.connection.connect();

            await conn.run("BEGIN TRANSACTION");

            const result = await conn.run(`INSERT INTO carrinhos (quantidade_total_itens, sub_total, usuario_id) VALUES (?, ?, ?)`,
                [carrinho.getQuantidadeTotalDeItems(), carrinho.getSubTotal(), idUsuario]);

            if (result.changes === 0) {
                throw new Error('Erro ao criar carrinho');
            }

            await conn.run("COMMIT");

            return new Carrinho(result.lastID, carrinho.getQuantidadeTotalDeItems(), carrinho.getSubTotal());

        } catch (err) {
            console.error(err);
            await conn.run("ROLLBACK");
            throw new Error(`Erro ao registrar carrinho: ${err.message}`);
        }
    }
}

export default CarrinhoRepository;