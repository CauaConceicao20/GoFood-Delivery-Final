import UsuarioService from "./UsuarioService.js";
import TokenService from "./TokenService.js";
import { UnauthorizedError } from "../exception/GlobalExceptions.js";

class AuthService {

    constructor() {
        this.tokenService = new TokenService();
        this.usuarioService = new UsuarioService();
    }

    async login(email, password) {
        try {
            const usuario = await this.validaCredenciais(email, password);
            if (!usuario) {
                throw new UnauthorizedError('Usuário ou senha inválidos');
            }
            return await this.tokenService.gerarToken(usuario);
        } catch (err) {
            throw err;
        }
    }

    async validaCredenciais(email, senha) {
        try {

            if (!email || !senha) {
                throw new UnauthorizedError('Email e senha são obrigatórios');
            }

            const usuario = await this.usuarioService.buscarPorEmail(email);

            if (!usuario) {
                throw new UnauthorizedError('Usuário não encontrado');
            }

            if (usuario.getSenha() !== senha) {
                throw new UnauthorizedError('Senha incorreta');
            }

            return usuario;
        } catch (err) {
            throw err;
        }
    }

}

export default AuthService;