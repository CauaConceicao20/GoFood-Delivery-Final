import express from 'express';
import bodyParser from 'body-parser';
import UsuarioService from '../services/UsuarioService.js';
import Usuario from '../model/usuario/Usuario.js';
import UsuarioRegisterRequestDto from '../model/usuario/dtos/UsuarioRegisterRequestDto.js';
import UsuarioUpdateRequestDto from '../model/usuario/dtos/UsuarioUpdateRequestDto.js';


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
        this.router.put("/update/:id", this.atualizaUsuario.bind(this));
    }

    async registraUsuario(req, res) {
        try {
            let usuarioDto = new UsuarioRegisterRequestDto(req.body);
            let usuario = new Usuario(null, usuarioDto.nome, usuarioDto.email, usuarioDto.senha, this.dataHoraAtual,
                 usuarioDto.telefone, usuarioDto.cpf);
            await this.usuarioService.registraUsuario(usuario);
            res.status(201).json({ mensagem: "Usuario cadastrado com sucesso" });
        } catch (err) {
            throw err;
        }
    }

    async atualizaUsuario(req, res) {
        try {
            const usuarioEncontrado = await this.usuarioService.buscarPorId(req.params.id);

            let usuarioDto = new UsuarioUpdateRequestDto(req.body);
            let usuario = new Usuario(usuarioEncontrado.getId(), usuarioDto.nome, usuarioDto.email, usuarioDto.senha,
             this.dataHoraAtual, usuarioDto.telefone, usuarioDto.cpf);
            await this.usuarioService.atualizaUsuario(usuario);
            res.status(200).json({ mensagem: "Usuario atualizado com sucesso" });
        } catch (err) {
            throw err;
        }
    }
}

export default UsuarioController;