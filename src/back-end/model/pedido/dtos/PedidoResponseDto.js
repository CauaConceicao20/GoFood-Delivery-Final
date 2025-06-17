class PedidoResponseDto {
  constructor(pedido, usuario, restaurante, produtos, metodoDePagamento) {
    this.id = pedido.id;
    this.codigo = pedido.codigo;
    this.produtosId = pedido.produtosId;
    this.subTotal = pedido.subTotal;
    this.taxaFrete = pedido.taxaFrete;
    this.valorTotal = pedido.valorTotal;
    this.dataCriacao = pedido.dataCriacao;
    this.dataConfirmacao = pedido.dataConfirmacao;
    this.dataEntrega = pedido.dataEntrega;
    this.dataCancelamento = pedido.dataCancelamento;
    this.statusPedido = pedido.statusPedido;
    this.metodoDePagamento = metodoDePagamento.getNome();

    this.restaurante = {
      nome: restaurante.getNome(),
      cnpj: restaurante.getCnpj()
    };

    this.usuario = {
      nome: usuario.getNome(),
      email: usuario.getEmail(),
      telefone: usuario.getTelefone(),
      cpf: usuario.getCpf(),
    };

    this.produtos = produtos.map(produto => ({
      id: produto.getId(),
      nome: produto.getNome(),
      descricao: produto.getDescricao(),
      preco: produto.getPreco(),
    }));
  }
}

export default PedidoResponseDto;