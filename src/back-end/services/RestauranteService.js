import RestauranteRepository from '../repository/RestauranteRepository.js';
import RestaurantePagamentoService from './RestaurantePagamentoService.js';
import { BadRequestError, NotFoundError } from '../exception/GlobalExceptions.js';
import GrupoService from './GrupoService.js';
import { GrupoNomeEnum } from '../model/usuario/enums/GrupoNomeEnum.js';
import UsuarioGrupoService from './UsuarioGrupoService.js';
import Foto from '../model/foto/Foto.js';

class RestauranteService {

    constructor() {
        this.restauranteRepository = new RestauranteRepository();
        this.restaurantePagamentoService = new RestaurantePagamentoService();
        this.usuarioGrupoService = new UsuarioGrupoService();
        this.grupoSerivce = new GrupoService();

    }

    async registra(restaurante, foto) {
        try {
            const gruposSistema = await this.grupoSerivce.buscarTodos();
            const gruposUsuario = await this.usuarioGrupoService.buscaGruposDoUsuario(restaurante.getIdUsuario());
            const jaTemGrupoRestaurante = gruposUsuario.some(grupo => grupo.getNome() === GrupoNomeEnum.RESTAURANTE);

            restaurante.setAtivo(true);

            return await this.restauranteRepository.registra(
                restaurante,
                restaurante.getIdsFormaPagamento(),
                gruposSistema,
                foto,
                jaTemGrupoRestaurante
            );
        } catch (err) {
            throw err;
        }
    }

    async buscarPorId(id) {
        try {
            const restaurante = await this.restauranteRepository.buscarPorId(id);
            if (!restaurante) {
                throw new NotFoundError(`Restaurante com ID ${id} não encontrado.`);
            }
            return restaurante;
        } catch (err) {
            throw err;
        }
    }

    async buscarRestaurantesAssociadosAUsuario(idUsuario) {
        try {
            const restaurantes = await this.restauranteRepository.buscarRestaurantesAssociadosAUsuario(idUsuario);
            for (const restaurante of restaurantes) {
                if (!restaurante) {
                    throw new NotFoundError(`Restaurante com ID ${idUsuario} não encontrado.`);
                }
            }
            return restaurantes;
        } catch (err) {
            throw err;
        }
    }

    async atualiza(id, restauranteDto, foto) {
        try {
            const restaurante = await this.restauranteRepository.buscarPorId(id);
            if (!restaurante) throw new NotFoundError("Restaurante não encontrado");

            restaurante.setNome(restauranteDto.nome);
            restaurante.setDescricao(restauranteDto.descricao);
            restaurante.setRazaoSocial(restauranteDto.razaoSocial);

            const endereco = restaurante.getEndereco();
            endereco.setCep(restauranteDto.cep);
            endereco.setLogradouro(restauranteDto.logradouro);
            endereco.setNumero(restauranteDto.numero);
            endereco.setComplemento(restauranteDto.complemento);
            endereco.setBairro(restauranteDto.bairro);
            endereco.setCidadeId(restauranteDto.cidadeId);
            restaurante.setEndereco(endereco);

            restaurante.setDataAtualizacao(new Date().toLocaleString('sv-SE', { timeZone: 'America/Sao_Paulo' }).replace(' ', 'T'));

            return await this.restauranteRepository.atualiza(restaurante, foto);
        } catch (err) {
            throw err;
        }
    }

    async excluirLogicamente(id) {
        try {
            const restaurante = await this.restauranteRepository.buscarPorId(id);
            if (!restaurante) {
                throw new NotFoundError(`Restaurante com ID ${id} não encontrado para exclusão lógica.`);
            }
            return await this.restauranteRepository.excluirLogicamente(id);
        } catch (err) {
            throw err;
        }
    }
}

export default RestauranteService;