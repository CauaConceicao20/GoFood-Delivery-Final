import express from 'express';
import bodyParser from 'body-parser';
import AuthMiddleware from '../config/security/AuthMiddleware.js';
import RestauranteService from '../services/RestauranteService.js';
import Restaurante from '../model/restaurante/Restaurante.js';
import RestauranteRegisterRequestDto from '../model/restaurante/dtos/RestauranteRegisterRequestDto.js';
import Endereco from '../model/usuario/Endereco.js';

class RestauranteController {
    constructor() {
        this.router = express.Router();
        this.router.use(bodyParser.json());
        this.restauranteService = new RestauranteService();
        this.authMiddleware = new AuthMiddleware();
        this.dataHoraAtual = new Date().toLocaleString('sv-SE', { timeZone: 'America/Sao_Paulo' }).replace(' ', 'T');

        this.iniciaRotas();
    }

    iniciaRotas() {
        this.router.post("/registra",
            this.authMiddleware.autenticar.bind(this.authMiddleware),
            this.authMiddleware.autorizar('CLIENTE'),
            this.registraRestaurante.bind(this)
        );
    }

    async registraRestaurante(req, res) {
        try {
            const usuarioId = req.usuario.id;
            const restauranteDto = new RestauranteRegisterRequestDto(req.body);

            let restaurante = new Restaurante(null, restauranteDto.nome, restauranteDto.descricao, restauranteDto.razaoSocial,
                restauranteDto.taxaFrete, this.dataHoraAtual, null, new Endereco(restauranteDto.endereco),
                usuarioId, restauranteDto.formasPagamento, restauranteDto.cozinha
            );

            await this.restauranteService.registra(restaurante);
            res.status(201).json({ mensagem: "Restaurante cadastrado com sucesso" });
        } catch (err) {
            throw err;
        }
    }
}

export default RestauranteController;