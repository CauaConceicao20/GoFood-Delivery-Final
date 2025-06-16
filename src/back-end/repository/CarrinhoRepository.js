import Connection from "../database/Connection.js";
import { BadRequestError } from "../exception/GlobalExceptions.js";
import Carrinho from "../model/carrinho/Carrinho.js";
import { NotFoundError } from "../exception/GlobalExceptions.js";

class CarrinhoRepository {

    constructor() {
        this.connection = new Connection();
    }

    async adicionaProdutoAoCarrinho(itemCarrinho) {
        const conn = await this.connection.connect();
        try {
            await conn.run('BEGIN TRANSACTION');

            await this.aumentaValoresCarrinhoEItemCarrinho(itemCarrinho, itemCarrinho.getCarrinhoId(), conn)

            await conn.run('COMMIT');
        } catch (err) {
            await conn.run('ROLLBACK');
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
                throw new NotFoundError(`Carrinho não encontrado.`);
            }

            return new Carrinho(result.id, result.quantidade_total_itens, result.sub_total, result.usuario_id);

        } catch (err) {
            throw err;
        }
    }

    async aumentaValoresCarrinhoEItemCarrinho(itemCarrinho, carrinhoId, conn) {
        try {
            if (!conn) conn = await this.connection.connect();

            await this.upsertItemCarrinho(itemCarrinho, conn);
            await this.atualizaTotaisDoCarrinho(carrinhoId, conn);

        } catch (err) {
            throw err;
        }
    }

    async atualizaTotaisDoCarrinho(carrinhoId, conn) {
        if (!conn) conn = await this.connection.connect();

        await conn.run(`
        UPDATE carrinhos
        SET sub_total = (
            SELECT COALESCE(SUM(p.preco * ic.quantidade), 0)
            FROM itens_carrinho ic
            JOIN produtos p ON ic.produto_id = p.id
            WHERE ic.carrinho_id = ?
        )
        WHERE id = ?
    `, [carrinhoId, carrinhoId]);

        await conn.run(`
        UPDATE carrinhos
        SET quantidade_total_itens = (
            SELECT COALESCE(SUM(quantidade), 0)
            FROM itens_carrinho
            WHERE carrinho_id = ?
        )
        WHERE id = ?
    `, [carrinhoId, carrinhoId]);
    }

    async upsertItemCarrinho(itemCarrinho, conn) {
        try {
            if (!conn) conn = await this.connection.connect();
            await conn.run(
                `INSERT INTO itens_carrinho (carrinho_id, produto_id, quantidade, preco)
             VALUES (?, ?, ?, ?)
             ON CONFLICT(carrinho_id, produto_id) DO UPDATE SET
                quantidade = quantidade + excluded.quantidade,
                preco = preco + excluded.preco`,
                [
                    itemCarrinho.getCarrinhoId(),
                    itemCarrinho.getProdutoId(),
                    itemCarrinho.getQuantidade(),
                    itemCarrinho.getPreco()
                ]
            );
        } catch (err) {
            throw err;
        }
    }

    async buscarCarrinhoComItens(carrinho) {
        try {
            const conn = await this.connection.connect();

            const itens = await conn.all(
                'SELECT * FROM itens_carrinho WHERE carrinho_id = ?',
                [carrinho.getId()]
            );

            return {
                id: carrinho.getId(),
                quantidade_total_itens: carrinho.getQuantidadeTotalDeItems(),
                sub_total: carrinho.getSubTotal(),
                itens: itens
            };
        } catch (err) {
            throw err;
        }
    }

    async atualizarItemCarrinhoECarrinho(itemCarrinho, carrinho, conn) {
        try {
            if (!conn) conn = await this.connection.connect();

            await conn.run(
                `UPDATE itens_carrinho
       SET quantidade = ?, preco = ?
       WHERE carrinho_id = ? AND produto_id = ?`,
                [
                    itemCarrinho.getQuantidade(),
                    itemCarrinho.getPreco(),
                    itemCarrinho.getCarrinhoId(),
                    itemCarrinho.getProdutoId()
                ]
            );

            await conn.run(
                `UPDATE carrinhos
       SET quantidade_total_itens = ?, sub_total = ?
       WHERE id = ?`,
                [
                    carrinho.getQuantidadeTotalDeItems(),
                    carrinho.getSubTotal(),
                    carrinho.getId()
                ]
            );
        } catch (err) {
            throw err;
        }
    }

    async deletarItemCarrinho(itemCarrinho, carrinho) {
        try {
            const conn = await this.connection.connect();

            await conn.run(
                `DELETE FROM itens_carrinho
       WHERE carrinho_id = ? AND produto_id = ?`,
                [
                    itemCarrinho.getCarrinhoId(),
                    itemCarrinho.getProdutoId()
                ]
            );

            await conn.run(
                `UPDATE carrinhos
       SET quantidade_total_itens = ?, sub_total = ?
       WHERE id = ?`,
                [
                    carrinho.getQuantidadeTotalDeItems(),
                    carrinho.getSubTotal(),
                    carrinho.getId()
                ]
            );
        } catch (err) {
            throw err;
        }
    }
}
export default CarrinhoRepository;