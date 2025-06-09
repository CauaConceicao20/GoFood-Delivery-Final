import { BadRequestError } from "../../../exception/GlobalExceptions.js";

class UsuarioUpdateRequestDto {
    constructor(body) {
        this.nome = body.nome ?? null;
        this.email = body.email ?? null;
        this.telefone = body.telefone ?? null;
        this.cpf = body.cpf ?? null;
        this.cnpj = body.cnpj ?? null;

        this.validarCampos();
    }

    validarCampos() {
        if (this.nome !== null && (typeof this.nome !== 'string' || this.nome.trim() === '')) {
            throw new BadRequestError('Nome inválido.');
        }
        if (this.email !== null) {
            if (typeof this.email !== 'string' || this.email.trim() === '') {
                throw new BadRequestError('Email inválido.');
            }
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email)) {
                throw new BadRequestError('Formato de email inválido.');
            }
        }
        if (this.telefone !== null) {
            if (typeof this.telefone !== 'string' || this.telefone.trim() === '') {
                throw new BadRequestError('Telefone inválido.');
            }
            if (this.telefone.replace(/\D/g, '').length < 10) {
                throw new BadRequestError('Telefone deve ter pelo menos 10 dígitos.');
            }
        }
        if (this.cpf !== null) {
            if (typeof this.cpf !== 'string' || this.cpf.trim() === '') {
                throw new BadRequestError('CPF inválido.');
            }
            if (this.cpf.replace(/\D/g, '').length !== 11) {
                throw new BadRequestError('CPF deve ter 11 dígitos.');
            }
        }
        if (this.cnpj !== null) {
            if (typeof this.cnpj !== 'string' || this.cnpj.trim() === '') {
                throw new BadRequestError('CNPJ inválido.');
            }
            if (this.cnpj.replace(/\D/g, '').length !== 14) {
                throw new BadRequestError('CNPJ deve ter 14 dígitos.');
            }
        }
    }
}

export default UsuarioUpdateRequestDto;