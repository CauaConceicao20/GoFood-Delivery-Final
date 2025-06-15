import FotoProdutoRepository from "../repository/FotoRepository.js";

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

    async buscarFotoDeRestaurantePorId(id) {
        try {
            return await this.fotoProdutoRepository.buscarFotoDeRestaurantePorId(id);
        } catch (err) {
            throw err;
        }
    }
}

export default FotoService;