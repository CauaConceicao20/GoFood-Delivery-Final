import GrupoResponseDto from './GrupoResponseDto.js';

class UsuarioResponseDto {
    constructor(usuario, grupos) {
        this.id = usuario.getId();
        this.nome = usuario.getNome();
        this.email = usuario.getEmail();
        this.senha = usuario.getSenha();
        this.grupos = grupos.map(grupo => new GrupoResponseDto(grupo));
    }
    
}

export default UsuarioResponseDto