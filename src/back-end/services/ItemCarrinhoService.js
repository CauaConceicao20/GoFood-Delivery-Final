import ItemCarrinhoRepository from "../repository/ItemCarrinhoRepository.js";

class ItemCarrinhoService {
    constructor() {
        this.itemCarrinhoRepository = new ItemCarrinhoRepository();
    }

    async buscarItemCarrinhoPorIdProduto(id) {
        try {
            const itemCarrinho = await this.itemCarrinhoRepository.buscarItemCarrinhoPorIdProduto(id);
            if (!itemCarrinho) {
                throw new BadRequestError(`Item do carrinho com ID ${id} não encontrado.`);
            }
            return itemCarrinho;
        } catch (err) {
            throw err;
        }
    }
}

export default ItemCarrinhoService;