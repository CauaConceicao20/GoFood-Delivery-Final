import RestauranteRepository from '../repository/RestauranteRepository.js';
import RestaurantePagamentoService from './RestaurantePagamentoService.js';
import FormaPagamentoService from './FormaPagamentoService.js';
import RestaurantePagamento from '../model/restaurante/RestaurantePagamento.js';
import UsuarioService from './UsuarioService.js';
import { BadRequestError } from '../exception/GlobalExceptions.js';

class RestauranteService {

    constructor() {
        this.restauranteRepository = new RestauranteRepository();
        this.restaurantePagamentoService = new RestaurantePagamentoService();
        this.formaPagamentoService = new FormaPagamentoService();
        this.usuarioService = new UsuarioService();

    }

    async registra(restaurante) {
        try {
            if(!await this.usuarioService.buscarPorId(restaurante.getIdUsuario())) {
                throw new BadRequestError(`Usuário com ID ${restaurante.getIdUsuario()} não encontrado.`);
            }
            let restauranteRegistrado = await this.restauranteRepository.registra(restaurante);
            for (const idFormaPagamento of restaurante.getIdsFormaPagamento()) {
                let formaPagamentoEncontrada = await this.formaPagamentoService.buscarPorId(idFormaPagamento);
                await this.restaurantePagamentoService.associaRestauranteEPagamento(
                    new RestaurantePagamento(restauranteRegistrado.getId(), formaPagamentoEncontrada.getId()));
            }
            return restauranteRegistrado;
        } catch (err) {
            throw err;
        }
    }
}

export default RestauranteService;