class GrupoResponseDto {
    constructor(grupo) {
        this.id = grupo.getId();
        this.nome = grupo.getNome();
    }
}

export default GrupoResponseDto