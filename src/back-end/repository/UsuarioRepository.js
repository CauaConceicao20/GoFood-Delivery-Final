/*import Connection from "../database/Connection";
import Usuario from "../model/Usuario/Usuario";

class UsuarioRepository {

    constructor() {
        this.connection = new Connection();
    }

    async create(user) {
    try {
      const db = await this.connection.connect();
      const result = await db.run(
        `INSERT INTO users (name, email) VALUES (?, ?)`,
        [user.name, user.email]
      );
      user.id = result.lastID;
      return user;
    } catch (err) {
      console.error('Erro ao criar usuário:', err);
      throw err;
    }
  }

  async findAll() {
    try {
      const db = await this.connection.connect();
      const rows = await db.all(`SELECT * FROM users`);
      return rows.map(row => new User(row.id, row.name, row.email));
    } catch (err) {
      console.error('Erro ao buscar usuários:', err);
      return [];
    }
  }

  async findById(id) {
    try {
      const db = await this.connection.connect();
      const row = await db.get(`SELECT * FROM users WHERE id = ?`, [id]);
      return row ? new User(row.id, row.name, row.email) : null;
    } catch (err) {
      console.error('Erro ao buscar usuário por ID:', err);
      return null;
    }
  }

  async update(user) {
    try {
      const db = await this.connection.connect();
      await db.run(
        `UPDATE users SET name = ?, email = ? WHERE id = ?`,
        [user.name, user.email, user.id]
      );
      return user;
    } catch (err) {
      console.error('Erro ao atualizar usuário:', err);
      throw err;
    }
  }

  async delete(id) {
    try {
      const db = await this.connection.connect();
      await db.run(`DELETE FROM users WHERE id = ?`, [id]);
    } catch (err) {
      console.error('Erro ao deletar usuário:', err);
      throw err;
    }
  }
}
*/