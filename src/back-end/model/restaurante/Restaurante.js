class Restaurante {
    constructor(nome, razaoSocial, taxaFrete, dataCadastro, dataAtualizacao, aberto, cozinh, ativo) {
        this.nome = nome;
        this.razaoSocial = razaoSocial;
        this.taxaFrete = taxaFrete;
        this.dataCadastro = dataCadastro;
        this.dataAtualizacao = dataAtualizacao;
        this.aberto = aberto;
        this.cozinha = cozinha;
        this.ativo = ativo;
    }

    setNome(nome) {
        this.nome = nome;
    }

    getNome() {
        return this.nome;
    }

    setRazaoSocial(razaoSocial) {
        this.razaoSocial = razaoSocial;
    }

    getRazaoSocial() {
        return this.razaoSocial;
    }

    setTaxaFrete(taxaFrete) {
        this.taxaFrete = taxaFrete;
    }

    getTaxaFrete() {
        return this.taxaFrete;
    }

    setDataCadastro(dataCadastro) {
        this.dataCadastro = dataCadastro;
    }

    getDataCadastro() {
        return this.dataCadastro;
    }

    setDataAtualizacao(dataAtualizacao) {
        this.dataAtualizacao = dataAtualizacao;
    }

    getDataAtualizacao() {
        return this.dataAtualizacao;
    }

    setAberto(aberto) {
        this.aberto = aberto;
    }

    getAberto() {
        return this.aberto;
    }

    setCozinha(cozinha) {
        this.cozinha = cozinha;
    }

    getCozinha() {
        return this.cozinha;
    }

    setAtivo(ativo) {
        this.ativo = ativo;
    }

    getAtivo() {
        return this.ativo;
    }
}

export default Restaurante