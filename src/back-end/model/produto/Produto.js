class Produto {
    constructor(id, nome, descricao, preco, idRestaurante, idCategoria) {
        this.id = id;
        this.nome = nome;
        this.preco = preco;
        this.descricao = descricao;
        this.idRestaurante = idRestaurante;
        this.idCategoria = idCategoria;
        this.ativo = true;
    }

    setId(id) {
        this.id = id;
    }

    getId() {
        return this.id;
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

    settIdRestaurante(idRestaurante) {
        this.idRestaurante = idRestaurante;
    }

    getIdRestaurante() {
        return this.idRestaurante;
    }

    setIdCategoria(idCategoria) {
        this.idCategoria = idCategoria;
    }

    getIdCategoria() {
        return this.idCategoria;
    }

    setAtivo(ativo) {
        this.ativo = ativo;
    }

    getAtivo() {
        return this.ativo;
    }
}

export default Produto
