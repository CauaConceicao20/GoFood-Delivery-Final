import GrupoRepository from "../repository/GrupoRepository.js";


class GrupoService {

    constructor() {
        this.grupoRepository = new GrupoRepository();
    }
    
    async buscarTodos() {
        try {
            return await this.grupoRepository.buscarTodosGrupos();
        } catch (err) {
            console.error(err);
            throw new Error(`Erro ao buscar grupos: ${err.message}`);
        }
    }

    async buscarPorId(id) {
        try {
           return await this.grupoRepository.buscarPorId(id);
        }catch(err){
            console.error(err);
            throw new Error(`${err.message}`)
        }
    }

    async buscarPorNome(nomeGrupo) {
        try {
            return await this.grupoRepository.buscarPorNome(nomeGrupo);
        } catch (err) {
            console.error(err);
            throw new Error(`Erro ao buscar grupo por nome: ${err.message}`);
        }
    }
}

export default GrupoService;