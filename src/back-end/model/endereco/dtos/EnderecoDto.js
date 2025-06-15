import { BadRequestError } from "../../../exception/GlobalExceptions.js";

class EnderecoDto {

    constructor(cep, logradouro, numero, complemento, bairro, cidadeId) {
        this.cep = cep;
        this.logradouro = logradouro;
        this.numero = numero;
        this.complemento = complemento;
        this.bairro = bairro;
        this.cidadeId = cidadeId;

        this.validarCampos();
    }

    validarCampos() {
        if (!this.cep || typeof this.cep !== "string" || this.cep.trim() === "") {
            throw new BadRequestError("CEP é obrigatório.");
        }
        if (!/^\d{8}$/.test(this.cep.replace(/\D/g, ""))) {
            throw new BadRequestError("CEP deve ter 8 dígitos numéricos.");
        }
        if (!this.logradouro || typeof this.logradouro !== "string" || this.logradouro.trim() === "") {
            throw new BadRequestError("Logradouro é obrigatório.");
        }
        if (!this.numero || typeof this.numero !== "string" || this.numero.trim() === "") {
            throw new BadRequestError("Número é obrigatório.");
        }
        if (!this.bairro || typeof this.bairro !== "string" || this.bairro.trim() === "") {
            throw new BadRequestError("Bairro é obrigatório.");
        }
        if (!this.cidadeId || isNaN(Number(this.cidadeId))) {
            throw new BadRequestError("CidadeId é obrigatório e deve ser um número.");
        }
    }
}

export default EnderecoDto;