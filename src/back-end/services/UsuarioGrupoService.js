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
            throw err;
        }

    }

    async buscaGruposDoUsuario(idUsuario) {
        try {
            return await this.usuarioGrupoRepository.buscaGruposDoUsuario(idUsuario);
        } catch (err) {
            throw err;
        }
    }
}

export default UsuarioGrupoService;