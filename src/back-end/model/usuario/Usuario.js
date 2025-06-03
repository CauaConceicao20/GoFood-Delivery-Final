class Usuario {
    constructor(nome, email, senha, dataCadastro, cpf, cnpj) {
        this.nome = nome;
        this.email = email;
        this.senha = senha;
        this.dataCadastro = dataCadastro;
        this.cpf = cpf;
        this.cnpj = cnpj;
    }

    setNome(nome) {
        this.nome = nome;
    }

    getNome() {
        return this.nome;
    }

    setEmail(email) {
        this.email = email;
    }

    getEmail() {
        return this.email;
    }

    setSenha(senha) {
        this.senha = senha;
    }

    getSenha() {
        return this.senha;
    }

    setDataCadastro(dataCadastro) {
        this.dataCadastro = dataCadastro;
    }

    getDataCadastro() {
        return this.dataCadastro;
    }

    setCpf(cpf) {
        this.cpf = cpf;
    }

    getCpf() {
        return this.cpf;
    }

    setCnpj(cnpj) {
        this.cnpj = cnpj;
    }
    
    getCnpj() {
        return this.cnpj;
    }
}

export default Usuario