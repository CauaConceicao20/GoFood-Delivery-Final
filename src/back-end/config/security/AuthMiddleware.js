import TokenService from '../../services/TokenService.js';
import { UnauthorizedError, ForbiddenError } from '../../exception/GlobalExceptions.js';

class AuthMiddleware {
    constructor() {
        this.tokenService = new TokenService();
    }

    autenticar(req, res, next) {
        try {
            const token = req.cookies?.token || req.headers.authorization?.replace('Bearer ', '');

            if (!token) {
                throw new UnauthorizedError('Token não fornecido');
            }

            const payload = this.tokenService.validarToken(token);

            if (!payload) {
                throw new UnauthorizedError('Token inválido ou expirado');
            }

            req.usuario = payload;
            next();

        } catch (err) {
            throw err;
        }
    }

    autorizar(gruposPermitidos) {
        return (req, res, next) => {
            const gruposUsuario = req.usuario?.grupo;

            if (!gruposUsuario || !gruposUsuario.some(grupo => gruposPermitidos.includes(grupo))
            ) {
                throw new ForbiddenError('Acesso negado');
            }
            next();
        };
    }
}

export default AuthMiddleware;