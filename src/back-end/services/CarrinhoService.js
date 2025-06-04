import CarrinhoRepository from '../repository/CarrinhoRepository.js';

class CarrinhoService {

    constructor() {
        this.carrinhoRepository = new CarrinhoRepository();
    }

    async registra(carrinho, idUsuario) {
        try {
            return await this.carrinhoRepository.registra(carrinho, idUsuario);
        } catch (err) {
            console.error(err);
            throw new Error(`${err.message}`);
        }
    }
}
export default CarrinhoService;