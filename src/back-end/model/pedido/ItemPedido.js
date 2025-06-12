class ItemPedido {
    constructor(idPedido, idProduto, quantidade, precoUnitario, observacao) {
        this.idPedido = idPedido;
        this.idProduto = idProduto;
        this.quantidade = quantidade;
        this.precoUnitario = precoUnitario;
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

    setObservacao(observacao) {
        this.observacao = observacao;
    }

    getObservacao() {
        return this.observacao;
    }
}

export default ItemPedido