import GrupoRepository from "../repository/GrupoRepository.js";


class GrupoService {

    constructor() {
        this.grupoRepository = new GrupoRepository();
    }

    async buscarTodos() {
        try {
            return await this.grupoRepository.buscarTodosGrupos();
        } catch (err) {
            throw err;
        }
    }

    async buscarPorId(id) {
        try {
            return await this.grupoRepository.buscarPorId(id);
        } catch (err) {
            throw err;
        }
    }

    async buscarPorNome(nomeGrupo) {
        try {
            return await this.grupoRepository.buscarPorNome(nomeGrupo);
        } catch (err) {
            throw err;
        }
    }
}

export default GrupoService;