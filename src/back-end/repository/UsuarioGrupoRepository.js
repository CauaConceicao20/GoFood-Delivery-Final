import Connection from "../database/Connection.js";
import UsuarioRepository from "./UsuarioRepository.js";
import GrupoRepository from "./GrupoRepository.js";

class UsuarioGrupoRepository {

    constructor() {
        this.connection = new Connection();
        this.usuarioRepository = new UsuarioRepository();
        this.grupoRepository = new GrupoRepository();
    }

    async associaUsuarioAoGrupo(usuarioGrupo) {
        let conn;
        try {
            conn = await this.connection.connect();

            await conn.run("BEGIN TRANSACTION");

            await conn.run(
                `INSERT INTO usuarios_grupo (usuario_id, grupo_id) VALUES (?, ?)`,
                [usuarioGrupo.getIdUsuario(), usuarioGrupo.getIdGrupo()]
            );

            await conn.run('COMMIT');

            return { success: true, message: "Usuário associado ao grupo com sucesso." };
        } catch (err) {
            await conn.run("ROLLBACK");
            throw err;
        }
    }
}

export default UsuarioGrupoRepository;