import CategoriaProdutoRepository from '../repository/CategoriaProdutoRepository.js';

class CategoriaProdutoService {
    constructor() {
        this.categoriaProdutoRepository = new CategoriaProdutoRepository();
    }

    async buscarPorId(id) {
        try {
            return await this.categoriaProdutoRepository.buscarPorId(id);
        } catch (err) {
            throw err;
        }
    }
}

export default CategoriaProdutoService;