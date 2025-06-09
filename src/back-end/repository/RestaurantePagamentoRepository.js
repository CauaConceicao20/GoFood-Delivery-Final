import Connection from "../database/Connection.js";

class RestaurantePagamentoRepository {

    constructor() {
        this.connection = new Connection();
    }

    async associaRestauranteEPagamento(restaurantePagamento, conn) {
        try {
            if(!conn) conn = await this.connection.connect();

            const result = await conn.run(
                `INSERT INTO restaurantes_forma_pagamento (restaurante_id, forma_pagamento_id) VALUES (?, ?)`,
                [restaurantePagamento.getIdRestaurante(), restaurantePagamento.getIdFormaPagamento()]
            );

            if (!result.changes) {
                throw new Error('Erro ao associar restaurante e pagamento');
            }

            return { success: true, message: "Usuário associado ao grupo com sucesso." };

        } catch (err) {
            throw err;
        }
    }
}

export default RestaurantePagamentoRepository;