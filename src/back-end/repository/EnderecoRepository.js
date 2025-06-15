import Connection from "../database/Connection.js";

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
}

export default EnderecoRepository