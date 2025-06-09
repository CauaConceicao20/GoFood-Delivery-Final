import ProdutoRepository from "../repository/ProdutoRepository.js";

class ProdutoService {
    constructor() {
        this.produtoRepository = new ProdutoRepository();
    }

    async registrar(produto, fotoProduto) {
        try {
            if (!produto) {
                throw new Error("Produto não informado");
            }

            if (!fotoProduto) {
                throw new Error("Foto do produto não informada");
            }

            return await this.produtoRepository.registrar(produto, fotoProduto);
        } catch (err) {
            throw err;
        }
    }
}

export default ProdutoService;