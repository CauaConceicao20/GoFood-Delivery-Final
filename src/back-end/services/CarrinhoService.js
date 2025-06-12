import CarrinhoRepository from '../repository/CarrinhoRepository.js';
import ProdutoService from './ProdutoService.js';
import RestauranteService from './RestauranteService.js';
import { ForbiddenOwnRestaurantProductError } from '../exception/GlobalExceptions.js';
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
}
export default CarrinhoService;