class RestauranteUpdateRequestDto {
    constructor(body) {
        this.id = body.id;
        this.nome = body.nome;
        this.descricao = body.descricao;
        this.razaoSocial = body.razaoSocial;
        this.cep = body.cep;
        this.logradouro = body.logradouro;
        this.numero = body.numero;
        this.complemento = body.complemento;
        this.bairro = body.bairro;
        this.cidadeId = body.cidadeId;
    }
}
