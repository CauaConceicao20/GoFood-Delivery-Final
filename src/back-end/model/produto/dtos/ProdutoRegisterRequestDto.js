import { BadRequestError } from "../../../exception/GlobalExceptions.js";

class ProdutoRegisterRequestDto {
  constructor(body) {
    this.nome = body.nome;
    this.descricao = body.descricao;
    this.preco = body.preco;
    this.categoriaId = body.categoriaId;
    this.restauranteId = body.restauranteId;

    this.validarCampos();
  }

  validarCampos() {
    if (!this.nome || this.nome.length < 3) {
      throw new BadRequestError("O nome do produto deve ter pelo menos 3 caracteres.");
    }
    if (!this.descricao || this.descricao.length < 10) {
      throw new BadRequestError("A descrição do produto deve ter pelo menos 10 caracteres.");
    }
    if (isNaN(this.preco) || this.preco <= 0) {
      throw new BadRequestError("O preço do produto deve ser um número positivo.");
    }
    if (!this.categoriaId) {
      throw new BadRequestError("A categoria do produto é obrigatória.");
    }
    if (!this.restauranteId || this.restauranteId <= 0) {
      throw new BadRequestError("O restaurante do produto é obrigatório.");
    }
  }
}

export default ProdutoRegisterRequestDto;