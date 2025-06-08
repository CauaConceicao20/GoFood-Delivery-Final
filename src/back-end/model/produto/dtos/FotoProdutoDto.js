class FotoProdutoDto {
  constructor(body) {
    this.nomeFoto = body.nomeFoto;
    this.descricaoFoto = body.descricaoFoto;
    this.urlFoto = body.urlFoto;
    this.tamanhoFoto = body.tamanhoFoto;
    this.contentType = body.contentType;

    this.validarCampos();
  }

  validarCampos() {
    if (!this.nomeFoto || this.nomeFoto.length < 3) {
      throw new Error("O nome da foto do produto deve ter pelo menos 3 caracteres.");
    }
    if (!this.descricaoFoto || this.descricaoFoto.length < 10) {
      throw new Error("A descrição da foto do produto deve ter pelo menos 10 caracteres.");
    }
    if (!this.urlFoto || this.urlFoto.length < 10) {
      throw new Error("A url da foto do produto deve ter pelo menos 10 caracteres.");
    }
    if (!this.tamanhoFoto || this.tamanhoFoto.length < 3) {
      throw new Error("O tamanho da foto do produto deve ter pelo menos 3 caracteres.");
    }
    if (!this.contentType || this.contentType.length < 5) {
      throw new Error("O contentType da foto do produto é obrigatório.");
    }
  }
}

export default FotoProdutoDto;