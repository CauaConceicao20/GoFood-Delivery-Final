import UsuarioRepository from "../repository/UsuarioRepository.js";
import GrupoService from "./GrupoService.js";
import UsuarioGrupoService from "./UsuarioGrupoService.js";
import CarrinhoService from "./CarrinhoService.js";
import Carrinho from "../model/carrinho/Carrinho.js";

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
                    if (grupo.getNome() === "RESTAURANTE" || grupo.getNome() === "CLIENTE") {
                        await this.associaUsuarioEGrupo(usuarioRegistrado.getId(), grupo);
                    }
                } else {
                    if (grupo.getNome() === "CLIENTE") {
                       await this.associaUsuarioEGrupo(usuarioRegistrado.getId(), grupo);
                    }
                }
            }

            await this.carrinhoService.registra(new Carrinho(0,0), usuarioRegistrado.getId());

            return usuarioRegistrado;

        } catch (err) {
            console.error(err);
            throw new Error(`${err.message}`);
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