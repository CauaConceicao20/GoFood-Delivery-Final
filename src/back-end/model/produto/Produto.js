class Produto {
    constructor(nome, descricao, preco, ativo,) {
        this.nome = nome;
        this.preco = preco;
        this.descricao = descricao;
        this.ativo = ativo;
    }

    setNome(nome) {
        this.nome = nome;
    }

    getNome() {
        return this.nome;
    }

    setDescricao(descricao) {
        this.descricao = descricao;
    }

    getDescricao() {
        return this.descricao;
    }

    setPreco(preco) {
        this.preco = preco;
    }

    getPreco() {
        return this.preco;
    }

    setAtivo(ativo) {
        this.ativo = ativo;
    }

    getAtivo() {
        return this.ativo;
    }
}

export default Produto
