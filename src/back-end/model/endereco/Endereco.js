class Endereco {
    constructor(cep, logradouro, numero, complemento, bairro, cidadeId) {
        this.cep = cep,
        this.logradouro = logradouro;
        this.numero = numero;
        this.complemento = complemento;
        this.bairro = bairro;
        this.cidadeId = cidadeId;
    }

    setCep(cep) {
        this.cep = cep;
    }

    getCep() {
        return this.cep;
    }

    setLogradouro(logradouro) {
        this.logradouro = logradouro;
    }

    getLogradouro() {
        return this.logradouro;
    }

    setNumero(numero) {
        this.numero = numero;
    }

    getNumero() {
        return this.numero;
    }

    setComplemento(complemento) {
        this.complemento = complemento;
    }

    getComplemento() {
        return this.complemento;
    }

    setBairro(bairro) {
        this.bairro = bairro;
    }

    getBairro() {
        return this.bairro;
    }

    setCidadeId(cidadeId) {
        this.cidadeId = cidadeId;
    }

    getCidadeId() {
        return this.cidadeId;
    }
}

export default Endereco