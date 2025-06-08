import FotoProdutoDto from "./FotoProdutoDto.js";

class ProdutoRegisterRequestDto {
  constructor(body) {
    this.nome = body.nome;
    this.descricao = body.descricao;
    this.preco = body.preco;
    this.categoriaId = body.categoriaId;
    this.fotoProduto = new FotoProdutoDto(body);

    this.validarCampos();
  }

  validarCampos() {
    if (!this.nome || this.nome.length < 3) {
      throw new Error("O nome do produto deve ter pelo menos 3 caracteres.");
    }
    if (!this.descricao || this.descricao.length < 10) {
      throw new Error("A descrição do produto deve ter pelo menos 10 caracteres.");
    }
    if (isNaN(this.preco) || this.preco <= 0) {
      throw new Error("O preço do produto deve ser um número positivo.");
    }
    if (!this.categoriaId) {
      throw new Error("A categoria do produto é obrigatória.");
    }
  }
}

export default ProdutoRegisterRequestDto;