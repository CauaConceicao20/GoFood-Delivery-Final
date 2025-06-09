import Connection from "../database/Connection.js";
import FormaPagamento from "../model/pagamento/FormaPagamento.js";


class FormaPagamentoRepository {
  constructor() {
    this.connection = new Connection();
  }

  async buscarPorId(id, conn) {
    try {
      if (!conn) await this.connection.connect();

      const formaPagamento = await conn.get(
        `SELECT * FROM formas_pagamento WHERE id = ?`,
        [id]
      );

      if (!formaPagamento) {
        throw new Error(`Forma de pagamento com ID ${id} não encontrada.`);
      }

      return new FormaPagamento(formaPagamento.id, formaPagamento.nome);

    } catch (err) {
      console.error(err);
      throw err;
    }
  }

}

export default FormaPagamentoRepository;