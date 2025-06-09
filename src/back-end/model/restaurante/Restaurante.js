class Restaurante {
    constructor(id, nome, descricao, razaoSocial, taxaFrete, dataCadastro, dataAtualizacao,
        endereco, idUsuario, idsFormaPagamento, cnpj) {
        this.id = id;
        this.nome = nome;
        this.descricao = descricao;
        this.razaoSocial = razaoSocial;
        this.taxaFrete = taxaFrete;
        this.dataCadastro = dataCadastro;
        this.dataAtualizacao = dataAtualizacao;
        this.aberto = true;
        this.endereco = endereco;
        this.idUsuario = idUsuario
        this.idsFormaPagamento = idsFormaPagamento;
        this.cnpj = cnpj;
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

    setEndereco(endereco) {
        this.endereco = endereco;
    }

    getEndereco() {
        return this.endereco;
    }

    setIdUsuario(idUsuario) {
        this.idUsuario = idUsuario;
    }

    getIdUsuario() {
        return this.idUsuario;
    }

    setIdsFormaPagamento(idsFormaPagamento) {
        this.idsFormaPagamento = idsFormaPagamento;
    }

    getIdsFormaPagamento() {
        return this.idsFormaPagamento;
    }

    setCnpj(cnpj) {
        this.cnpj = cnpj;
    }

    getCnpj() {
        return this.cnpj;
    }

    setAtivo(ativo) {
        this.ativo = ativo;
    }

    getAtivo() {
        return this.ativo;
    }
}

export default Restaurante