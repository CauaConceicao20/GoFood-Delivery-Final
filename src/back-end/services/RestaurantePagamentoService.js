import RestaurantePagamentoRepository from "../repository/RestaurantePagamentoRepository.js";

class RestaurantePagamentoService {
    constructor() {
        this.restaurantePagamentoRepository = new RestaurantePagamentoRepository();
    }

    async associaRestauranteEPagamento(restaurantePagamento) {
        try {
            return await this.restaurantePagamentoRepository.associaRestauranteEPagamento(restaurantePagamento);
        } catch (err) {
            throw err;
        }
    }

    async buscaFormasDePagamentoAssociadasAoRestaurante(idRestaurante) {
        try {
            return await this.restaurantePagamentoRepository.buscaFormasDePagamentoAssociadasAoRestaurante(idRestaurante);
        } catch (err) {
            throw err;
        }
    }
}



export default RestaurantePagamentoService;