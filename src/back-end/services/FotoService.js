import FotoProdutoRepository from "../repository/FotoProdutoRepository.js";

class FotoService {
    constructor() {
        this.fotoProdutoRepository = new FotoProdutoRepository();
    }

    async buscarFotoDeProdutoPorId(id) {
        try {
            return await this.fotoProdutoRepository.buscarFotoDeProdutoPorId(id);
        } catch (err) {
            throw err;
        }
    }
}

export default FotoService;