import Connection from "../database/Connection.js";
import Grupo from "../model/usuario/Grupo.js";

class GrupoRepository {

    constructor() {
        this.connection = new Connection();
    }

    async buscarTodosGrupos() {
        try {
            const conn = await this.connection.connect();
            await conn.run("BEGIN TRANSACTION");
            const grupos = await conn.all(`SELECT * FROM grupos`);

            if (grupos.length === 0) {
                throw new Error("Nenhum grupo encontrado.");
            }

            await conn.run('COMMIT');

            return grupos.map(grupo => new Grupo(grupo.id, grupo.nome));

        } catch (err) {
            await conn.run('ROLLBACK');
            throw new Error(`${err.message}`);
        }
    }

    async buscarPorId(id) {
        try {
            const conn = await this.connection.connect();

            await conn.run("BEGIN TRANSACTION");

            const grupo = await conn.get(`SELECT * FROM grupos WHERE id = ?`, [id]);

            if (!grupo) {
                throw new Error(`Grupo com ID ${id} não encontrado.`);
            }

            await conn.run('COMMIT');
            
            return new Grupo(grupo.id, grupo.nome);

        } catch (err) {
            await conn.run('ROLLBACK');
            throw new Error(`${err.message}`);
        }
    }

    async buscarPorNome(nomeGrupo) {
        try {
            const conn = await this.connection.connect();
            await conn.run("BEGIN TRANSACTION");
            const grupo = await conn.get(`SELECT * FROM grupos WHERE nome = ?`, [nomeGrupo]);

            if (!grupo) {
                throw new Error(`Grupo com ID ${id} não encontrado.`);
            }

            await conn.run('COMMIT');
            return new Grupo(grupo.id, grupo.nome);

        } catch (err) {
            await conn.run('ROLLBACK');
            throw new Error(`${err.message}`);
        }
    }
}

export default GrupoRepository;