class FotoProduto {
    constructor(id, nome, descricao, contentType, url, tamanho) {
        this.id = id;
        this.nome = nome;
        this.descricao = descricao;
        this.contentType = contentType;
        this.url = url;
        this.tamanho = tamanho;
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

    setContentType(contentType) {
        this.contentType = contentType;
    }

    getContentType() {
        return this.contentType;
    }

    setUrl(url) {
        this.url = url;
    }

    getUrl() {
        return this.url;
    }

    setTamanho(tamanho) {
        this.tamanho = tamanho;
    }

    getTamanho() {
        return this.tamanho;
    }
}

export default FotoProduto;