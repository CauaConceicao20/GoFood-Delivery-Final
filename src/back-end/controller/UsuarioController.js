import express from 'express';
import bodyParser from 'body-parser';
import UsuarioService from '../services/UsuarioService.js';
import Usuario from '../model/usuario/Usuario.js';
import UsuarioRegisterRequestDto from '../model/usuario/dtos/UsuarioRegisterRequestDto.js';


class UsuarioController {
    constructor() {
        this.router = express.Router();
        this.router.use(bodyParser.json());
        this.usuarioService = new UsuarioService();
        this.iniciaRotas();
        this.dataHoraAtual = new Date().toLocaleString('sv-SE', { timeZone: 'America/Sao_Paulo' }).replace(' ', 'T');
    }

    iniciaRotas() {
        this.router.post("/register", this.registraUsuario.bind(this));
    }

    async registraUsuario(req, res) {
        try {
            let usuarioDto = new UsuarioRegisterRequestDto(req.body);
            let usuario = new Usuario(null, usuarioDto.nome, usuarioDto.email, usuarioDto.senha, this.dataHoraAtual, usuarioDto.telefone, usuarioDto.cpf, usuarioDto.cnpj);
            await this.usuarioService.registraUsuario(usuario);
            res.status(201).json({ mensagem: "Usuario cadastrado com sucesso" });
        } catch (err) {
            throw err;
        }
    }
}

export default UsuarioController;