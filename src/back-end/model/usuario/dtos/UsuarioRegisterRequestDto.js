import { BadRequestError } from "../../../exception/GlobalExceptions.js";

class UsuarioRegisterRequestDto {
  constructor(body) {
    this.nome = body.nome;
    this.email = body.email;
    this.senha = body.senha;
    this.telefone = body.telefone;
    this.cpf = body.cpf;

    this.validarCampos();
  }

  validarCampos() {
    if (!this.nome || typeof this.nome !== 'string' || this.nome.trim() === '') {
      throw new BadRequestError('Nome é obrigatório.');
    }
    if (!this.email || typeof this.email !== 'string' || this.email.trim() === '') {
      throw new BadRequestError('Email é obrigatório.');
    }
    if (!this.senha || typeof this.senha !== 'string' || this.senha.trim() === '') {
      throw new BadRequestError('Senha é obrigatória.');
    }
    if (!this.cpf || typeof this.cpf !== 'string' || this.cpf.trim() === '') {
      throw new BadRequestError('CPF é obrigatório.');
    }
      if (this.cpf && this.cpf.replace(/\D/g, '').length !== 11) {
      throw new BadRequestError('CPF deve ter 11 dígitos.');
    }
    if (!this.telefone || typeof this.telefone !== 'string' || this.telefone.trim() === '') {
      throw new BadRequestError('Telefone é obrigatório.');
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email)) {
      throw new BadRequestError('Email inválido.');
    }
    if (this.telefone && this.telefone.replace(/\D/g, '').length < 10) {
      throw new BadRequestError('Telefone inválido.');
    }
  }
}

export default UsuarioRegisterRequestDto;