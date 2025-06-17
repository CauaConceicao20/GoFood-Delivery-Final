import { BadRequestError } from "../../../exception/GlobalExceptions.js";
class RestauranteUpdateRequestDto {
    constructor(body) {
        this.nome = body.nome;
        this.descricao = body.descricao;
        this.razaoSocial = body.razaoSocial;
        this.cep = body.cep;
        this.logradouro = body.logradouro;
        this.numero = body.numero;
        this.complemento = body.complemento;
        this.bairro = body.bairro;
        this.cidadeId = body.cidadeId;

        this.validarCampos();
    }

    validarCampos() {

        if (this.nome && !this.nome.trim()) {
            throw new BadRequestError("Nome é obrigatório, se preenchido, não pode ser vazio.");
        }

        if (this.razaoSocial && !this.razaoSocial.trim()) {
            throw new BadRequestError("Razão social é obrigatória, se preenchida, não pode ser vazia.");
        }

        if (this.cep && !/^\d{5}-?\d{3}$/.test(restaurantData.cep)) {
            throw new BadRequestError("CEP inválido. Use o formato 00000-000 ou 00000000.");
        }

        if (this.logradouro && !restaurantData.logradouro.trim()) {
            throw new BadRequestError("Logradouro é obrigatório, se preenchido, não pode ser vazio.");
        }

        if (this.numero && !restaurantData.numero.trim()) {
            throw new BadRequestError("Número é obrigatório, se preenchido, não pode ser vazio.");
        }

        if (this.bairro && !restaurantData.bairro.trim()) {
            throw new BadRequestError("Bairro é obrigatório, se preenchido, não pode ser vazio.");
        }

        if (this.cidadeId && restaurantData.cidadeId === "") {
            throw new BadRequestError("Selecione uma cidade válida.");
        }
    }
}

export default RestauranteUpdateRequestDto;
