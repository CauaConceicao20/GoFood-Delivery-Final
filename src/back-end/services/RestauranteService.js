import RestauranteRepository from '../repository/RestauranteRepository.js';
import RestaurantePagamentoService from './RestaurantePagamentoService.js';
import { BadRequestError } from '../exception/GlobalExceptions.js';
import GrupoService from './GrupoService.js';

class RestauranteService {

    constructor() {
        this.restauranteRepository = new RestauranteRepository();
        this.restaurantePagamentoService = new RestaurantePagamentoService();
        this.grupoSerivce = new GrupoService();

    }

    async registra(restaurante) {
        try {
            const grupos = await this.grupoSerivce.buscarTodos();
            return await this.restauranteRepository.registra(restaurante, restaurante.getIdsFormaPagamento(), grupos);
        } catch (err) {
            throw err;
        }
    }

    async buscarRestauranteAssociadoAUsuario(idUsuario) {
        try {
            const restaurante = await this.restauranteRepository.buscaRestauranteAssociadoAUsuario(idUsuario);
            if (!restaurante) {
                throw new BadRequestError(`Restaurante com ID ${idUsuario} não encontrado.`);
            }
            return restaurante;
        } catch (err) {
            throw err;
        }
    }
}

export default RestauranteService;