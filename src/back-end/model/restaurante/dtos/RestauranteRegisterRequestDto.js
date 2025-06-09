import { BadRequestError } from "../../../exception/GlobalExceptions.js";
import EnderecoDto from "../../usuario/dtos/EnderecoDto.js";

class RestauranteRegisterRequestDto {
    constructor(body) {
        this.id = body.id;
        this.nome = body.nome;
        this.razaoSocial = body.razaoSocial;
        this.taxaFrete = body.taxaFrete;
        this.endereco = new EnderecoDto(body.cep, body.logradouro, body.numero, body.complemento,
            body.bairro, body.cidadeId);
        this.descricao = body.descricao;
        this.formasPagamento = body.formasPagamento;
        this.cnpj = body.cnpj;

        this.validarCampos();
    }

    validarCampos() {
        if (!this.nome || typeof this.nome !== "string" || this.nome.trim() === "") {
            throw new BadRequestError("Nome do restaurante é obrigatório.");
        }
        if (!this.razaoSocial || typeof this.razaoSocial !== "string" || this.razaoSocial.trim() === "") {
            throw new BadRequestError("Razão social é obrigatória.");
        }
        if (
            this.taxaFrete === undefined ||
            this.taxaFrete === null ||
            isNaN(Number(this.taxaFrete)) ||
            Number(this.taxaFrete) < 0
        ) {
            throw new BadRequestError("Taxa de frete deve ser um número não negativo.");
        }
        if (!this.descricao || typeof this.descricao !== "string" || this.descricao.trim() === "") {
            throw new BadRequestError("Descrição é obrigatória.");
        }
        if (!Array.isArray(this.formasPagamento) || this.formasPagamento.length === 0) {
            throw new BadRequestError("É obrigatório informar ao menos um método de pagamento.");
        }
        if (!this.formasPagamento.every(id => Number.isInteger(id) && id > 0)) {
            throw new BadRequestError("Todos os métodos de pagamento devem ser IDs válidos.");
        }
        if (this.cnpj === null || this.cnpj === undefined || this.cnpj === "") {
            throw new BadRequestError("CNPJ é obrigatório.");
        }

        if (this.cnpj.replace(/\D/g, '').length !== 14) {
            throw new BadRequestError("CNPJ deve ter 14 dígitos.");
        }
    }
}

export default RestauranteRegisterRequestDto;