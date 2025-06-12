class CategoriaResponseDto {
  constructor(categoria) {
    this.id = categoria.getId();
    this.nome = categoria.getNome();
  }
}
export default CategoriaResponseDto;