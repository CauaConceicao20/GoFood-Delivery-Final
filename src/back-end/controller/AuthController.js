import express from 'express';
import bodyParser from 'body-parser';
import LoginRequestDto from '../model/usuario/dtos/LoginRequestDto.js';
import TokenService from '../services/TokenService.js';
import AuthService from '../services/AuthService.js';
import AuthMiddleware from '../config/security/AuthMiddleware.js';
import { UnauthorizedError } from '../exception/GlobalExceptions.js';
import UsuarioService from '../services/UsuarioService.js';
import UsuarioResponseDto from '../model/usuario/dtos/UsuarioResponseDto.js';
import UsuarioGrupoService from '../services/UsuarioGrupoService.js';


class AuthController {
  constructor() {
    this.router = express.Router();
    this.router.use(bodyParser.json());
    this.authService = new AuthService();
    this.tokenService = new TokenService();
    this.authMiddleware = new AuthMiddleware();
    this.usuarioService = new UsuarioService
    this.UsuarioGrupoService = new UsuarioGrupoService();
    this.iniciaRotas();
  }

  iniciaRotas() {
    this.router.post("/login", this.login.bind(this));
    this.router.get("/me", this.authMiddleware.autenticar.bind(this.authMiddleware),
      this.buscaUsuarioLogado.bind(this));
  }

  async login(req, res) {
    try {
      const loginDto = new LoginRequestDto(req.body.email, req.body.senha);
      let token = await this.authService.login(loginDto.email, loginDto.senha);

      if (!token) {
        throw new UnauthorizedError('Usuário ou senha inválidos');
      }

      res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 3600000
      });

      res.status(200).json({ message: 'Login successful', token: token });
    } catch (err) {
      throw err
    }
  }

 async buscaUsuarioLogado(req, res) {
    try {
      const usuario = await this.usuarioService.buscarPorId(req.usuario.id);
      const grupos = await this.UsuarioGrupoService.buscaGruposDoUsuario(usuario.getId());
      const usuarioDto = new UsuarioResponseDto(usuario, grupos);

      res.status(200).json(usuarioDto);
    } catch (err) {
      res.status(500).json({ erro: 'Erro ao buscar informações do usuário.' });
    }
  }
}

export default AuthController;