import ErrorDetails from "./ErrorDetails.js";

class NotFoundError extends ErrorDetails {
  constructor(message = 'Recurso não encontrado') {
    super(404, message);
  }
}

class BadRequestError extends ErrorDetails {
  constructor(message = 'Requisição inválida') {
    super(400, message);
  }
}

class UnauthorizedError extends ErrorDetails {
  constructor(message = 'Acesso não autorizado') {
    super(401, message);
  }
}

class ForbiddenError extends ErrorDetails {
  constructor(message = 'Acesso proibido') {
    super(403, message);
  }
}

class ForbiddenOwnRestaurantProductError extends ErrorDetails {
  constructor(message = 'Não é permitido adicionar produtos do seu próprio restaurante ao carrinho') {
    super(403, message);
  }
}

class ArquivoDeFotoEObrigatorioError extends ErrorDetails {
  constructor(message = 'É obrigatório enviar uma foto') {
    super(400, message);
  }
}

export { NotFoundError, BadRequestError,  UnauthorizedError, ForbiddenError, ForbiddenOwnRestaurantProductError };