import express from 'express';
import bodyParser from 'body-parser';
import RestauranteService from '../services/RestauranteService.js';
import Restaurante from '../model/restaurante/Restaurante.js';
import RestauranteRegisterRequestDto from '../model/restaurante/dtos/RestauranteRegisterRequestDto.js';
import Endereco from '../model/usuario/Endereco.js';


class RestauranteController {
    constructor() {
        this.router = express.Router();
        this.router.use(bodyParser.json());
        this.restauranteService = new RestauranteService();
        this.iniciaRotas();
        this.dataHoraAtual = new Date().toLocaleString('sv-SE', { timeZone: 'America/Sao_Paulo' }).replace(' ', 'T');
    }

    iniciaRotas() {
        this.router.post("/register", this.registraRestaurante.bind(this));
    }

    async registraRestaurante(req, res) {
        try {
            let restauranteDto = new RestauranteRegisterRequestDto(req.body);

            let restaurante = new Restaurante(null, restauranteDto.nome, restauranteDto.descricao, restauranteDto.razaoSocial,
                restauranteDto.taxaFrete, this.dataHoraAtual, null, new Endereco(restauranteDto.endereco),
                req.body.usuarioId, restauranteDto.formasPagamento, restauranteDto.cozinha
            );

            await this.restauranteService.registra(restaurante);
            res.status(201).json({ mensagem: "Restaurante cadastrado com sucesso" });
        } catch (err) {
            throw err;
        }
    }
}

export default RestauranteController;