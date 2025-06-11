import CarrinhoRepository from '../repository/CarrinhoRepository.js';
import ProdutoService from './ProdutoService.js';

class CarrinhoService {

    constructor() {
        this.carrinhoRepository = new CarrinhoRepository();
        this.produtoService = new ProdutoService();
    }

    async registra(carrinho, idUsuario) {
        try {
            return await this.carrinhoRepository.registra(carrinho, idUsuario);
        } catch (err) {
            throw err;
        }
    }

    async adicionarProdutoAoCarrinho(itemCarrinho) {
        try {
            await this.produtoService.buscarPorId(itemCarrinho.getProdutoId());
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