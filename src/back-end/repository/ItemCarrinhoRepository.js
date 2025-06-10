import Connection from "../database/Connection.js";
import { BadRequestError } from "../exception/GlobalExceptions.js";
import ItemCarrinho from "../model/carrinho/ItemCarrinho.js";

class ItemCarrinhoRepository {
    constructor() {
        this.connection = new Connection();
    }


    async associaProdutoAoCarrinho(itemCarrinho, conn) {
        try {
            if (!conn) await this.connection.connect();

            const result = await conn.run(`INSERT INTO itens_carrinho (carrinho_id, produto_id) VALUES (?, ?)`,
                [itemCarrinho.getCarrinhoId(), itemCarrinho.getProdutoId()]);

            if (!result.changes) {
                throw new BadRequestError('Erro ao associar item ao carrinho');
            }

            return result;
        } catch (err) {
            throw err;
        }
    }

    async atualizaQuantidadeItemCarrinho(itemCarrinho, conn) {
        try {
            const result = await conn.run(
                `UPDATE itens_carrinho SET quantidade = ? WHERE carrinho_id = ? AND produto_id = ?`,
                [itemCarrinho.getQuantidade(), itemCarrinho.getCarrinhoId(), itemCarrinho.getProdutoId()]
            );
            if (!result.changes) {
                throw new BadRequestError('Erro ao atualizar item do carrinho');
            }

            return result;
        } catch (err) {
            throw err;
        }
    }

    async buscaTodos() {
        let conn = null;

        try {
            conn = await this.connection.connect();
            const itensCarrinho = await conn.all(`SELECT * FROM itens_carrinho`);

            if (itensCarrinho.length == 0) {
                throw new BadRequestError('Nenhum item do carrinho encontrado.');
            }

            return itensCarrinho.map(itemCarrinho => new ItemCarrinho(itemCarrinho.produto_id, itemCarrinho.carrinho_id,
                itemCarrinho.quantidade));

        } catch (err) {
            throw err;
        }
    }

    async buscaTodosItensAssociadosAoCarrinho(id, conn) {
        try {
            if (!conn) conn = await this.connection.connect();
            const itensCarrinho = await conn.all(`SELECT * FROM itens_carrinho WHERE carrinho_id = ?`, [id]);

            return itensCarrinho.map(itemCarrinho => new ItemCarrinho(itemCarrinho.produto_id, itemCarrinho.carrinho_id,
                itemCarrinho.quantidade));

        } catch (err) {
            throw err;
        }
    }

    /*
    async buscaTodosItensAssociadosAoCarrinho(id, conn) {
        try {
            if(!conn) await this.connection.connect(); 

            const itensCarrinho = await conn.all(`SELECT * FROM itens_carrinho WHERE carrinho_id = ?`, [id]);

            if(itensCarrinho.length == 0) {
                throw new BadRequestError('Nenhum item do carrinho encontrado.');
            }

            return itensCarrinho.map(itemCarrinho => new ItemCarrinho( itemCarrinho.produto_id, itemCarrinho.carrinho_id,
                itemCarrinho.quantidade));

        }catch(err) {
            throw err;
        }
    }
        */

}

export default ItemCarrinhoRepository;