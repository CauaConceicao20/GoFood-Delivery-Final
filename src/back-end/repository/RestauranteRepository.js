import Connection from "../database/Connection.js";
import RestaurantePagamentoRepository from "./RestaurantePagamentoRepository.js";
import Restaurante from "../model/restaurante/Restaurante.js";
import FormaPagamentoRepository from "./FormaPagamentoRepository.js";
import RestaurantePagamento from "../model/restaurante/RestaurantePagamento.js";
import UsuarioGrupoRepository from "./UsuarioGrupoRepository.js";
import { GrupoNomeEnum } from "../model/usuario/enums/GrupoNomeEnum.js";
import UsuarioGrupo from "../model/usuario/UsuarioGrupo.js";
import Endereco from "../model/endereco/Endereco.js";
import { BadRequestError, NotFoundError } from "../exception/GlobalExceptions.js";
import { EntidadeFotoTipo } from "../model/foto/enums/EntidadeFotoTipo.js";

class RestauranteRepository {

    constructor() {
        this.connection = new Connection();
        this.restaurantePagamentoRepository = new RestaurantePagamentoRepository();
        this.formaDePagamentoRepository = new FormaPagamentoRepository();
        this.usuarioGrupoRepository = new UsuarioGrupoRepository();
    }

    async registra(restaurante, idsFormaPagamento, grupos, foto, jaTemGrupoRestaurante) {
        let conn;
        try {
            conn = await this.connection.connect();
            await conn.run("BEGIN TRANSACTION");

            await this.create(restaurante, foto, conn);

            for (const idFormaPagamento of idsFormaPagamento) {
                const formaPagamentoEncontrada = await this.formaDePagamentoRepository.buscarPorId(idFormaPagamento, conn);
                await this.restaurantePagamentoRepository.associaRestauranteEPagamento(
                    new RestaurantePagamento(restaurante.getId(), formaPagamentoEncontrada.getId()), conn
                );
            }

            if (!jaTemGrupoRestaurante) {
                for (const grupo of grupos) {
                    if (grupo.getNome() === GrupoNomeEnum.RESTAURANTE) {
                        await this.usuarioGrupoRepository.associaUsuarioAoGrupo(
                            new UsuarioGrupo(restaurante.getIdUsuario(), grupo.getId()), conn
                        );
                    }
                }
            }

            await conn.run("COMMIT");
            return restaurante;
        } catch (err) {
            await conn.run("ROLLBACK");
            throw err;
        }
    }

    async create(restaurante, foto, conn) {
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

            await conn.run(
                `INSERT INTO fotos (nome, content_type, tamanho, url, entidade_tipo, entidade_id)
                             VALUES (?, ?, ?, ?, ?, ?)`,
                [foto.getNome(), foto.getContentType(), foto.getTamanho(), foto.getUrl(),
                EntidadeFotoTipo.RESTAURANTE, restaurante.getId()]
            );

            return restaurante;

        } catch (err) {
            if (err.code === 'SQLITE_CONSTRAINT' && err.message.includes('restaurantes.cnpj')) {
                throw new BadRequestError('CNPJ já cadastrado.');
            }
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
                restauranteEncontrado.usuario_id, null, restauranteEncontrado.cnpj );

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
                const endereco = new Endereco(restauranteEncontrado.cep, restauranteEncontrado.logradouro,
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

    async atualiza(restaurante, novaFoto) {
        let conn;
        try {
            conn = await this.connection.connect();
            await conn.run("BEGIN TRANSACTION");

            const campos = [];
            const valores = [];

            if (restaurante.getNome()) {
                campos.push('nome = ?');
                valores.push(restaurante.getNome());
            }
            if (restaurante.getDescricao()) {
                campos.push('descricao = ?');
                valores.push(restaurante.getDescricao());
            }
            if (restaurante.getRazaoSocial()) {
                campos.push('razao_social = ?');
                valores.push(restaurante.getRazaoSocial());
            }

            const endereco = restaurante.getEndereco();

            if (endereco.getCep()) {
                campos.push('cep = ?');
                valores.push(endereco.getCep());
            }
            if (endereco.getLogradouro()) {
                campos.push('logradouro = ?');
                valores.push(endereco.getLogradouro());
            }
            if (endereco.getNumero()) {
                campos.push('numero = ?');
                valores.push(endereco.getNumero());
            }
            if (endereco.getComplemento()) {
                campos.push('complemento = ?');
                valores.push(endereco.getComplemento());
            }
            if (endereco.getBairro()) {
                campos.push('bairro = ?');
                valores.push(endereco.getBairro());
            }
            if (endereco.getCidadeId()) {
                campos.push('cidade_id = ?');
                valores.push(endereco.getCidadeId());
            }

            campos.push('data_atualizacao = ?');
            valores.push(restaurante.getDataAtualizacao());

            valores.push(restaurante.getId());
            const query = `UPDATE restaurantes SET ${campos.join(', ')} WHERE id = ?`;
            await conn.run(query, valores);

            if (novaFoto) {
                const row = await conn.get(
                    `SELECT id, url FROM fotos WHERE entidade_id = ? AND entidade_tipo = ?`,
                    [restaurante.getId(), 'RESTAURANTE']
                );

                if (row) {
                    const caminhoAntigo = path.resolve('uploads', path.basename(row.url));
                    try {
                        await fs.unlink(caminhoAntigo);
                    } catch (err) {
                        console.warn('Falha ao excluir imagem antiga:', err.message);
                    }

                    await conn.run(`DELETE FROM fotos WHERE id = ?`, [row.id]);
                }

                await conn.run(
                    `INSERT INTO fotos (nome, content_type, tamanho, url, entidade_tipo, entidade_id)
                 VALUES (?, ?, ?, ?, ?, ?)`,
                    [
                        novaFoto.getNome(),
                        novaFoto.getContentType(),
                        novaFoto.getTamanho(),
                        novaFoto.getUrl(),
                        'RESTAURANTE',
                        restaurante.getId()
                    ]
                );
            }

            await conn.run("COMMIT");
            return await this.buscarPorId(restaurante.getId(), conn);
        } catch (err) {
            await conn.run("ROLLBACK");
            throw err;
        }
    }
}

export default RestauranteRepository;