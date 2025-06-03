class ItemPedido {
    constructor(idPedido, IdProduto, quantidade, precoUnitario, precoTotal, observacao) {
        this.idPedido = idPedido;
        this.IdProduto = IdProduto;
        this.quantidade = quantidade;
        this.precoUnitario = precoUnitario;
        this.precoTotal = precoTotal;
        this.observacao = observacao;
    }

    setIdPedido(idPedido) {
        this.idPedido = idPedido;
    }

    getIdPedido() {
        return this.idPedido;
    }

    setIdProduto(idProduto) {
        this.idProduto = idProduto;
    }

    getIdProduto() {
        return this.idProduto;
    }

    setQuantidade(quantidade) {
        this.quantidade = quantidade;
    }  

    getQuantidade() {
        return this.quantidade;
    }

    setPrecoUnitario(precoUnitario) {
        this.precoUnitario = precoUnitario;
    }

    getPrecoUnitario() {
        return this.precoUnitario;
    }

    setPrecoTotal(precoTotal) {
        this.precoTotal = precoTotal;
    }

    getPrecoTotal() {
        return this.precoTotal;
    } 

    setObservacao(observacao) {
        this.observacao = observacao;
    }

    getObservacao() {
        return this.observacao;
    }
}

export default ItemPedido