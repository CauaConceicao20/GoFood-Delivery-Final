import CarrinhoRepository from '../repository/CarrinhoRepository.js';
import ItemCarrinhoRepository from '../repository/ItemCarrinhoRepository.js';
import ProdutoService from './ProdutoService.js';

class CarrinhoService {

    constructor() {
        this.carrinhoRepository = new CarrinhoRepository();
        this.itemCarrinhoRepository = new ItemCarrinhoRepository();
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
        let condicao = false;
        try {
            let carrinho = await this.carrinhoRepository.buscaPorId(itemCarrinho.getCarrinhoId());
            const itensDoCarrinho = await this.itemCarrinhoRepository.buscaTodosItensAssociadosAoCarrinho(itemCarrinho.getCarrinhoId());

            const produto = await this.produtoService.buscarPorId(itemCarrinho.getProdutoId());

              for (const itemDoCarrinho of itensDoCarrinho) {
                if (itemDoCarrinho.getProdutoId() == itemCarrinho.getProdutoId()) {
                    condicao = true;

                    itemDoCarrinho.aumentaQuantidade(itemCarrinho.getQuantidade());

                    const subTotalAtual = await this.carrinhoRepository.verificaValorTotalCarrinho(carrinho.getId());
                    carrinho.setSubTotal(subTotalAtual + produto.getPreco())

                    carrinho.aumentaQuantidadeTotalDeItems(itemCarrinho.getQuantidade());
                    
                    await this.atualizaSubTotalEQuantidadeDoCarrinho(itemDoCarrinho, carrinho);
                    break;
                }
            }
            if(!condicao) {
                await this.carrinhoRepository.adicionaProdutoAoCarrinho(itemCarrinho, carrinho, produto);
            }
           
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

    async atualizaSubTotalEQuantidadeDoCarrinho(itemCarrinho, carrinho) {
        try {
            await this.carrinhoRepository.atualizaSubTotalEQuantidadeDoCarrinho(itemCarrinho, carrinho);
        } catch (err) {
            throw err;
        }
    }
}
export default CarrinhoService;