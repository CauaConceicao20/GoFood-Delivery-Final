import Connection from "../database/Connection.js";
import { BadRequestError } from "../exception/GlobalExceptions.js";
import Carrinho from "../model/carrinho/Carrinho.js";
import ItemCarrinhoRepository from "./ItemCarrinhoRepository.js";
import ProdutoRepository from "./ProdutoRepository.js";

class CarrinhoRepository {

    constructor() {
        this.connection = new Connection();
        this.itemCarrinhoRepository = new ItemCarrinhoRepository();
        this.produtoRepository = new ProdutoRepository();
    }


    async adicionaProdutoAoCarrinho(itemCarrinho, carrinho, produto) {
        let conn = null;
        try {
            conn = await this.connection.connect();
            await conn.run("BEGIN TRANSACTION");

            await this.itemCarrinhoRepository.associaProdutoAoCarrinho(itemCarrinho, conn);
            let subtotalDoCarrinho = await this.verificaValorTotalCarrinho(carrinho.getId(), conn);
            let quantidadeTotalDeItensDoCarrinho = carrinho.getQuantidadeTotalDeItems();
            subtotalDoCarrinho += produto.getPreco() * itemCarrinho.getQuantidade();

            carrinho.setSubTotal(subtotalDoCarrinho);
            carrinho.setQuantidadeTotalDeItems(quantidadeTotalDeItensDoCarrinho + itemCarrinho.getQuantidade());

            await this.atualizaSubTotalEQuantidadeDoCarrinho(itemCarrinho, carrinho, conn);

            await conn.run("COMMIT");
        } catch (err) {
            if (conn) await conn.run("ROLLBACK");
            throw err;
        }
    }

    async create(carrinho, idUsuario, conn) {
        try {
            if (!conn) conn = await this.connection.connect();

            const result = await conn.run(`INSERT INTO carrinhos (quantidade_total_itens, sub_total, usuario_id) VALUES (?, ?, ?)`,
                [carrinho.getQuantidadeTotalDeItems(), carrinho.getSubTotal(), idUsuario]);

            if (!result.changes) {
                throw new Error('Erro ao criar carrinho');
            }

            return carrinho;
        } catch (err) {
            throw err;
        }
    }

    async buscaPorId(id, conn) {
        try {
            if (!conn) conn = await this.connection.connect();
            const result = await conn.get(`SELECT * FROM carrinhos WHERE id = ?`, [id]);

            if (!result) {
                throw new BadRequestError(`Carrinho com ID ${id} não encontrado.`);
            }

            return new Carrinho(result.id, result.quantidade_total_itens, result.sub_total, result.usuario_id);

        } catch (err) {
            throw err;
        }
    }

    async buscaCarrinhoAssociadoAUsuario(idUsuario, conn) {
        try {
            if (!conn) conn = await this.connection.connect();
            const result = await conn.get(`SELECT * FROM carrinhos WHERE usuario_id = ?`, [idUsuario]);

            if (!result) {
                throw new BadRequestError(`Carrinho não encontrado.`);
            }

            return new Carrinho(result.id, result.quantidade_total_itens, result.sub_total, result.usuario_id);

        } catch (err) {
            throw err;
        }
    }

    async atualizaSubTotalEQuantidadeDoCarrinho(itemCarrinho, carrinho, conn) {
        let localConn = null;
        let gerenciaTransacao = false;

        try {
            if (!conn) {
                localConn = await this.connection.connect();
                conn = localConn;
                gerenciaTransacao = true;
                await conn.run("BEGIN TRANSACTION");
            }

            await this.itemCarrinhoRepository.atualizaQuantidadeItemCarrinho(itemCarrinho, conn);
            await this.atualizaQuantidadeTotalItensDoCarrinho(carrinho.getQuantidadeTotalDeItems(), carrinho.getId(), conn);
            await this.atualizaPrecoTotalDoCarrinho(carrinho, conn)

            if (gerenciaTransacao) {
                await conn.run("COMMIT");
            }
        } catch (err) {
            if (gerenciaTransacao && conn) {
                await conn.run("ROLLBACK");
            }
            throw err;
        }
    }

    async atualizaQuantidadeTotalItensDoCarrinho(quandidateDeItens, carrinhoId, conn) {
        try {
            if (!conn) conn = await this.connection.connect();

            const result = await conn.run(`UPDATE carrinhos SET quantidade_total_itens = ? WHERE id = ?`,
                [quandidateDeItens, carrinhoId]);

            if (!result.changes) {
                throw new Error('Erro ao atualizar quantidade total de itens');
            }

        } catch (err) {
            throw err;
        }
    }


    async atualizaPrecoTotalDoCarrinho(carrinho, conn) {
        try {
            if (!conn) conn = await this.connection.connect();

            const result = await conn.run(`UPDATE carrinhos SET sub_total = ? WHERE id = ?`,
                [carrinho.getSubTotal(), carrinho.getId()]);

            if (!result.changes) {
                throw new Error('Erro ao atualizar preço total do carrinho');
            }

            return carrinho;
        } catch (err) {
            throw err;
        }
    }

    async verificaValorTotalCarrinho(id, conn) {
        try {
            if (!conn) conn = await this.connection.connect();

            const result = await conn.get(`
                SELECT COALESCE(SUM(p.preco * ic.quantidade), 0) AS valor_total
                FROM itens_carrinho ic JOIN produtos p ON ic.produto_id = p.id
                WHERE ic.carrinho_id = ?`, [id]);

            if (!result) {
                throw new BadRequestError(`Carrinho com ID ${id} não encontrado.`);
            }

            return result.valor_total;

        } catch (err) {
            throw err;
        }
    }
}

export default CarrinhoRepository;