import EnderecoRepository from "../repository/EnderecoRepository.js";
import { NotFoundError } from "../exception/GlobalExceptions.js";

class EnderecoService {
    constructor() {
        this.enderecoRepository = new EnderecoRepository();
    }

    async buscaTodasCidades() {
        try {
            const cidades = await this.enderecoRepository.buscaTodasCidades();
            if (!cidades || cidades.length === 0) {
                throw new NotFoundError("Nenhuma cidade encontrada");
            }
            return cidades;
        } catch (err) {
            throw err;
        }
    }
}

export default EnderecoService;