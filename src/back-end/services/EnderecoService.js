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

    async buscaCidadePorId(id) {
        try {
            const cidade = await this.enderecoRepository.buscaCidadePorId(id);
            if (!cidade) {
                throw new NotFoundError(`Cidade com ID ${id} não encontrada`);
            }
            return cidade;
        } catch (err) {
            throw err;
        }
    }

    async buscaEstadoPorId(id) {
        try {
            const estado = await this.enderecoRepository.buscaEstadoPorId(id);
            if (!estado) {
                throw new NotFoundError(`Estado com ID ${id} não encontrado`);
            }
            return estado;
        } catch (err) {
            throw err;
        }
    }
}

export default EnderecoService;