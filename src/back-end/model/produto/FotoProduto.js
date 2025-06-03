class FotoProduto {
    constructor(nome, descricao, contentType, tamanho) {
        this.nome = nome;
        this.descricao = descricao;
        this.contentType = contentType;
        this.tamanho = tamanho;
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

    setContentType(contentType) {
        this.contentType = contentType;
    }

    getContentType() {
        return this.contentType;
    }

    setTamanho(tamanho) {
        this.tamanho = tamanho;
    }

    getTamanho() {
        return this.tamanho;
    }
}

export default FotoProduto;