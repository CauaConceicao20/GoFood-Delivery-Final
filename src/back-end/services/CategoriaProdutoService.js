import CategoriaProdutoRepository from "../repository/CategoriaProdutoRepository.js";

class CategoriaProdutoService {
    constructor() {
        this.categoriaProdutoRepository = new CategoriaProdutoRepository();
    }

    async buscarPorId(id, conn) {
        try {
            return await this.categoriaProdutoRepository.buscarPorId(id, conn);
        } catch (err) {
            throw err;
        }
    }
}

export default CategoriaProdutoService;