import CidadeResponseDto from "./CidadesReponseDto.js";

class EnderecoResponseDto {
    constructor(endereco, cidade, estado) {
        this.cep = endereco.getCep();
        this.logradouro = endereco.getLogradouro();
        this.numero = endereco.getNumero();
        this.complemento = endereco.getComplemento();
        this.bairro = endereco.getBairro();
        this.cidade = new CidadeResponseDto(cidade.id, cidade.nome, estado);
    }
}

export default EnderecoResponseDto;
