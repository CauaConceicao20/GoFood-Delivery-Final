import UsuarioGrupoRepository from "../repository/UsuarioGrupoRepository.js";
import UsuarioGrupo from "../model/usuario/UsuarioGrupo.js";


class UsuarioGrupoService {

    constructor() {
        this.usuarioGrupoRepository = new UsuarioGrupoRepository();
    }

    async associaUsuarioAoGrupo(idUsuario, idGrupo) {
        try {
            await this.usuarioGrupoRepository.associaUsuarioAoGrupo(new UsuarioGrupo(idUsuario, idGrupo));
        } catch (err) {
            console.error(err);
            throw new Error(`${err.message}`);
        }

    }
}

export default UsuarioGrupoService;