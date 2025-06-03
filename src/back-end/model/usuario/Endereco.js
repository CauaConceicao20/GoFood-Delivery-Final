class Endereco {
    constructor(cep, logradouro, numero, complemento, bairro) {
        this.cep = cep;
        this.logradouro = logradouro;
        this.numero = numero;
        this.complemento = complemento;
        this.bairro = bairro;
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
}

export default Endereco