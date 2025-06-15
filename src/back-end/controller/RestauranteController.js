import express from 'express';
import bodyParser from 'body-parser';
import AuthMiddleware from '../config/security/AuthMiddleware.js';
import RestauranteService from '../services/RestauranteService.js';
import Restaurante from '../model/restaurante/Restaurante.js';
import RestauranteRegisterRequestDto from '../model/restaurante/dtos/RestauranteRegisterRequestDto.js';
import Endereco from '../model/usuario/Endereco.js';
import TokenService from '../services/TokenService.js';
import UsuarioService from '../services/UsuarioService.js';
import ConfigMulter from '../config/ConfigMulter.js';
import Foto from '../model/foto/Foto.js';
import FotoRegisterRequestDto from '../model/foto/dtos/FotoRegisterRequestDto.js';
import fs from 'fs/promises';
import path from 'path';

class RestauranteController {
    constructor() {
        this.router = express.Router();
        this.router.use(bodyParser.json());
        this.restauranteService = new RestauranteService();
        this.usaurioService = new UsuarioService();
        this.authMiddleware = new AuthMiddleware();
        this.tokenService = new TokenService();
        this.dataHoraAtual = new Date().toLocaleString('sv-SE', { timeZone: 'America/Sao_Paulo' }).replace(' ', 'T');
        this.configMulter = new ConfigMulter().getUploader().single('arquivo');

        this.iniciaRotas();
    }

    iniciaRotas() {
        this.router.post(
            "/registra",
            this.authMiddleware.autenticar.bind(this.authMiddleware),
            this.authMiddleware.autorizar('CLIENTE'),
            this.configMulter,
            this.registraRestaurante.bind(this)
        );
    }

    async registraRestaurante(req, res) {
        try {
            const usuario = await this.usaurioService.buscarPorId(req.usuario.id);
            const restauranteDto = new RestauranteRegisterRequestDto(JSON.parse(req.body.restaurante));
            const file = req.file;

            let restaurante = new Restaurante(null, restauranteDto.nome, restauranteDto.descricao,
                restauranteDto.razaoSocial, restauranteDto.taxaFrete, this.dataHoraAtual, null,
                new Endereco(restauranteDto.endereco), usuario.getId(), restauranteDto.formasPagamento,
                restauranteDto.cnpj
            );

            if (!file) {
                return res.status(400).json({ erro: 'Arquivo da foto é obrigatório' });
            }

            const fotoDto = new FotoRegisterRequestDto(req.file);
            const foto = new Foto(null, fotoDto.nome, fotoDto.content_type, fotoDto.url,
                fotoDto.tamanho);

            await this.restauranteService.registra(restaurante, foto);

            const token = await this.tokenService.refreshToken(usuario);

            res.cookie('token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: 3600000
            });

            res.status(201).json({ mensagem: "Restaurante cadastrado com sucesso", token: token });
        } catch (err) {
            if (req.file) {
                const uploadsDir = path.resolve('uploads');
                const filePath = path.join(uploadsDir, req.file.filename);
                try {
                    await fs.unlink(filePath);
                } catch (e) {
                    console.error('Erro ao remover arquivo órfão:', e);
                }
            }

            throw err;
        }
    }
}

export default RestauranteController;