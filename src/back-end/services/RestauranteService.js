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

    async registra(restaurante, foto) {
        try {
            const grupos = await this.grupoSerivce.buscarTodos();
            return await this.restauranteRepository.registra(restaurante, restaurante.getIdsFormaPagamento(), grupos, foto);
        } catch (err) {
            throw err;
        }
    }

    async buscarPorId(id) {
        try {
            const restaurante = await this.restauranteRepository.buscarPorId(id);
            if (!restaurante) {
                throw new BadRequestError(`Restaurante com ID ${id} não encontrado.`);
            }
            return restaurante;
        } catch (err) {
            throw err;
        }
    }

    async buscarRestaurantesAssociadosAUsuario (idUsuario) {
        try {
            const restaurantes = await this.restauranteRepository.buscarRestaurantesAssociadosAUsuario(idUsuario);
            for(const restaurante of restaurantes) {
                if (!restaurante) {
                    throw new BadRequestError(`Restaurante com ID ${idUsuario} não encontrado.`);
                }
            }
            return restaurantes;
        } catch (err) {
            throw err;
        }
    }
}

export default RestauranteService;