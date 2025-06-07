import FormaPagamentoRepository from "../repository/FormaPagamentoRepository.js";

class FormaPagamentoService {
    constructor() {
        this.formaPagamentoRepository = new FormaPagamentoRepository();
    }
    
    async buscarPorId(id) {
        try {
            return await this.formaPagamentoRepository.buscarPorId(id);
        } catch (err) {
            throw err;
        }
    }
}

export default FormaPagamentoService;