import Connection from "../database/Connection.js";
import Grupo from "../model/usuario/Grupo.js";
import { NotFoundError } from "../exception/GlobalExceptions.js";

class GrupoRepository {

    constructor() {
        this.connection = new Connection();
    }

    async buscarTodosGrupos() {
        let conn;
        try {
            conn = await this.connection.connect();
            await conn.run("BEGIN TRANSACTION");
            const grupos = await conn.all(`SELECT * FROM grupos`);

            if (grupos.length === 0) {
                throw new NotFoundError("Nenhum grupo encontrado.");
            }

            await conn.run('COMMIT');

            return grupos.map(grupo => new Grupo(grupo.id, grupo.nome));

        } catch (err) {
            console.error(err);
            await conn.run('ROLLBACK');
            throw err;
        }
    }

    async buscarPorId(id) {
        let conn;
        try {
            conn = await this.connection.connect();

            await conn.run("BEGIN TRANSACTION");

            const grupo = await conn.get(`SELECT * FROM grupos WHERE id = ?`, [id]);

            if (!grupo) {
                throw new NotFoundError(`Grupo com ID ${id} não encontrado.`);
            }

            await conn.run('COMMIT');

            return new Grupo(grupo.id, grupo.nome);

        } catch (err) {
            console.error(err);
            await conn.run('ROLLBACK');
            throw err;
        }
    }

    async buscarPorNome(nomeGrupo) {
        let conn;
        try {
            conn = await this.connection.connect();
            await conn.run("BEGIN TRANSACTION");
            const grupo = await conn.get(`SELECT * FROM grupos WHERE nome = ?`, [nomeGrupo]);

            if (!grupo) {
                throw new NotFoundError(`Grupo com ID ${id} não encontrado.`);
            }

            await conn.run('COMMIT');
            return new Grupo(grupo.id, grupo.nome);

        } catch (err) {
            await conn.run("ROLLBACK");
            throw err;
        }
    }
}

export default GrupoRepository;