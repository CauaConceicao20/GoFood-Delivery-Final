import Connection from "../database/Connection.js";
import { BadRequestError, NotFoundError } from "../exception/GlobalExceptions.js";
import FormaPagamento from '../model/pagamento/FormaPagamento.js';

class RestaurantePagamentoRepository {

    constructor() {
        this.connection = new Connection();
    }

    async associaRestauranteEPagamento(restaurantePagamento, conn) {
        try {
            if (!conn) conn = await this.connection.connect();

            const result = await conn.run(
                `INSERT INTO restaurantes_forma_pagamento (restaurante_id, forma_pagamento_id) VALUES (?, ?)`,
                [restaurantePagamento.getIdRestaurante(), restaurantePagamento.getIdFormaPagamento()]
            );

            if (!result.changes) {
                throw new BadRequestError('Erro ao associar restaurante e pagamento');
            }

            return { success: true, message: "Usuário associado ao grupo com sucesso." };

        } catch (err) {
            throw err;
        }
    }

    async buscaFormasDePagamentoAssociadasAoRestaurante(id) {
        try {
            const conn = await this.connection.connect();
            const formasPagamento = await conn.all(
                `SELECT fp.id, fp.nome
        FROM formas_pagamento fp
        INNER JOIN restaurantes_forma_pagamento rfp ON fp.id = rfp.forma_pagamento_id
        WHERE rfp.restaurante_id = ?`,
                [id]
            );

            if (!formasPagamento || formasPagamento.length === 0) {
                throw new NotFoundError(`Nenhuma forma de pagamento encontrada para o restaurante com ID ${id}.`);
            }

            return formasPagamento.map((formaPagamento) => new FormaPagamento(formaPagamento.id, formaPagamento.nome));
        } catch (err) {
            throw err;
        }
    }
}

export default RestaurantePagamentoRepository;