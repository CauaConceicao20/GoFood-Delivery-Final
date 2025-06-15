import Connection from "../database/Connection.js";
import GrupoRepository from "./GrupoRepository.js";
import Grupo from "../model/usuario/Grupo.js";
import { BadRequestError } from "../exception/GlobalExceptions.js";

class UsuarioGrupoRepository {

    constructor() {
        this.connection = new Connection();
        this.grupoRepository = new GrupoRepository();
    }

    async associaUsuarioAoGrupo(usuarioGrupo, conn) {
        try {
            if(!conn) conn = await this.connection.connect();

            await conn.run(
                `INSERT INTO usuarios_grupo (usuario_id, grupo_id) VALUES (?, ?)`,
                [usuarioGrupo.getIdUsuario(), usuarioGrupo.getIdGrupo()]
            );

            return { success: true, message: "Usuário associado ao grupo com sucesso." };
        } catch (err) {
            throw err;
        }
    }

    async buscaGruposDoUsuario(idUsuario, conn) {
        try {
            if(!conn) conn = await this.connection.connect();
            const grupos = await conn.all(
                `SELECT g.* FROM grupos g
                INNER JOIN usuarios_grupo ug ON g.id = ug.grupo_id
                WHERE ug.usuario_id = ?`,
                [idUsuario]
            );

            if(grupos.length == 0) {
                throw new BadRequestError('Nenhum grupo encontrado para o usuário.');
            }


            return grupos.map(grupo => new Grupo(grupo.id, grupo.nome, grupo.descricao));

        } catch (err) {
            throw err;
        }
    }
}

export default UsuarioGrupoRepository;