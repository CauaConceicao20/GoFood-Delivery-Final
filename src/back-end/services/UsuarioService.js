import UsuarioRepository from "../repository/UsuarioRepository.js";
import GrupoService from "./GrupoService.js";
import UsuarioGrupoService from "./UsuarioGrupoService.js";
import CarrinhoService from "./CarrinhoService.js";
import Carrinho from "../model/carrinho/Carrinho.js";
import { GrupoNomeEnum } from "../model/usuario/enums/GrupoNomeEnum.js";

class UsuarioService {

    constructor() {
        this.usuarioRepository = new UsuarioRepository();
        this.grupoService = new GrupoService();
        this.usuarioGrupoService = new UsuarioGrupoService();
        this.carrinhoService = new CarrinhoService();
    }

    async registraUsuario(usuario) {
        try {
            const usuarioRegistrado = await this.usuarioRepository.registra(usuario);
            const grupos = await this.grupoService.buscarTodos();

            for (const grupo of grupos) {
                if (usuarioRegistrado.getCnpj() != null) {
                    if (grupo.getNome() === GrupoNomeEnum.ADMIN || grupo.getNome() === GrupoNomeEnum.RESTAURANTE) {
                        await this.associaUsuarioEGrupo(usuarioRegistrado.getId(), grupo);
                    }
                } else {
                    if (grupo.getNome() === GrupoNomeEnum.CLIENTE) {
                        await this.associaUsuarioEGrupo(usuarioRegistrado.getId(), grupo);
                    }
                }
            }
            await this.carrinhoService.registra(new Carrinho(0, 0), usuarioRegistrado.getId());
            return usuarioRegistrado;

        } catch (err) {
            throw err;
        }
    }

    async buscarPorId(id) {
        try {
            const usuario = await this.usuarioRepository.buscarPorId(id);
            if (!usuario) {
                throw new Error(`Usuário com ID ${id} não encontrado.`);
            }
            return usuario;
        } catch (err) {
            throw err;
        }
    }

    async buscarPorEmail(email) {
        try {
            const usuario = await this.usuarioRepository.buscarPorEmail(email);
            if (!usuario) {
                throw new Error(`Usuário com email ${email} não encontrado.`);
            }
            return usuario;
        } catch (err) {
            throw err;
        }
    }


    async associaUsuarioEGrupo(idUsuario, grupo) {
        if (!grupo) {
            throw new Error(`Grupo ${grupo} não encontrado.`);
        }
        await this.usuarioGrupoService.associaUsuarioAoGrupo(idUsuario, grupo.getId());
    }
}

export default UsuarioService;