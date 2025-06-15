class FormaPagamentoResponseDto {
    constructor(formaPagamento) {
        this.id = formaPagamento.getId();
        this.nome = formaPagamento.getNome();
    }
}

export default FormaPagamentoResponseDto;