import Connection from "../database/Connection.js";
import Grupo from "../model/usuario/Grupo.js";
import { NotFoundError } from "../exception/GlobalExceptions.js";

class GrupoRepository {

    constructor() {
        this.connection = new Connection();
    }

    async buscarTodosGrupos(conn) {
        try {
            if(!conn) conn = await this.connection.connect();
            const grupos = await conn.all(`SELECT * FROM grupos`);

            if (grupos.length === 0) {
                throw new NotFoundError("Nenhum grupo encontrado.");
            }

            return grupos.map(grupo => new Grupo(grupo.id, grupo.nome));

        } catch (err) {
            console.error(err);
            throw err;
        }
    }

    async buscarPorId(id, conn) {
        try {
            if(!conn) conn = await this.connection.connect();

            const grupo = await conn.get(`SELECT * FROM grupos WHERE id = ?`, [id]);

            if (!grupo) {
                throw new NotFoundError(`Grupo com ID ${id} não encontrado.`);
            }

            return new Grupo(grupo.id, grupo.nome);
        } catch (err) {
            console.error(err);
            throw err;
        }
    }

    async buscarPorNome(nomeGrupo, conn) {
        try {
            if(!conn) conn = await this.connection.connect();
            const grupo = await conn.get(`SELECT * FROM grupos WHERE nome = ?`, [nomeGrupo]);

            if (!grupo) {
                throw new NotFoundError(`Grupo com ID ${id} não encontrado.`);
            }

            return new Grupo(grupo.id, grupo.nome);

        } catch (err) {
            throw err;
        }
    }
}

export default GrupoRepository;