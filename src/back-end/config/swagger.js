export default {
    "openapi": "3.0.0",
    "info": {
      "title": "API GoFood Delivery",
      "version": "1.0.0",
      "description": "Documentação da API para o sistema GoFood Delivery"
    },
    "paths": {
      "/register": {
        "post": {
          "summary": "Registrar um restaurante",
          "description": "Endpoint para registrar um novo restaurante",
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "nome": { "type": "string", "example": "Restaurante Saboroso" },
                    "razaoSocial": { "type": "string", "example": "Restaurante Saboroso LTDA" },
                    "taxaFrete": { "type": "number", "example": 8.50 },
                    "descricao": { "type": "string", "example": "Comida caseira e ambiente familiar." },
                    "cep": { "type": "string", "example": "01001000" },
                    "logradouro": { "type": "string", "example": "Rua das Flores" },
                    "numero": { "type": "string", "example": "123" },
                    "complemento": { "type": "string", "example": "Sala 2" },
                    "bairro": { "type": "string", "example": "Centro" },
                    "cidadeId": { "type": "integer", "example": 1 },
                    "usuarioId": { "type": "integer", "example": 1 },
                    "formasPagamento": {
                      "type": "array",
                      "items": { "type": "integer" },
                      "example": [1, 2, 4]
                    }
                  },
                  "required": [
                    "nome",
                    "razaoSocial",
                    "taxaFrete",
                    "descricao",
                    "cep",
                    "logradouro",
                    "numero",
                    "bairro",
                    "cidadeId",
                    "usuarioId",
                    "formasPagamento"
                  ]
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": "Restaurante cadastrado com sucesso"
            },
            "400": {
              "description": "Erro na requisição"
            }
          }
        }
      },
      "/login": {
        "post": {
          "summary": "Login de usuário",
          "description": "Endpoint para autenticar um usuário e gerar um token de acesso",
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "email": { "type": "string", "example": "usuario@example.com" },
                    "senha": { "type": "string", "example": "senha123" }
                  },
                  "required": ["email", "senha"]
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
                      "message": { "type": "string", "example": "Login successful" },
                      "token": { "type": "string", "example": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." }
                    }
                  }
                }
              }
            },
            "400": {
              "description": "Erro na requisição",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "message": { "type": "string", "example": "Usuário ou senha inválidos" }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  };