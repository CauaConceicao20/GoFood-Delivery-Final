import jwt from 'jsonwebtoken';
import UsuarioGrupoService from './UsuarioGrupoService.js';
import { UnauthorizedError } from '../exception/GlobalExceptions.js';

class TokenService {

    constructor() {
        this.usuarioGrupoService = new UsuarioGrupoService();
    }

    async gerarToken(usuario) {
        if (!usuario) {
            throw new UnauthorizedError('Usuário não encontrado');
        }
        const grupos = await this.usuarioGrupoService.buscaGruposDoUsuario(usuario.getId());

        const payload = { id: usuario.getId(), grupo: grupos.map(grupo => grupo.getNome()) };

        try {
            const token = jwt.sign(payload, process.env.TOKEN_SECRET, { expiresIn: process.env.TOKEN_EXPIRATION });
            if (!token) {
                throw new UnauthorizedError('Erro ao gerar token');
            }
            return token;
        } catch (err) {
            throw err;
        }

    }

    async refreshToken(usuario) {
        return await this.gerarToken(usuario);
    }

    validarToken(token) {
        try {
            return jwt.verify(token, process.env.TOKEN_SECRET);
        } catch (err) {
            return null;
        }
    }

}

export default TokenService;