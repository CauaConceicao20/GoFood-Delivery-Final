class ProdutoResponseDto {
  constructor(produto) {
    this.id = produto.getId();
    this.nome = produto.getNome();  
    this.preco = produto.getPreco();
    this.descricao = produto.getDescricao();
    this.categoria = produto.getIdCategoria();
    this.restaurante = produto.getIdRestaurante();
    this.ativo = produto.getAtivo();
  }
}

export default ProdutoResponseDto;