class ItemCarrinho {

    constructor(produtoId, carrinhoId, quantidade, preco) {
        this.produtoId = produtoId;
        this.carrinhoId = carrinhoId;
        this.quantidade = Number(quantidade);
        this.preco = preco;
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
    
    setPreco(preco) {
        this.preco = preco;
    }

    getPreco() {
        return this.preco;
    }

    aumentaQuantidade(quantidade) {
        this.quantidade += Number(quantidade);
    }

    diminuiQuantidade(quantidade) {
        this.quantidade -= Number(quantidade);
    }
}

export default ItemCarrinho