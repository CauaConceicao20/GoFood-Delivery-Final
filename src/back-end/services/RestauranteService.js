import RestauranteRepository from '../repository/RestauranteRepository.js';
import RestaurantePagamentoService from './RestaurantePagamentoService.js';
import FormaPagamentoService from './FormaPagamentoService.js';
import UsuarioService from './UsuarioService.js';
import { BadRequestError } from '../exception/GlobalExceptions.js';

class RestauranteService {

    constructor() {
        this.restauranteRepository = new RestauranteRepository();
        this.restaurantePagamentoService = new RestaurantePagamentoService();
        this.usuarioService = new UsuarioService();

    }

    async registra(restaurante) {
    try {
        await this.usuarioService.buscarPorId(restaurante.getIdUsuario())
        return await this.restauranteRepository.registra(restaurante, restaurante.getIdsFormaPagamento());
    } catch (err) {
        throw err;
    }
}

    async buscarRestauranteAssociadoAUsuario(idUsuario) {
        try {
            const restaurante = await this.restauranteRepository.buscaRestauranteAssociadoAUsuario(idUsuario);
            if(!restaurante){
                throw new BadRequestError(`Restaurante com ID ${idUsuario} não encontrado.`);
            }
            return restaurante;
        } catch (err) {
            throw err;
        }
    }
}

export default RestauranteService;