import express from 'express';
import EnderecoService from '../services/EnderecoService.js';
import CidadeResponseDto from "../model/endereco/dtos/CidadesReponseDto.js";

class EnderecoController {
    constructor() {
        this.router = express.Router();
        this.enderecoService = new EnderecoService();
     
        this.iniciaRotas();
    }

     iniciaRotas() {
        this.router.get("/buscaTodasCidades",
            this.buscaTodasCidades.bind(this)
        );
    }	

    async buscaTodasCidades(req, res) {
        try {
            const cidades = await this.enderecoService.buscaTodasCidades();
            const cidadesDto = cidades.map(cidade => new CidadeResponseDto(cidade.id, cidade.nome, cidade.estado));

            res.status(200).json(cidadesDto);
        } catch (err) {
            throw err;
        }
    }


}

export default EnderecoController;