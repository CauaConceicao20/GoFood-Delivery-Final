import express from 'express';
import bodyParser from 'body-parser';
import LoginRequestDto from '../model/usuario/dtos/LoginRequestDto.js';
import TokenService from '../services/TokenService.js';
import AuthService from '../services/AuthService.js';
import { UnauthorizedError } from '../exception/GlobalExceptions.js';


class AuthController {
    constructor() {
        this.router = express.Router();
        this.router.use(bodyParser.json());
        this.authService = new AuthService();
        this.tokenService = new TokenService();
        this.iniciaRotas();
    }

    iniciaRotas() {
        this.router.post("/login", this.login.bind(this));
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

            res.status(200).json({ message: 'Login successful', token: token});
        } catch (err) {
            throw err
        }
    }

    /*
      async register(req, res) {
        try {
          const { username, password } = req.body;
          const user = await this.authService.register(username, password);
          res.status(201).json({ message: 'Registration successful', user });
        } catch (error) {
          res.status(400).json({ message: error.message });
        }
      }
        */
}

export default AuthController;