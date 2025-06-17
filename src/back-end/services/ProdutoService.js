import { DifferentRestaurantProductsError, NotFoundError, BadRequestError } from "../exception/GlobalExceptions.js";
import ProdutoRepository from "../repository/ProdutoRepository.js";

class ProdutoService {
    constructor() {
        this.produtoRepository = new ProdutoRepository();
    }

    async registrar(produto, fotoProduto) {
        try {
            if (!produto) {
                throw new NotFoundError("Produto não informado");
            }

            if (!fotoProduto) {
                throw new NotFoundError("Foto do produto não informada");
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
        if (produtosId.length === 0) return [];

        const produtos = [];
        let restauranteIdReferencia = null;

        for (const idProduto of produtosId) {
            const produto = await this.buscarPorId(idProduto);
            produtos.push(produto);

            if (restauranteIdReferencia === null) {
                restauranteIdReferencia = produto.getIdRestaurante();
            } else if (produto.getIdRestaurante() !== restauranteIdReferencia) {
                throw new DifferentRestaurantProductsError("Não é possivel continuar, todos os produtos devem pertencer ao mesmo restaurante");
            }
        }
        return produtos;
    }

    async buscarProdutosDeRestaurante(idRestaurante) {
        try {
            const produtos = await this.produtoRepository.buscarProdutosDeRestaurante(idRestaurante);

            if (!produtos || produtos.length === 0) {
                throw new BadRequestError('Nenhum produto encontrado.');
            }

            return produtos;
        } catch (err) {
            throw err;
        }
    }
}

export default ProdutoService;