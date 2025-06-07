import jwt from 'jsonwebtoken';
import { UnauthorizedError } from '../exception/GlobalExceptions';

class TokenService {

    gerarToken(usuario) {
        if (!usuario) {
            throw new UnauthorizedError('Usuário não encontrado');
        }

        const payload = { id: usuario.getId(), grupo: usuario.getGrupo() };

        try {
            const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.TOKEN_EXPIRATION });
            if (!token) {
                throw new UnauthorizedError('Erro ao gerar token');
            }
            return token;
        } catch (err) {
            throw err;
        }

    }

    validarToken(token) {
        try {
            return jwt.verify(token, process.env.JWT_SECRET);
        } catch (err) {
            return null;
        }
    }
}

export default TokenService;