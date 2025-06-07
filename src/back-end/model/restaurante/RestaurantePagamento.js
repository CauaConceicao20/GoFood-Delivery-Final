class RestaurantePagamento {
    constructor(idRestaurante, idFormaPagamento) {
        this.idRestaurante = idRestaurante;
        this.idFormaPagamento = idFormaPagamento;
    }

    setIdRestaurante(idRestaurante) {
        this.idRestaurante = idRestaurante;
    }

    getIdRestaurante() {
        return this.idRestaurante;
    }

    setIdFormaPagamento(idFormaPagamento) {
        this.idFormaPagamento = idFormaPagamento;
    }

    getIdFormaPagamento() {
        return this.idFormaPagamento;
    }
}

export default RestaurantePagamento;