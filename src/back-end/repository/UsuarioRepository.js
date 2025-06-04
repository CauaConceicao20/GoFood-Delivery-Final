import Connection from "../database/Connection.js";
import Usuario from "../model/usuario/Usuario.js";

class UsuarioRepository {
  constructor() {
    this.connection = new Connection();
  }

  async registra(usuario) {
    try {
      const conn = await this.connection.connect();

      await conn.run("BEGIN TRANSACTION");

      const result = await conn.run(
        `INSERT INTO usuarios (nome, email, senha, dataCadastro, telefone, cpf, cnpj) VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [usuario.getNome(), usuario.getEmail(), usuario.getSenha(), usuario.getDataCadastro(), usuario.getTelefone(), usuario.getCpf(),
           usuario.getCnpj()]
      );

      if (result.changes === 0) {
        throw new Error('Erro ao criar usuário');
      }

      await conn.run('COMMIT');

       return new Usuario(result.lastID, usuario.getNome(), usuario.getEmail(), usuario.getSenha(),
       usuario.getDataCadastro(), usuario.getTelefone(), usuario.getCpf(), usuario.getCnpj());

    } catch (err) {
      console.error(err);
      await conn.run("ROLLBACK"); 
      throw new Error(`Erro ao registrar usuário: ${err.message}`);
    }
  }
}

export default UsuarioRepository;
