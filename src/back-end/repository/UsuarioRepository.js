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
      usuario.setId(result.lastID);
      return usuario;

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

      if (err.code === 'SQLITE_CONSTRAINT' && err.message.includes('usuarios.cnpj')) {
        throw new BadRequestError('CNPJ já cadastrado.');
      }

      throw err;
    }
  }

  async buscarPorId(id) {
    let conn;
    try {
      conn = await this.connection.connect();
      const usuario = await conn.get(`SELECT * FROM usuarios WHERE id = ?`, [id]);

      if (!usuario) {
        throw new BadRequestError(`Usuário com ID ${id} não encontrado.`);
      }

      return new Usuario(usuario.id, usuario.nome, usuario.email, usuario.senha, usuario.dataCadastro,
        usuario.telefone, usuario.cpf, usuario.cnpj);

    } catch (err) {
      throw err;
    }
  }

  async buscarPorEmail(email) {
    let conn;
    try {
      conn = await this.connection.connect();
      const usuario = await conn.get(`SELECT * FROM usuarios WHERE email = ?`, [email]);

      if (!usuario) {
        throw new BadRequestError(`Usuário com email ${email} não encontrado.`);
      }

      return new Usuario(usuario.id, usuario.nome, usuario.email, usuario.senha, usuario.dataCadastro,
        usuario.telefone, usuario.cpf, usuario.cnpj);

    } catch (err) {
      throw err;
    }
  }
}

export default UsuarioRepository;
