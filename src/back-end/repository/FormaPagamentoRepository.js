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

  async buscarTodos() {
    const conn = await this.connection.connect();
    try {
      const formasPagamento = await conn.all('SELECT * FROM formas_pagamento');

      if (!formasPagamento || formasPagamento.length === 0) {
        throw new Error('Nenhuma forma de pagamento encontrada.');
      }

      return formasPagamento.map(formaPagamento => new FormaPagamento(formaPagamento.id, formaPagamento.nome));
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
}

export default FormaPagamentoRepository;