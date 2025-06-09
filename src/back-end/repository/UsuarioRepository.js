import Connection from "../database/Connection.js";
import Usuario from "../model/usuario/Usuario.js";
import { BadRequestError } from "../exception/GlobalExceptions.js";
import UsuarioGrupoRepository from "./UsuarioGrupoRepository.js";
import CarrinhoRepository from "./CarrinhoRepository.js";
import UsuarioGrupo from "../model/usuario/UsuarioGrupo.js";

class UsuarioRepository {
  constructor() {
    this.connection = new Connection();
    this.usuarioGrupoRepository = new UsuarioGrupoRepository();
    this.carrinhoRepository = new CarrinhoRepository();
  }

  async registra(usuario, grupos, carrinho) {
    let conn;
    try {
      conn = await this.connection.connect();
      await conn.run("BEGIN TRANSACTION");

      const usuarioRegistrado = await this.create(usuario, conn);

      for (const grupo of grupos) {
        await this.usuarioGrupoRepository.associaUsuarioAoGrupo(new UsuarioGrupo(usuarioRegistrado.getId(),
         grupo.getId()), conn);
      }

      await this.carrinhoRepository.create(carrinho, usuarioRegistrado.getId(), conn);

      await conn.run("COMMIT");

      return usuarioRegistrado;
    } catch (err) {
      if (conn) {
        await conn.run("ROLLBACK");
      }
      throw err;
    }
  }

  async create(usuario, conn) {
    try {
      if (!conn) conn = await this.connection.connect();

      const result = await conn.run(
        `INSERT INTO usuarios (nome, email, senha, dataCadastro, telefone, cpf) VALUES (?, ?, ?, ?, ?, ?)`,
        [usuario.getNome(), usuario.getEmail(), usuario.getSenha(), usuario.getDataCadastro(), usuario.getTelefone(),
           usuario.getCpf(),]
      );

      if (!result.changes) {
        throw new BadRequestError("Erro ao criar usuário");
      }

      usuario.setId(result.lastID);
      return usuario;

    } catch (err) {

      if (err.code === 'SQLITE_CONSTRAINT' && err.message.includes('usuarios.email')) {
        throw new BadRequestError('Email já cadastrado.');
      }

      if (err.code === 'SQLITE_CONSTRAINT' && err.message.includes('usuarios.cpf')) {
        throw new BadRequestError('CPF já cadastrado.');
      }
      throw err;
    }
  }

  async buscarPorId(id, conn) {
    try {
      if (!conn) conn = await this.connection.connect();
      const usuario = await conn.get(`SELECT * FROM usuarios WHERE id = ?`, [id]);

      if (!usuario) {
        throw new BadRequestError(`Usuário com ID ${id} não encontrado.`);
      }

      return new Usuario(usuario.id, usuario.nome, usuario.email, usuario.senha, usuario.dataCadastro,
        usuario.telefone, usuario.cpf);

    } catch (err) {
      throw err;
    }
  }

  async buscarPorEmail(email, conn) {
    try {
      if (!conn) conn = await this.connection.connect();
      const usuario = await conn.get(`SELECT * FROM usuarios WHERE email = ?`, [email]);

      if (!usuario) {
        throw new BadRequestError(`Usuário com email ${email} não encontrado.`);
      }

      return new Usuario(usuario.id, usuario.nome, usuario.email, usuario.senha, usuario.dataCadastro,
        usuario.telefone, usuario.cpf);

    } catch (err) {
      throw err;
    }
  }

  async atualizaUsuario(usuario, conn) {
    try {
      if (!conn) conn = await this.connection.connect();

      const campos = [];
      const valores = [];

      if (usuario.getNome() !== null) {
        campos.push('nome = ?');
        valores.push(usuario.getNome());
      }
      if (usuario.getEmail() !== null) {
        campos.push('email = ?');
        valores.push(usuario.getEmail());
      }
      if (usuario.getTelefone() !== null) {
        campos.push('telefone = ?');
        valores.push(usuario.getTelefone());
      }
      if (usuario.getSenha() !== null) {
        campos.push('senha = ?');
        valores.push(usuario.getSenha());
      }
      if (usuario.getCpf() !== null) {
        campos.push('cpf = ?');
        valores.push(usuario.getCpf());
      }

      if (campos.length === 0) {
        throw new BadRequestError("Nenhum campo para atualizar.");
      }

      valores.push(usuario.getId());
      const query = `UPDATE usuarios SET ${campos.join(', ')} WHERE id = ?`;

      await conn.run(query, valores);

      const usuarioAtualizado = await this.buscarPorId(usuario.getId(), conn);
      return usuarioAtualizado;
    } catch (err) {
      throw err;
    }
  }

}

export default UsuarioRepository;
