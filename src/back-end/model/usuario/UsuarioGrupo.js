class UsuarioGrupo {
    constructor(idUsuario, idGrupo) {
        this.idUsuario = idUsuario;
        this.idGrupo = idGrupo;
    }

    setIdUsuario(idUsuario) {
        this.idUsuario = idUsuario;
    }

    getIdUsuario() {
        return this.idUsuario;
    }

    setIdGrupo(idGrupo) {
        this.idGrupo = idGrupo;
    }

    getIdGrupo() {
        return this.idGrupo;
    }
}


export default UsuarioGrupo