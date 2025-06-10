import { BadRequestError } from "../../../exception/GlobalExceptions.js";

class CarrinhoAddItemRequestDto {
    constructor(body) {
        this.produtoId = body.produtoId;
        this.quantidade = body.quantidade;

        this.validarCampos();
    }

    validarCampos() {
        if (!this.produtoId || !this.quantidade) {
            throw new BadRequestError("Campos inválidos");
        }

        if (this.produtoId < 1) {
            throw new BadRequestError("Id Invalido");
        }

        if(this.quantidade < 1) {
            throw new BadRequestError("Quantidade invalida");
        }

        if (this.quantidade > 3) {
            throw new BadRequestError("Quantidade permitida foi excedida max é 3");
        }
    }
}

export default CarrinhoAddItemRequestDto;