import { StatusPedidoEnum } from './enums/StatusPedidoEnum.js';

class Pedido {
    constructor(id, codigo, subTotal, taxaFrete, valorTotal, dataCriacao, dataConfirmacao, dataEntrega, dataCancelamento, idMetodoPagamento, usuarioId, restauranteId, statusPedido) {
        this.id = id;
        this.codigo = codigo;
        this.subTotal = subTotal;
        this.taxaFrete = taxaFrete;
        this.valorTotal = valorTotal;
        this.dataCriacao = dataCriacao;
        this.dataConfirmacao = dataConfirmacao;
        this.dataEntrega = dataEntrega;
        this.dataCancelamento = dataCancelamento;
        this.idMetodoPagamento = idMetodoPagamento;
        this.restauranteId = restauranteId;
        this.usuarioId = usuarioId;
        this.statusPedido = statusPedido;
    }

    setId(id) {
        this.id = id;
    }

    getId() { 
        return this.id;
    }

    setCodigo(codigo) {
        this.codigo = codigo;
    }

    getCodigo() {
        return this.codigo;
    }

    setSubTotal(subTotal) {
        this.subTotal = subTotal;
    }

    getSubTotal() {
        return this.subTotal;
    }

    setTaxaFrete(taxaFrete) {
        this.taxaFrete = taxaFrete;
    }

    getTaxaFrete() {
        return this.taxaFrete;
    }

    setValorTotal(valorTotal) {
        this.valorTotal = valorTotal;
    }

    getValorTotal() {
        return this.valorTotal;
    }

    setDataCriacao(dataCriacao) {
        this.dataCriacao = dataCriacao;
    }

    getDataCriacao() {
        return this.dataCriacao;
    }

    setDataConfirmacao(dataConfirmacao) {
        this.dataConfirmacao = dataConfirmacao;
    }

    getDataConfirmacao() {
        return this.dataConfirmacao;
    }

    setDataEntrega(dataEntrega) {
        this.dataEntrega = dataEntrega;
    }

    getDataEntrega() {
        return this.dataEntrega;
    }

    setDataCancelamento(dataCancelamento) {
        this.dataCancelamento = dataCancelamento;
    }

    getDataCancelamento() {
        return this.dataCancelamento;
    }

    setIdMetodoPagamento(idMetodoPagamento) {
        this.idMetodoPagamento = idMetodoPagamento;
    }

    getIdMetodoPagamento() {
        return this.idMetodoPagamento;
    }

    setRestauranteId(restauranteId) {
        this.restauranteId = restauranteId;
    }

    getRestauranteId() {
        return this.restauranteId;
    }

    setUsuarioId(usuarioId) {
        this.usuarioId = usuarioId;
    }

    getUsuarioId() { 
        return this.usuarioId;
    }

    setStatusPedido(statusPedido) {
        this.statusPedido = statusPedido;
    }

    getStatusPedido() {
        return this.statusPedido;
    }
}

export default Pedido