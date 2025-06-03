class FormaPagamento {
    constructor(nome) {
        this.nome = nome;
    }

    setNome(nome) {
        this.nome = nome;
    }

    getNome() {
        return this.nome;
    }
}

export default FormaPagamento