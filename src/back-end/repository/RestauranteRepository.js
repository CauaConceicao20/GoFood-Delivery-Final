import Connection from "../database/Connection.js";
import RestaurantePagamentoRepository from "./RestaurantePagamentoRepository.js";
import Restaurante from "../model/restaurante/Restaurante.js";
import FormaPagamentoRepository from "./FormaPagamentoRepository.js";
import RestaurantePagamento from "../model/restaurante/RestaurantePagamento.js";
import UsuarioGrupoRepository from "./UsuarioGrupoRepository.js";
import { GrupoNomeEnum } from "../model/usuario/enums/GrupoNomeEnum.js";
import UsuarioGrupo from "../model/usuario/UsuarioGrupo.js";
import Endereco from "../model/usuario/Endereco.js";
import { BadRequestError, NotFoundError } from "../exception/GlobalExceptions.js";

class RestauranteRepository {

    constructor() {
        this.connection = new Connection();
        this.restaurantePagamentoRepository = new RestaurantePagamentoRepository();
        this.formaDePagamentoRepository = new FormaPagamentoRepository();
        this.usuarioGrupoRepository = new UsuarioGrupoRepository();
    }

    async registra(restaurante, idsFormaPagamento, grupos) {
        let conn;
        try {
            conn = await this.connection.connect();
            await conn.run("BEGIN TRANSACTION");

            await this.create(restaurante, conn);

            for (const idFormaPagamento of idsFormaPagamento) {
                const formaPagamentoEncontrada = await this.formaDePagamentoRepository.buscarPorId(idFormaPagamento, conn);
                await this.restaurantePagamentoRepository.associaRestauranteEPagamento(
                    new RestaurantePagamento(restaurante.getId(), formaPagamentoEncontrada.getId()), conn);
            }

            for (const grupo of grupos) {
                if (grupo.getNome() === GrupoNomeEnum.RESTAURANTE)
                    await this.usuarioGrupoRepository.associaUsuarioAoGrupo(new UsuarioGrupo(restaurante.getIdUsuario(),
                        grupo.getId()), conn)
            }
            await conn.run("COMMIT");

            return restaurante;
        } catch (err) {
            await conn.run("ROLLBACK");
            throw err;
        }
    }

    async create(restaurante, conn) {
        try {
            if (!conn) conn = await this.connection.connect();

            const result = await conn.run(
                `INSERT INTO restaurantes (
                nome, descricao, razao_social, cnpj, taxa_frete, data_cadastro, data_atualizacao, aberto, ativo,
                cep, logradouro, numero, complemento, bairro, cidade_id, usuario_id
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                [
                    restaurante.getNome(), restaurante.getDescricao(), restaurante.getRazaoSocial(), restaurante.getCnpj(),
                    restaurante.getTaxaFrete(), restaurante.getDataCadastro(), restaurante.getDataAtualizacao(),
                    restaurante.getAberto(), restaurante.getAtivo(), restaurante.getEndereco().getCep(),
                    restaurante.getEndereco().getLogradouro(), restaurante.getEndereco().getNumero(),
                    restaurante.getEndereco().getComplemento(), restaurante.getEndereco().getBairro(),
                    restaurante.getEndereco().getCidadeId(),
                    restaurante.getIdUsuario()
                ]
            );

            if (!result.changes) {
                throw new BadRequestError('Erro ao criar restaurante');
            }

            restaurante.setId(result.lastID);
            return restaurante;

        } catch (err) {
            throw err;
        }
    }

    async buscarPorId(id, conn) {

        try {
            if (!conn) conn = await this.connection.connect();
            const restauranteEncontrado = await conn.get(`SELECT * FROM restaurantes WHERE id = ?`, [id]);

            if (!restauranteEncontrado) {
                throw new NotFoundError(`Restaurante com ID ${id} não encontrado.`);
            }

            const endereco = new Endereco(restauranteEncontrado.cep, restauranteEncontrado.logradouro,
                restauranteEncontrado.numero, restauranteEncontrado.complemento, restauranteEncontrado.bairro,
                restauranteEncontrado.cidade_id);

            const restaurante = new Restaurante(restauranteEncontrado.id, restauranteEncontrado.nome,
                restauranteEncontrado.descricao, restauranteEncontrado.razao_social, restauranteEncontrado.taxa_frete,
                restauranteEncontrado.data_cadastro, restauranteEncontrado.data_atualizacao, endereco,
                restauranteEncontrado.usuario_id);

            restaurante.setAberto(restauranteEncontrado.aberto);
            restaurante.setAtivo(restauranteEncontrado.ativo);
            return restaurante;
        } catch (err) {
            throw err;
        }
    }


    async buscarRestaurantesAssociadosAUsuario(idUsuario, conn) {
        try {
            if (!conn) conn = await this.connection.connect();
            const restaurantesEncontrados = await conn.all(`SELECT * FROM restaurantes WHERE usuario_id = ?`, [idUsuario]);

            return restaurantesEncontrados.map(restauranteEncontrado => {
                const endereco = new Endereco( restauranteEncontrado.cep, restauranteEncontrado.logradouro, 
                    restauranteEncontrado.numero, restauranteEncontrado.complemento, restauranteEncontrado.bairro,
                    restauranteEncontrado.cidade_id
                );

                const restaurante = new Restaurante(restauranteEncontrado.id, restauranteEncontrado.nome, 
                    restauranteEncontrado.descricao, restauranteEncontrado.razao_social, restauranteEncontrado.taxa_frete,
                    restauranteEncontrado.data_cadastro, restauranteEncontrado.data_atualizacao, endereco,
                    restauranteEncontrado.usuario_id
                );

                restaurante.setAberto(restauranteEncontrado.aberto);
                restaurante.setAtivo(restauranteEncontrado.ativo);
                return restaurante;
            });
        } catch (err) {
            throw err;
        }
    }
}

export default RestauranteRepository;