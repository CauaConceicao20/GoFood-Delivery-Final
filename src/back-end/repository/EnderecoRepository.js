import Connection from "../database/Connection.js";
import Cidade from "../model/endereco/Cidade.js";

class EnderecoRepository {

    constructor() {
        this.connection = new Connection();
    }

    async buscaTodasCidades() {
        try {
            const conn = await this.connection.connect();
            const result = await conn.all('SELECT * FROM cidades');
            return result;
        } catch (err) {
            throw err;
        }
    }

    async buscaCidadePorId(id) {
        try {
            const conn = await this.connection.connect();
            const result = await conn.get('SELECT * FROM cidades WHERE id = ?', [id]);
            return new Cidade(result.id, result.nome, result.estado_id);
        } catch (err) {
            throw err;
        }
    }

    async buscaEstadoPorId(id) {
        try {
            const conn = await this.connection.connect();
            const result = await conn.get(
                `SELECT e.*
             FROM estados e
             JOIN cidades c ON c.estado_id = e.id
             WHERE c.id = ?`,
                [id]
            );
            if (!result) {
                throw new NotFoundError('Estado não encontrado para a cidade informada.');
            }
            return result;
        } catch (err) {
            throw err;
        }
    }


}

export default EnderecoRepository