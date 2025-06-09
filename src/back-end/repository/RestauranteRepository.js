import Connection from "../database/Connection.js";
import RestaurantePagamentoRepository from "./RestaurantePagamentoRepository.js";
import Restaurante from "../model/restaurante/Restaurante.js";
import FormaPagamentoRepository from "./FormaPagamentoRepository.js";
import RestaurantePagamento from "../model/restaurante/RestaurantePagamento.js";

class RestauranteRepository {

    constructor() {
        this.connection = new Connection();
        this.restaurantePagamentoRepository = new RestaurantePagamentoRepository();
        this.formaDePagamentoRepository = new FormaPagamentoRepository();
    }

    async registra(restaurante, idsFormaPagamento) {
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
                nome, descricao, razao_social, taxa_frete, data_cadastro, data_atualizacao, aberto, ativo,
                cep, logradouro, numero, complemento, bairro, cidade_id, usuario_id
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                [
                    restaurante.getNome(), restaurante.getDescricao(), restaurante.getRazaoSocial(), restaurante.getTaxaFrete(),
                    restaurante.getDataCadastro(), restaurante.getDataAtualizacao(),
                    restaurante.getAberto(), restaurante.getAtivo(), restaurante.getEndereco().getCep(),
                    restaurante.getEndereco().getLogradouro(), restaurante.getEndereco().getNumero(),
                    restaurante.getEndereco().getComplemento(), restaurante.getEndereco().getBairro(), restaurante.getEndereco().getCidadeId(),
                    restaurante.getIdUsuario()
                ]
            );

            if (!result.changes) {
                throw new Error('Erro ao criar restaurante');
            }

            restaurante.setId(result.lastID);
            return restaurante;

        } catch (err) {
            throw err;
        }
    }

    async buscaRestauranteAssociadoAUsuario(idUsuario, conn) {
        try {
            if(!conn) await this.connection.connect();
            conn = await this.connection.connect();
            const restaurante = await conn.get(`SELECT * FROM restaurantes WHERE usuario_id = ?`, [idUsuario]);

            if (!restaurante) {
                throw new NotFoundError(`Restaurante com ID ${id} não encontrado.`);
            }

            return new Restaurante(restaurante.id, restaurante.nome, restaurante.descricao, restaurante.razao_social, restaurante.taxa_frete,
                restaurante.data_cadastro, restaurante.data_atualizacao, restaurante.aberto, restaurante.ativo, restaurante.cep,
                restaurante.logradouro, restaurante.numero, restaurante.complemento, restaurante.bairro, restaurante.cidade_id,
                restaurante.usuario_id);

        } catch (err) {
            throw err;
        }
    }
}

export default RestauranteRepository;