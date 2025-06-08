import {BadRequestError} from '../../../exception/GlobalExceptions.js';

class LoginRequestDto {
  constructor(email, senha) {
    this.email = email;
    this.senha = senha;

    this.validarCampos();
  }

  validarCampos() {
    if (!this.email || typeof this.email !== 'string' || this.email.trim() === '') {
      throw new BadRequestError('Email é obrigatório.');
    }
    if (!this.senha || typeof this.senha !== 'string' || this.senha.trim() === '') {
      throw new BadRequestError('Senha é obrigatória.');
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email)) {
      throw new BadRequestError('Email inválido.');
    }
  }
}

export default LoginRequestDto;