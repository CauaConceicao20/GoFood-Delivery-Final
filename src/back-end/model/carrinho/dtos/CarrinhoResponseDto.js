import ItemCarrinhoResponseDto from "./ItemCarrinhoResponseDto.js";

class CarrinhoResponseDto {
    constructor(carrinho, itensComProdutoEFoto, usuarioId) {
        this.id = carrinho.id;
        this.quantidadeTotalItens = carrinho.quantidade_total_itens;
        this.subTotal = carrinho.sub_total;
        this.usuario_id = usuarioId;
        this.itens = Array.isArray(itensComProdutoEFoto)
            ? itensComProdutoEFoto.map(({ produto, item, fotoUrl }) =>
                new ItemCarrinhoResponseDto(produto, item, fotoUrl)
            )
            : [];
    }
}

export default CarrinhoResponseDto;