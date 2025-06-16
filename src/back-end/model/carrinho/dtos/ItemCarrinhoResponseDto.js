class ItemCarrinhoResponseDto {
    constructor(produto, item, fotoUrl) {
        this.carrinho_id = item.carrinho_id;
        this.produto_id = produto.getId();
        this.nome = produto.getNome();
        this.descricao = produto.getDescricao();
        this.quantidade = item.quantidade;
        this.preco = item.preco;
        this.fotoUrl = fotoUrl;
    }
}

export default ItemCarrinhoResponseDto;