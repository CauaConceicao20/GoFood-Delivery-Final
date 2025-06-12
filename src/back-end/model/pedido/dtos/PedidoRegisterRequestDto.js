import { BadRequestError } from "../../../exception/GlobalExceptions.js";

class PedidoRegisterRequestDto {

    constructor(body) {
        if (!Array.isArray(body.produtos)) {
            throw new BadRequestError('O campo produtos deve ser um array.');
        }
        this.itemsPedidoDto = body.produtos.map(
            p => new ItemPedidoDto(p.idProduto, p.quantidade)
        );
        this.idMetodoPagamento = body.idMetodoPagamento;

        this.validarCampos();
    }

    validarCampos() {

        if (!this.idMetodoPagamento) {
            throw new BadRequestError('O campo idMetodoPagamento é obrigatório.');
        }
    }
}

class ItemPedidoDto {
    constructor(idProduto, quantidade) {
        this.idProduto = idProduto;
        this.quantidade = quantidade;
        this.observacao = body.observacao;

        this.validarCampos();
    }

    validarCampos() {
        if (!this.idProduto) {
            throw new BadRequestError('O campo idProduto é obrigatório.');
        }

        if (!this.quantidade) {
            throw new BadRequestError('O campo quantidade é obrigatório.');
        }

        if (this.quantidade <= 0) {
            throw new BadRequestError('O campo quantidade deve ser maior que zero.');
        }

           if (this.observacao && this.observacao.length > 255) {
            throw new BadRequestError('O campo observacao deve ter no máximo 255 caracteres.');
        }

        if (this.observacao && this.observacao.length < 3) {
            throw new BadRequestError('O campo observacao deve ter no mínimo 3 caracteres.');
        }

        if (this.observacao == null) {
            this.observacao = '';
        }
    }

}

export default PedidoRegisterRequestDto;