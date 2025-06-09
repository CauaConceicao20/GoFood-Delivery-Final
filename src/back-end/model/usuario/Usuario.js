class Usuario {

    constructor(id, nome, email, senha, dataCadastro, telefone, cpf) {
        this.id = id;
        this.nome = nome;
        this.email = email;
        this.senha = senha;
        this.dataCadastro = dataCadastro;
        this.telefone = telefone;
        this.cpf = cpf;
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

    setTelefone(telefone) {
        this.telefone = telefone;
    }

    getTelefone() {
        return this.telefone;
    }

    setCpf(cpf) {
        this.cpf = cpf;
    }

    getCpf() {
        return this.cpf;
    }
}

export default Usuario