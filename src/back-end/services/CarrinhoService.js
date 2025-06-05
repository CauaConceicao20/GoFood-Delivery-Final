import CarrinhoRepository from '../repository/CarrinhoRepository.js';

class CarrinhoService {

    constructor() {
        this.carrinhoRepository = new CarrinhoRepository();
    }

    async registra(carrinho, idUsuario) {
        try {
            return await this.carrinhoRepository.registra(carrinho, idUsuario);
        } catch (err) {
            throw err;
        }
    }
}
export default CarrinhoService;