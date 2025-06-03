import { StatusPedido } from './StatusPedido.js';

class Pedido {
    constructor(codigo, subTotal, taxaFrete, valorTotal, dataCriacao, dataConfirmacao, dataEntrega, dataCancelamento) {
        this.codigo = codigo;
        this.subTotal = subTotal;
        this.taxaFrete = taxaFrete;
        this.valorTotal = valorTotal;
        this.dataCriacao = dataCriacao;
        this.dataConfirmacao = dataConfirmacao;
        this.dataEntrega = dataEntrega;
        this.dataCancelamento = dataCancelamento;
        this.statusPedido = StatusPedido.CRIADO;
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

    setStatusPedido(statusPedido) {
        this.statusPedido = statusPedido;
    }

    getStatusPedido() {
        return this.statusPedido;
    }
}

export default Pedido