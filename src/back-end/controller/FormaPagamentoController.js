import express from 'express';
import bodyParser from 'body-parser';
import AuthMiddleware from '../config/security/AuthMiddleware.js';
import FormaPagamentoService from '../services/FormaPagamentoService.js';
import FormaPagamentoResponseDto from '../model/pagamento/dtos/FormaPagamentoResponseDto.js';

class FormaPagamentoController {
    constructor() {
        this.router = express.Router();
        this.authMiddleware = new AuthMiddleware();
        this.formaPagamentoService = new FormaPagamentoService();
        this.iniciaRotas();
    }

    iniciaRotas() {
        this.router.get("/buscarTodos",
            this.authMiddleware.autenticar.bind(this.authMiddleware),
            this.authMiddleware.autorizar(['CLIENTE']),
            this.buscarTodosFormasPagamento.bind(this)
        );
    }

    async buscarTodosFormasPagamento(req, res) {
        try {
            const formasDePagamento = await this.formaPagamentoService.buscarTodos();
            const formasPagamentoDto = formasDePagamento.map(formaPagamento => new FormaPagamentoResponseDto(formaPagamento));
            
            res.status(200).json(formasPagamentoDto);
        } catch (err) {
            throw err;
        }
    }
}

export default FormaPagamentoController;