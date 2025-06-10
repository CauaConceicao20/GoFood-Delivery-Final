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
            const grupos = await this.grupoService.buscarTodos();
            let gruposParaAssociar = [];

            for (const grupo of grupos) {
                if (grupo.getNome() === GrupoNomeEnum.CLIENTE) {
                    gruposParaAssociar.push(grupo);
                }
            }
            
            const carrinho = new Carrinho(null, 0, 0);

        return await this.usuarioRepository.registra(usuario, gruposParaAssociar, carrinho);

    } catch(err) {
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

    async atualizaUsuario(usuario) {
    try {
        const usuarioAtualizado = await this.usuarioRepository.atualizaUsuario(usuario);
        return usuarioAtualizado;
    } catch (err) {
        throw err;
    }
}
}

export default UsuarioService;