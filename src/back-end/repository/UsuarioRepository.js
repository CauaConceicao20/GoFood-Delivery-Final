import Connection from "../database/Connection.js";
import Usuario from "../model/usuario/Usuario.js";
import { BadRequestError } from "../exception/GlobalExceptions.js";

class UsuarioRepository {
  constructor() {
    this.connection = new Connection();
  }

  async registra(usuario) {
    let conn;
    try {
      conn = await this.connection.connect();

      await conn.run("BEGIN TRANSACTION");

      const result = await conn.run(
        `INSERT INTO usuarios (nome, email, senha, dataCadastro, telefone, cpf, cnpj) VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [usuario.getNome(), usuario.getEmail(), usuario.getSenha(), usuario.getDataCadastro(), usuario.getTelefone(), usuario.getCpf(),
        usuario.getCnpj()]
      );

      if (!result.changes) {
        throw new BadRequestError("Erro ao criar usuário");
      }

      await conn.run('COMMIT');

      return new Usuario(result.lastID, usuario.getNome(), usuario.getEmail(), usuario.getSenha(),
        usuario.getDataCadastro(), usuario.getTelefone(), usuario.getCpf(), usuario.getCnpj());

    } catch (err) {
      if (conn) {
        await conn.run("ROLLBACK");
      }

      if (err.code === 'SQLITE_CONSTRAINT' && err.message.includes('usuarios.email')) {
        throw new BadRequestError('Email já cadastrado.');
      }

      if (err.code === 'SQLITE_CONSTRAINT' && err.message.includes('usuarios.cpf')) {
        throw new BadRequestError('CPF já cadastrado.');
      }
      throw err;
    }
  }
}

export default UsuarioRepository;
