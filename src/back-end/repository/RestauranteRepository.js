import Connection from "../database/Connection.js";
import RestaurantePagamentoRepository from "./RestaurantePagamentoRepository.js";

class RestauranteRepository {

    constructor() {
        this.connection = new Connection();
        this.restaurantePagamentoRepository = new RestaurantePagamentoRepository();
    }

    async registra(restaurante) {
        let conn;
        try {
            conn = await this.connection.connect();

            await conn.run("BEGIN TRANSACTION");

            const result = await conn.run(
                `INSERT INTO restaurantes (
                nome, descricao, razao_social, taxa_frete, data_cadastro, data_atualizacao, aberto, ativo,
                cep, logradouro, numero, complemento, bairro, cidade_id, usuario_id
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                [restaurante.getNome(), restaurante.getDescricao(), restaurante.getRazaoSocial(), restaurante.getTaxaFrete(),
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

            await conn.run("COMMIT");
            restaurante.setId(result.lastID);
            return restaurante;

        } catch (err) {
            await conn.run("ROLLBACK");
            throw err;
        }
    }
}

export default RestauranteRepository;