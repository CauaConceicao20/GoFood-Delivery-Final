class ItemCarrinho {

    constructor(produtoId, carrinhoId, quantidade) {
        this.produtoId = produtoId;
        this.carrinhoId = carrinhoId;
        this.quantidade = Number(quantidade);
    }

    setProdutoId(produtoId) {
        this.produtoId = produtoId;
    }

    getProdutoId() {
        return this.produtoId;
    }

    setCarrinhoId(carrinhoId) {
        this.carrinhoId = carrinhoId;
    }

    getCarrinhoId() {
        return this.carrinhoId;
    }

    setQuantidade(quantidade) {
        this.quantidade = quantidade;
    }

    getQuantidade() {
        return this.quantidade;
    }

    aumentaQuantidade(quantidade) {
        this.quantidade += Number(quantidade);
    }

    diminuiQuantidade(quantidade) {
        this.quantidade -= Number(quantidade);
    }
}

export default ItemCarrinho