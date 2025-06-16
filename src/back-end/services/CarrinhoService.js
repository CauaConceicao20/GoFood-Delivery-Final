import CarrinhoRepository from '../repository/CarrinhoRepository.js';
import ProdutoService from './ProdutoService.js';
import RestauranteService from './RestauranteService.js';
import { ForbiddenOwnRestaurantProductError, MinimumQuantityException } from '../exception/GlobalExceptions.js';
import ItemCarrinho from '../model/carrinho/ItemCarrinho.js';
import ItemCarrinhoService from './ItemCarrinhoService.js';
class CarrinhoService {

    constructor() {
        this.carrinhoRepository = new CarrinhoRepository();
        this.produtoService = new ProdutoService();
        this.restauranteService = new RestauranteService();
        this.itemCarrinhoService = new ItemCarrinhoService();
    }

    async registra(carrinho, idUsuario) {
        try {
            return await this.carrinhoRepository.registra(carrinho, idUsuario);
        } catch (err) {
            throw err;
        }
    }

    async adicionarProdutoAoCarrinho(itemCarrinho, usuario) {
        try {
            const produto = await this.produtoService.buscarPorId(itemCarrinho.getProdutoId());
            const restaurantesDoUsuario = await this.restauranteService.buscarRestaurantesAssociadosAUsuario(usuario.getId());
            const restauranteDoProduto = await this.restauranteService.buscarPorId(produto.getIdRestaurante());
            const quantidadeitemCarrinho = itemCarrinho.getQuantidade();
            itemCarrinho.setPreco(produto.getPreco() * quantidadeitemCarrinho);

            for (const restauranteDoUsuario of restaurantesDoUsuario) {
                if (restauranteDoUsuario.getId() == restauranteDoProduto.getId()) {
                    throw new ForbiddenOwnRestaurantProductError("Não é possivel adicionar produtos do seu restaurante ao carrinho");
                }
            }

            await this.carrinhoRepository.adicionaProdutoAoCarrinho(itemCarrinho);

        } catch (err) {
            throw err;
        }
    }

    async buscarCarrinhoDoUsuario(idUsuario) {
        try {
            return await this.carrinhoRepository.buscaCarrinhoAssociadoAUsuario(idUsuario);
        } catch (err) {
            throw err;
        }
    }

    async buscarCarrinhoComItens(carrinho) {
        try {
            return await this.carrinhoRepository.buscarCarrinhoComItens(carrinho);

        } catch (err) {
            throw err;
        }
    }

    async aumentarQuantidadeDeItemDoCarrinho(produto, carrinho) {
        const itemCarrinho = await this.itemCarrinhoService.buscarItemCarrinhoPorIdProduto(produto.getId());

        itemCarrinho.aumentaQuantidade(1);
        itemCarrinho.aumentaPreco(produto.getPreco());
        carrinho.aumentaQuantidadeTotalDeItems(1);
        carrinho.aumentaSubTotalDoCarrinho(produto.getPreco());

        await this.carrinhoRepository.atualizarItemCarrinhoECarrinho(itemCarrinho, carrinho);
    }

    async diminuirQuantidadeDeItemDoCarrinho(produto, carrinho) {
        const itemCarrinho = await this.itemCarrinhoService.buscarItemCarrinhoPorIdProduto(produto.getId());

        if (itemCarrinho.getQuantidade() <= 1) {
            throw new MinimumQuantityException("Quantidade mínima atingida");
        }
        itemCarrinho.diminuiQuantidade(1);
        itemCarrinho.diminuiPreco(produto.getPreco());
        carrinho.diminuiQuantidadeTotalDeItems(1);
        carrinho.diminuiSubTotalDoCarrinho(produto.getPreco());

        await this.carrinhoRepository.atualizarItemCarrinhoECarrinho(itemCarrinho, carrinho);
    }

    async deletarItemDoCarrinho(produto, carrinho) {
        try {
            const itemCarrinho = await this.itemCarrinhoService.buscarItemCarrinhoPorIdProduto(produto.getId());
            await this.carrinhoRepository.deletarItemCarrinho(itemCarrinho, carrinho);
        } catch (err) {
            throw err;
        }
    }
}
export default CarrinhoService;