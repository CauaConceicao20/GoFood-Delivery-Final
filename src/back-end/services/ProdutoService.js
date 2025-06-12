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

    async buscarTodos() {
        try {
            return await this.produtoRepository.buscarTodos();
        } catch (err) {
            throw err;
        }
    }

    async buscarPorId(id) {
        try {
            return await this.produtoRepository.buscarPorId(id);
        } catch (err) {
            throw err;
        }
    }

    async verificaSeProdutosPertencemAoMesmoRestaurante(produtosId) {
        let produtos = [];
        for (const idProduto of produtosId) {
            let contador = 0;
            let produto = await this.buscarPorId(idProduto);
            produtos.push(produto);
            if (contador > 0 && produto.getIdRestaurante() !== produtos[contador - 1].getIdRestaurante()) {
                throw new Error("Todos os produtos devem pertencer ao mesmo restaurante");
            }
            contador++;
        }

        return produtos;
    }
}

export default ProdutoService;