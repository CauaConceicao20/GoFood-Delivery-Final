class Permissao {
    constructor(nome, descricao) {
        this.nome = nome;
        this.descricao = descricao;
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
}

export default Permissao