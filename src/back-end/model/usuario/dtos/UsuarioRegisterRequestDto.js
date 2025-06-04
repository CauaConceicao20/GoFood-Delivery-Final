class UsuarioRegisterRequestDto {
  constructor(body) {
    this.nome = body.nome;
    this.email = body.email;
    this.senha = body.senha;
    this.telefone = body.telefone;
    this.cpf = body.cpf;
    this.cnpj = body.cnpj;
    
    this.validarCampos();
  }

   validarCampos() {
    if (!this.nome || typeof this.nome !== 'string' || this.nome.trim() === '') {
      throw new Error('Nome é obrigatório.');
    }

    if (!this.email || typeof this.email !== 'string' || this.email.trim() === '') {
      throw new Error('Email é obrigatório.');
    }

    if (!this.senha || typeof this.senha !== 'string' || this.senha.trim() === '') {
      throw new Error('Senha é obrigatória.');
    }

    if (!this.cpf || typeof this.cpf !== 'string' || this.cpf.trim() === '') {
      throw new Error('CPF é obrigatório.');
    }

    if (!this.telefone || typeof this.telefone !== 'string' || this.telefone.trim() === '') {
      throw new Error('Telefone é obrigatório.');
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email)) {
      throw new Error('Email inválido.');
    }

    if (this.cpf && this.cpf.replace(/\D/g, '').length !== 11) {
      throw new Error('CPF deve ter 11 dígitos.');
    }

    if (this.cnpj && dto.cnpj.replace(/\D/g, '').length !== 14 && this.cnpj != null) {
      throw new Error('CNPJ deve ter 14 dígitos.');
    }

    if (this.telefone && this.telefone.replace(/\D/g, '').length < 10) {
      throw new Error('Telefone inválido.');
    }
  }
}

export default UsuarioRegisterRequestDto;