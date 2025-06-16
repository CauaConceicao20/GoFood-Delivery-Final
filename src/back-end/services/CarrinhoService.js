import CarrinhoRepository from '../repository/CarrinhoRepository.js';
import ProdutoService from './ProdutoService.js';
import RestauranteService from './RestauranteService.js';
import { ForbiddenOwnRestaurantProductError, NotFoundError } from '../exception/GlobalExceptions.js';
import ItemCarrinho from '../model/carrinho/ItemCarrinho.js';
class CarrinhoService {

    constructor() {
        this.carrinhoRepository = new CarrinhoRepository();
        this.produtoService = new ProdutoService();
        this.restauranteService = new RestauranteService();
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
}
export default CarrinhoService;