class Carrinho {
    constructor(id, quantidadeTotalDeitems, subTotal) {
        this.id = id;
        this.quantidadeTotalDeitems = Number(quantidadeTotalDeitems);
        this.subTotal = Number(subTotal);
    }

    setId(id) {
        this.id = id;
    }

    getId() {
        return this.id;
    }

    setQuantidadeTotalDeItems(quantidade) {
        this.quantidadeTotalDeitems = quantidade;
    }

    getQuantidadeTotalDeItems() {
        return this.quantidadeTotalDeitems;
    }

    setSubTotal(subTotal) {
        this.subTotal = subTotal;
    }

    getSubTotal() {
        return this.subTotal;
    }

    aumentaQuantidadeTotalDeItems(quantidade) {
        this.quantidadeTotalDeitems += Number(quantidade);
    }

    diminuiQuantidadeTotalDeItems(quantidade) {
        this.quantidadeTotalDeitems -= Number(quantidade);
    }

    aumentaSubTotalDoCarrinho(preco) {
        this.subTotal += Number(preco);
    }

    diminuiSubTotalDoCarrinho(preco) {
        this.subTotal -= Number(preco);
    }
}

export default Carrinho