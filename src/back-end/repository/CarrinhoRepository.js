import Connection from "../database/Connection.js";
import Carrinho from "../model/carrinho/Carrinho.js";

class CarrinhoRepository {

    constructor() {
        this.connection = new Connection();
    }

    async registra(carrinho, idUsuario) {
        let conn;
        try {
            conn = await this.connection.connect();

            await conn.run("BEGIN TRANSACTION");

            const result = await conn.run(`INSERT INTO carrinhos (quantidade_total_itens, sub_total, usuario_id) VALUES (?, ?, ?)`,
                [carrinho.getQuantidadeTotalDeItems(), carrinho.getSubTotal(), idUsuario]);

            if (!result.changes) {
                throw new Error('Erro ao criar carrinho');
            }

            await conn.run("COMMIT");
            
            return carrinho;

        } catch (err) {
            await conn.run("ROLLBACK");
            throw err;
        }
    }
}

export default CarrinhoRepository;