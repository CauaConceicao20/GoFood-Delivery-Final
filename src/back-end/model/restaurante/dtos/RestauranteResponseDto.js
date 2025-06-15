import EnderecoResponseDto from "../../endereco/dtos/EnderecoResponseDto.js";
import FormaPagamentoResponseDto from "../../pagamento/dtos/FormaPagamentoResponseDto.js";

class RestauranteResponseDto {
    constructor(restaurante, endereco, cidade, estado, formasDePagamento, foto) {
        this.id = restaurante.id;
        this.nome = restaurante.nome;
        this.descricao = restaurante.descricao;
        this.razaoSocial = restaurante.razaoSocial;
        this.taxaFrete = restaurante.taxaFrete;
        this.dataCadastro = restaurante.dataCadastro;
        this.dataAtualizacao = restaurante.dataAtualizacao;
        this.aberto = restaurante.aberto;
        this.fotoUrl = foto ? foto.getUrl() : null;
        this.endereco = new EnderecoResponseDto(endereco, cidade, estado);
        this.idUsuario = restaurante.idUsuario;
        this.formasPagamento = formasDePagamento.map(fp => new FormaPagamentoResponseDto(fp));
        this.cnpj = restaurante.cnpj;
        this.ativo = restaurante.ativo;
    }
}

export default RestauranteResponseDto;