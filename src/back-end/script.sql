DROP TABLE IF EXISTS Item_Carrinho;
DROP TABLE IF EXISTS Item_Pedido;
DROP TABLE IF EXISTS Pedido;
DROP TABLE IF EXISTS Carrinho;
DROP TABLE IF EXISTS Foto_Produto;
DROP TABLE IF EXISTS Produto;
DROP TABLE IF EXISTS Restaurante_Forma_Pagamento;
DROP TABLE IF EXISTS Restaurante;
DROP TABLE IF EXISTS Usuario_Grupo;
DROP TABLE IF EXISTS Permissao;
DROP TABLE IF EXISTS Grupo;
DROP TABLE IF EXISTS Usuario;
DROP TABLE IF EXISTS FormaPagamento;
DROP TABLE IF EXISTS Cozinha;
DROP TABLE IF EXISTS Cidade;
DROP TABLE IF EXISTS Estado;

CREATE TABLE IF NOT EXISTS Estado (
    id INTEGER PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    sigla VARCHAR(2) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS Cidade (
    id INTEGER PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    estado_id INTEGER NOT NULL,
    FOREIGN KEY (estado_id) REFERENCES Estado(id)
);

CREATE TABLE IF NOT EXISTS Cozinha (
    id INTEGER PRIMARY KEY,
    nome VARCHAR(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS FormaPagamento (
    id INTEGER PRIMARY KEY,
    nome VARCHAR(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS Usuario (
    id INTEGER PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL,
    dataCadastro DATETIME NOT NULL,
    cpf VARCHAR(14) NOT NULL UNIQUE,
    cnpj VARCHAR(18) UNIQUE,
    telefone VARCHAR(15) NOT NULL
);

CREATE TABLE IF NOT EXISTS Grupo (
    id INTEGER PRIMARY KEY,
    nome VARCHAR(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS Permissao (
    id INTEGER PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    grupo_id INTEGER NOT NULL,
    FOREIGN KEY (grupo_id) REFERENCES Grupo(id)
);

CREATE TABLE IF NOT EXISTS Usuario_Grupo (
    usuario_id INTEGER NOT NULL,
    grupo_id INTEGER NOT NULL,
    PRIMARY KEY (usuario_id, grupo_id),
    FOREIGN KEY (usuario_id) REFERENCES Usuario(id),
    FOREIGN KEY (grupo_id) REFERENCES Grupo(id)
);

CREATE TABLE IF NOT EXISTS Restaurante (
    id INTEGER PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    razao_social VARCHAR(100),
    taxa_frete DECIMAL(10,2),
    data_cadastro DATETIME,
    data_atualizacao DATETIME,
    aberto BOOLEAN,
    ativo BOOLEAN,
    cozinha_id INTEGER NOT NULL,
    cidade_id INTEGER NOT NULL,
    usuario_id INTEGER NOT NULL,
    cep VARCHAR(10),
    logradouro VARCHAR(255),
    numero VARCHAR(20),
    complemento VARCHAR(255),
    bairro VARCHAR(100),
    FOREIGN KEY (cozinha_id) REFERENCES Cozinha(id),
    FOREIGN KEY (cidade_id) REFERENCES Cidade(id),
    FOREIGN KEY (usuario_id) REFERENCES Usuario(id)
);

CREATE TABLE IF NOT EXISTS Restaurante_Forma_Pagamento (
    restaurante_id INTEGER NOT NULL,
    forma_pagamento_id INTEGER NOT NULL,
    PRIMARY KEY (restaurante_id, forma_pagamento_id),
    FOREIGN KEY (restaurante_id) REFERENCES Restaurante(id),
    FOREIGN KEY (forma_pagamento_id) REFERENCES FormaPagamento(id)
);

CREATE TABLE IF NOT EXISTS Produto (
    id INTEGER PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    descricao TEXT,
    preco DECIMAL(10,2) NOT NULL,
    ativo BOOLEAN,
    restaurante_id INTEGER NOT NULL,
    FOREIGN KEY (restaurante_id) REFERENCES Restaurante(id)
);

CREATE TABLE IF NOT EXISTS Foto_Produto (
    id INTEGER PRIMARY KEY,
    nome VARCHAR(255),
    descricao TEXT,
    content_type VARCHAR(100),
    tamanho BIGINT,
    produto_id INTEGER NOT NULL UNIQUE,
    FOREIGN KEY (produto_id) REFERENCES Produto(id)
);

CREATE TABLE IF NOT EXISTS Carrinho (
    id INTEGER PRIMARY KEY,
    quantidade_total_itens INT,
    sub_total DECIMAL(10,2),
    usuario_id INTEGER UNIQUE,
    FOREIGN KEY (usuario_id) REFERENCES Usuario(id)
);

CREATE TABLE IF NOT EXISTS Pedido (
    id INTEGER PRIMARY KEY,
    codigo VARCHAR(50) NOT NULL,
    sub_total DECIMAL(10,2),
    taxa_frete DECIMAL(10,2),
    valor_total DECIMAL(10,2),
    data_criacao DATETIME,
    data_confirmacao DATETIME,
    data_entrega DATETIME,
    data_cancelamento DATETIME,
    status_pedido VARCHAR(20) NOT NULL,
    usuario_id INTEGER NOT NULL,
    restaurante_id INTEGER,
    forma_pagamento_id INTEGER,
    FOREIGN KEY (usuario_id) REFERENCES Usuario(id),
    FOREIGN KEY (restaurante_id) REFERENCES Restaurante(id),
    FOREIGN KEY (forma_pagamento_id) REFERENCES FormaPagamento(id),
    CHECK (status_pedido IN ('CRIADO', 'CONFIRMADO', 'ENTREGUE', 'CANCELADO'))
);

CREATE TABLE IF NOT EXISTS Item_Pedido (
    pedido_id INTEGER NOT NULL,
    produto_id INTEGER NOT NULL,
    quantidade INT,
    preco_unitario DECIMAL(10,2),
    preco_total DECIMAL(10,2),
    observacao TEXT,
    PRIMARY KEY (pedido_id, produto_id),
    FOREIGN KEY (pedido_id) REFERENCES Pedido(id),
    FOREIGN KEY (produto_id) REFERENCES Produto(id)
);

CREATE TABLE IF NOT EXISTS Item_Carrinho (
    carrinho_id INTEGER NOT NULL,
    produto_id INTEGER NOT NULL,
    quantidade INT,
    PRIMARY KEY (carrinho_id, produto_id),
    FOREIGN KEY (carrinho_id) REFERENCES Carrinho(id),
    FOREIGN KEY (produto_id) REFERENCES Produto(id)
);