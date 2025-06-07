import Connection from "../database/Connection.js";
import FormaPagamento from "../model/pagamento/FormaPagamento.js";


class FormaPagamentoRepository {
  constructor() {
    this.connection = new Connection();
  }

  async buscarPorId(id) {
    let conn;
    try {
      conn = await this.connection.connect();
      await conn.run("BEGIN TRANSACTION");

      const formaPagamento = await conn.get(
        `SELECT * FROM formas_pagamento WHERE id = ?`,
        [id]
      );

      if (!formaPagamento) {
        throw new Error(`Forma de pagamento com ID ${id} não encontrada.`);
      }

      await conn.run("COMMIT");
      return new FormaPagamento(formaPagamento.id, formaPagamento.nome);

    } catch (err) {
      console.error(err);
      await conn.run("ROLLBACK");
      throw err;
    }
  }

}

export default FormaPagamentoRepository;