import { BadRequestError } from "../../../exception/GlobalExceptions.js"

class FotoRegisterRequestDto {
    constructor(file) {
        this.nome = file.originalname
        this.content_type = file.mimetype;
        this.tamanho = file.size;
        this.url = `/uploads/${file.filename}`;

        this.validarCampos();
    }

    validarCampos() {
        if (!this.nome) throw new BadRequestError('Nome do arquivo é obrigatório');
        if (!this.content_type) throw new BadRequestError('Tipo do arquivo é obrigatório');
        if (!this.tamanho) throw new BadRequestError('Tamanho do arquivo é obrigatório');
        if (!this.url) throw new BadRequestError('URL do arquivo é obrigatória');
    }
}

export default FotoRegisterRequestDto

