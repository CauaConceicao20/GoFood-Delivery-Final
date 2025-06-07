import Connection from "../database/Connection.js";

class RestaurantePagamentoRepository {

    constructor() {
        this.connection = new Connection();
    }

    async associaRestauranteEPagamento(restaurantePagamento) {
        let conn;
        try {
            conn = await this.connection.connect();

            await conn.run("BEGIN TRANSACTION");

            const result = await conn.run(
                `INSERT INTO restaurantes_forma_pagamento (restaurante_id, forma_pagamento_id) VALUES (?, ?)`,
                [restaurantePagamento.getIdRestaurante(), restaurantePagamento.getIdFormaPagamento()]
            );

            if (!result.changes) {
                throw new Error('Erro ao associar restaurante e pagamento');
            }

            await conn.run("COMMIT");
            return { success: true, message: "Usuário associado ao grupo com sucesso." };

        } catch (err) {
            await conn.run("ROLLBACK");
            throw err;
        }
    }
}

export default RestaurantePagamentoRepository;