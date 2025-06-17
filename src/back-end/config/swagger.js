export default {
  "openapi": "3.0.0",
  "info": {
    "title": "GoFood Delivery API",
    "version": "1.0.0",
    "description": "API documentation for GoFood Delivery application"
  },
  "servers": [
    {
      "url": "http://localhost:3001",
      "description": "Development server"
    }
  ],
  "components": {
    "securitySchemes": {
      "bearerAuth": {
        "type": "http",
        "scheme": "bearer",
        "bearerFormat": "JWT"
      }
    },
    "schemas": {
      "LoginRequest": {
        "type": "object",
        "required": ["email", "senha"],
        "properties": {
          "email": {
            "type": "string",
            "format": "email",
            "example": "usuario@example.com"
          },
          "senha": {
            "type": "string",
            "example": "senha123"
          }
        }
      },
      "UsuarioRegisterRequest": {
        "type": "object",
        "required": ["nome", "email", "senha", "telefone", "cpf"],
        "properties": {
          "nome": {
            "type": "string",
            "example": "João Silva"
          },
          "email": {
            "type": "string",
            "format": "email",
            "example": "joao@example.com"
          },
          "senha": {
            "type": "string",
            "example": "senha123"
          },
          "telefone": {
            "type": "string",
            "example": "11999998888"
          },
          "cpf": {
            "type": "string",
            "example": "12345678901"
          }
        }
      },
      "RestauranteRegisterRequest": {
        "type": "object",
        "required": ["nome", "razaoSocial", "taxaFrete", "descricao", "cep", "logradouro", "numero", "bairro", "cidadeId", "formasPagamento", "cnpj"],
        "properties": {
          "nome": {
            "type": "string",
            "example": "Restaurante Delícia"
          },
          "razaoSocial": {
            "type": "string",
            "example": "Restaurante Delícia LTDA"
          },
          "taxaFrete": {
            "type": "number",
            "example": 5.50
          },
          "descricao": {
            "type": "string",
            "example": "O melhor restaurante da cidade"
          },
          "cep": {
            "type": "string",
            "example": "01001000"
          },
          "logradouro": {
            "type": "string",
            "example": "Rua das Flores"
          },
          "numero": {
            "type": "string",
            "example": "123"
          },
          "complemento": {
            "type": "string",
            "example": "Sala 2"
          },
          "bairro": {
            "type": "string",
            "example": "Centro"
          },
          "cidadeId": {
            "type": "integer",
            "example": 1
          },
          "formasPagamento": {
            "type": "array",
            "items": {
              "type": "integer"
            },
            "example": [1, 2, 3]
          },
          "cnpj": {
            "type": "string",
            "example": "12345678000190"
          }
        }
      },
      "ProdutoRegisterRequest": {
        "type": "object",
        "required": ["nome", "descricao", "preco", "categoriaId"],
        "properties": {
          "nome": {
            "type": "string",
            "example": "Pizza Margherita"
          },
          "descricao": {
            "type": "string",
            "example": "Pizza tradicional italiana com molho de tomate, mussarela e manjericão"
          },
          "preco": {
            "type": "number",
            "example": 45.90
          },
          "categoriaId": {
            "type": "integer",
            "example": 1
          }
        }
      },
      "CarrinhoAddItemRequest": {
        "type": "object",
        "required": ["produtoId", "quantidade"],
        "properties": {
          "produtoId": {
            "type": "integer",
            "example": 1
          },
          "quantidade": {
            "type": "integer",
            "example": 2,
            "minimum": 1,
            "maximum": 3
          }
        }
      },
      "PedidoRegisterRequest": {
        "type": "object",
        "required": ["produtos", "idMetodoPagamento"],
        "properties": {
          "produtos": {
            "type": "array",
            "items": {
              "type": "object",
              "properties": {
                "idProduto": {
                  "type": "integer",
                  "example": 1
                },
                "quantidade": {
                  "type": "integer",
                  "example": 2
                },
                "observacao": {
                  "type": "string",
                  "example": "Sem cebola, por favor"
                }
              }
            }
          },
          "idMetodoPagamento": {
            "type": "integer",
            "example": 1
          },
          "nomeMetodoPagamento": {
            "type": "string",
            "example": "Cartão de Crédito"
          }
        }
      }
    }
  },
  "paths": {
    "/api/v1/auth/login": {
      "post": {
        "summary": "Autenticar usuário",
        "description": "Autentica um usuário e retorna um token JWT",
        "tags": ["Autenticação"],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/LoginRequest"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Login bem-sucedido",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "message": {
                      "type": "string",
                      "example": "Login successful"
                    },
                    "token": {
                      "type": "string",
                      "example": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
                    }
                  }
                }
              }
            }
          },
          "401": {
            "description": "Credenciais inválidas"
          }
        }
      }
    },
    "/api/v1/auth/me": {
      "get": {
        "summary": "Obter dados do usuário logado",
        "description": "Retorna os dados do usuário autenticado",
        "tags": ["Autenticação"],
        "security": [
          {
            "bearerAuth": []
          }
        ],
        "responses": {
          "200": {
            "description": "Dados do usuário"
          },
          "401": {
            "description": "Não autorizado"
          }
        }
      }
    },
    "/api/v1/usuarios/register": {
      "post": {
        "summary": "Registrar usuário",
        "description": "Registra um novo usuário no sistema",
        "tags": ["Usuários"],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/UsuarioRegisterRequest"
              }
            }
          }
        },
        "responses": {
          "201": {
            "description": "Usuário cadastrado com sucesso"
          },
          "400": {
            "description": "Dados inválidos"
          }
        }
      }
    },
    "/api/v1/restaurantes/registra": {
      "post": {
        "summary": "Registrar restaurante",
        "description": "Registra um novo restaurante no sistema",
        "tags": ["Restaurantes"],
        "security": [
          {
            "bearerAuth": []
          }
        ],
        "requestBody": {
          "required": true,
          "content": {
            "multipart/form-data": {
              "schema": {
                "type": "object",
                "properties": {
                  "restaurante": {
                    "type": "string",
                    "description": "JSON stringificado com os dados do restaurante"
                  },
                  "arquivo": {
                    "type": "string",
                    "format": "binary",
                    "description": "Imagem do restaurante"
                  }
                }
              }
            }
          }
        },
        "responses": {
          "201": {
            "description": "Restaurante cadastrado com sucesso"
          },
          "400": {
            "description": "Dados inválidos"
          },
          "401": {
            "description": "Não autorizado"
          }
        }
      }
    },
    "/api/v1/restaurantes/buscaRestaurantesAssociados": {
      "get": {
        "summary": "Buscar restaurantes associados ao usuário",
        "description": "Retorna todos os restaurantes associados ao usuário autenticado",
        "tags": ["Restaurantes"],
        "security": [
          {
            "bearerAuth": []
          }
        ],
        "responses": {
          "200": {
            "description": "Lista de restaurantes"
          },
          "401": {
            "description": "Não autorizado"
          },
          "404": {
            "description": "Nenhum restaurante encontrado"
          }
        }
      }
    },
    "/api/v1/produtos/register/{id}": {
      "post": {
        "summary": "Registrar produto",
        "description": "Registra um novo produto para um restaurante",
        "tags": ["Produtos"],
        "security": [
          {
            "bearerAuth": []
          }
        ],
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer"
            },
            "description": "ID do restaurante"
          }
        ],
        "requestBody": {
          "required": true,
          "content": {
            "multipart/form-data": {
              "schema": {
                "type": "object",
                "properties": {
                  "produto": {
                    "type": "string",
                    "description": "JSON stringificado com os dados do produto"
                  },
                  "arquivo": {
                    "type": "string",
                    "format": "binary",
                    "description": "Imagem do produto"
                  }
                }
              }
            }
          }
        },
        "responses": {
          "201": {
            "description": "Produto cadastrado com sucesso"
          },
          "400": {
            "description": "Dados inválidos"
          },
          "401": {
            "description": "Não autorizado"
          }
        }
      }
    },
    "/api/v1/produtos/buscarTodos": {
      "get": {
        "summary": "Buscar todos os produtos",
        "description": "Retorna todos os produtos cadastrados",
        "tags": ["Produtos"],
        "responses": {
          "200": {
            "description": "Lista de produtos"
          }
        }
      }
    },
    "/api/v1/produtos/buscarProdutosDeRestaurante/{id}": {
      "get": {
        "summary": "Buscar produtos de um restaurante",
        "description": "Retorna todos os produtos de um restaurante específico",
        "tags": ["Produtos"],
        "security": [
          {
            "bearerAuth": []
          }
        ],
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer"
            },
            "description": "ID do restaurante"
          }
        ],
        "responses": {
          "200": {
            "description": "Lista de produtos do restaurante"
          },
          "401": {
            "description": "Não autorizado"
          },
          "404": {
            "description": "Restaurante não encontrado"
          }
        }
      }
    },
    "/api/v1/carrinhos/adicionaAoCarrinho": {
      "post": {
        "summary": "Adicionar produto ao carrinho",
        "description": "Adiciona um produto ao carrinho do usuário",
        "tags": ["Carrinho"],
        "security": [
          {
            "bearerAuth": []
          }
        ],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/CarrinhoAddItemRequest"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Produto adicionado ao carrinho com sucesso"
          },
          "400": {
            "description": "Dados inválidos"
          },
          "401": {
            "description": "Não autorizado"
          }
        }
      }
    },
    "/api/v1/carrinhos/buscarCarrinho": {
      "get": {
        "summary": "Buscar carrinho do usuário",
        "description": "Retorna o carrinho do usuário autenticado com seus itens",
        "tags": ["Carrinho"],
        "security": [
          {
            "bearerAuth": []
          }
        ],
        "responses": {
          "200": {
            "description": "Carrinho do usuário"
          },
          "401": {
            "description": "Não autorizado"
          }
        }
      }
    },
    "/api/v1/pedidos/registra": {
      "post": {
        "summary": "Registrar pedido",
        "description": "Registra um novo pedido",
        "tags": ["Pedidos"],
        "security": [
          {
            "bearerAuth": []
          }
        ],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/PedidoRegisterRequest"
              }
            }
          }
        },
        "responses": {
          "201": {
            "description": "Pedido registrado com sucesso"
          },
          "400": {
            "description": "Dados inválidos"
          },
          "401": {
            "description": "Não autorizado"
          }
        }
      }
    },
    "/api/v1/pedidos/pedidosDeRestaurante/{id}": {
      "get": {
        "summary": "Buscar pedidos de um restaurante",
        "description": "Retorna todos os pedidos de um restaurante específico",
        "tags": ["Pedidos"],
        "security": [
          {
            "bearerAuth": []
          }
        ],
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer"
            },
            "description": "ID do restaurante"
          }
        ],
        "responses": {
          "200": {
            "description": "Lista de pedidos do restaurante"
          },
          "401": {
            "description": "Não autorizado"
          },
          "404": {
            "description": "Restaurante não encontrado ou sem pedidos"
          }
        }
      }
    },
    "/api/v1/pedidos/atualizaStatusPedido/{id}/status": {
      "put": {
        "summary": "Atualizar status do pedido",
        "description": "Atualiza o status de um pedido",
        "tags": ["Pedidos"],
        "security": [
          {
            "bearerAuth": []
          }
        ],
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer"
            },
            "description": "ID do pedido"
          }
        ],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "status": {
                    "type": "string",
                    "enum": ["CRIADO", "CONFIRMADO", "ENTREGUE", "CANCELADO"],
                    "example": "CONFIRMADO"
                  }
                }
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Status atualizado com sucesso"
          },
          "400": {
            "description": "Status inválido"
          },
          "401": {
            "description": "Não autorizado"
          },
          "404": {
            "description": "Pedido não encontrado"
          }
        }
      }
    }
  }
}