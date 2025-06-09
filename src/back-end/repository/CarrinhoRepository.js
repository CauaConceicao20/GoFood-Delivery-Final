import Connection from "../database/Connection.js";
import Carrinho from "../model/carrinho/Carrinho.js";

class CarrinhoRepository {

    constructor() {
        this.connection = new Connection();
    }

    async create(carrinho, idUsuario, conn) {
        try {
           if(!conn) conn = await this.connection.connect();

            const result = await conn.run(`INSERT INTO carrinhos (quantidade_total_itens, sub_total, usuario_id) VALUES (?, ?, ?)`,
                [carrinho.getQuantidadeTotalDeItems(), carrinho.getSubTotal(), idUsuario]);

            if (!result.changes) {
                throw new Error('Erro ao criar carrinho');
            }
            
            return carrinho;
        } catch (err) {
            throw err;
        }
    }
}

export default CarrinhoRepository;