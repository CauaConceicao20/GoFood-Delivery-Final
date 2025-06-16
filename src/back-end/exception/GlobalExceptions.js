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

class MinimumQuantityException extends ErrorDetails {
  constructor(message = 'Quantidade minima atingida') {
    super(400, message);
  }
}
class PaymentMethodNotAcceptedError extends BadRequestError {
  constructor(message = 'O restaurante não aceita esse método de pagamento') {
    super(message);
  }
}

class DifferentRestaurantProductsError extends BadRequestError {
  constructor(message = 'Todos os produtos devem pertencer ao mesmo restaurante') {
    super(message);
  }
}

export { NotFoundError, BadRequestError,  UnauthorizedError, ForbiddenError,
  MinimumQuantityException, ForbiddenOwnRestaurantProductError, PaymentMethodNotAcceptedError ,DifferentRestaurantProductsError};