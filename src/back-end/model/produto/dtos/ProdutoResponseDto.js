import CategoriaResponseDto from "./CategoriaResponseDto.js";

class ProdutoResponseDto {
    constructor(produto, categoria, restaurante) {
        this.id = produto.getId();
        this.nome = produto.getNome();
        this.preco = produto.getPreco();
        this.descricao = produto.getDescricao();
        this.categoria = new CategoriaResponseDto(categoria);   
        this.restaurante = new RestauranteIdNomeDto(restaurante);
        this.ativo = produto.getAtivo();
    }
}

class RestauranteIdNomeDto {
    constructor(restaurante) {
        this.id = restaurante.getId();
        this.nome = restaurante.getNome();
    }
}

export default ProdutoResponseDto;