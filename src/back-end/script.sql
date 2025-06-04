DROP TABLE IF EXISTS itens_carrinho;
DROP TABLE IF EXISTS itens_pedido;
DROP TABLE IF EXISTS pedidos;
DROP TABLE IF EXISTS carrinhos;
DROP TABLE IF EXISTS fotos_produto;
DROP TABLE IF EXISTS produtos;
DROP TABLE IF EXISTS restaurantes_forma_pagamento;
DROP TABLE IF EXISTS restaurantes;
DROP TABLE IF EXISTS usuarios_grupo;
DROP TABLE IF EXISTS permissoes;
DROP TABLE IF EXISTS grupos;
DROP TABLE IF EXISTS usuarios;
DROP TABLE IF EXISTS formas_pagamento;
DROP TABLE IF EXISTS cozinhas;
DROP TABLE IF EXISTS cidades;
DROP TABLE IF EXISTS estados;

CREATE TABLE IF NOT EXISTS estados (
    id INTEGER PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    sigla VARCHAR(2) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS cidades (
    id INTEGER PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    estado_id INTEGER NOT NULL,
    FOREIGN KEY (estado_id) REFERENCES estados(id)
);

CREATE TABLE IF NOT EXISTS cozinhas (
    id INTEGER PRIMARY KEY,
    nome VARCHAR(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS formas_pagamento (
    id INTEGER PRIMARY KEY,
    nome VARCHAR(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS usuarios (
    id INTEGER PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL,
    dataCadastro DATETIME NOT NULL,
    cpf VARCHAR(14) NOT NULL UNIQUE,
    cnpj VARCHAR(18) UNIQUE,
    telefone VARCHAR(15) NOT NULL
);

CREATE TABLE IF NOT EXISTS grupos (
    id INTEGER PRIMARY KEY,
    nome VARCHAR(20) NOT NULL CHECK (nome IN ('ADMIN', 'CLIENTE', 'RESTAURANTE'))
);

CREATE TABLE IF NOT EXISTS permissoes (
    id INTEGER PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    grupo_id INTEGER NOT NULL,
    FOREIGN KEY (grupo_id) REFERENCES grupos(id)
);

CREATE TABLE IF NOT EXISTS usuarios_grupo (
    usuario_id INTEGER NOT NULL,
    grupo_id INTEGER NOT NULL,
    PRIMARY KEY (usuario_id, grupo_id),
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id),
    FOREIGN KEY (grupo_id) REFERENCES grupos(id)
);

CREATE TABLE IF NOT EXISTS restaurantes (
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
    FOREIGN KEY (cozinha_id) REFERENCES cozinhas(id),
    FOREIGN KEY (cidade_id) REFERENCES cidades(id),
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);

CREATE TABLE IF NOT EXISTS restaurantes_forma_pagamento (
    restaurante_id INTEGER NOT NULL,
    forma_pagamento_id INTEGER NOT NULL,
    PRIMARY KEY (restaurante_id, forma_pagamento_id),
    FOREIGN KEY (restaurante_id) REFERENCES restaurantes(id),
    FOREIGN KEY (forma_pagamento_id) REFERENCES formas_pagamento(id)
);

CREATE TABLE IF NOT EXISTS produtos (
    id INTEGER PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    descricao TEXT,
    preco DECIMAL(10,2) NOT NULL,
    ativo BOOLEAN,
    restaurante_id INTEGER NOT NULL,
    FOREIGN KEY (restaurante_id) REFERENCES restaurantes(id)
);

CREATE TABLE IF NOT EXISTS fotos_produto (
    id INTEGER PRIMARY KEY,
    nome VARCHAR(255),
    descricao TEXT,
    content_type VARCHAR(100),
    tamanho BIGINT,
    produto_id INTEGER NOT NULL UNIQUE,
    FOREIGN KEY (produto_id) REFERENCES produtos(id)
);

CREATE TABLE IF NOT EXISTS carrinhos (
    id INTEGER PRIMARY KEY,
    quantidade_total_itens INT,
    sub_total DECIMAL(10,2),
    usuario_id INTEGER UNIQUE,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);

CREATE TABLE IF NOT EXISTS pedidos (
    id INTEGER PRIMARY KEY,
    codigo VARCHAR(50) NOT NULL,
    sub_total DECIMAL(10,2),
    taxa_frete DECIMAL(10,2),
    valor_total DECIMAL(10,2),
    data_criacao DATETIME,
    data_confirmacao DATETIME,
    data_entrega DATETIME,
    data_cancelamento DATETIME,
    status_pedido VARCHAR(20) NOT NULL CHECK (status_pedido IN ('CRIADO', 'CONFIRMADO', 'ENTREGUE', 'CANCELADO')),
    usuario_id INTEGER NOT NULL,
    restaurante_id INTEGER,
    forma_pagamento_id INTEGER,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id),
    FOREIGN KEY (restaurante_id) REFERENCES restaurantes(id),
    FOREIGN KEY (forma_pagamento_id) REFERENCES formas_pagamento(id)
);

CREATE TABLE IF NOT EXISTS itens_pedido (
    pedido_id INTEGER NOT NULL,
    produto_id INTEGER NOT NULL,
    quantidade INT,
    preco_unitario DECIMAL(10,2),
    preco_total DECIMAL(10,2),
    observacao TEXT,
    PRIMARY KEY (pedido_id, produto_id),
    FOREIGN KEY (pedido_id) REFERENCES pedidos(id),
    FOREIGN KEY (produto_id) REFERENCES produtos(id)
);

CREATE TABLE IF NOT EXISTS itens_carrinho (
    carrinho_id INTEGER NOT NULL,
    produto_id INTEGER NOT NULL,
    quantidade INT,
    PRIMARY KEY (carrinho_id, produto_id),
    FOREIGN KEY (carrinho_id) REFERENCES carrinhos(id),
    FOREIGN KEY (produto_id) REFERENCES produtos(id)
);

INSERT INTO grupos (nome) VALUES ('ADMIN');
INSERT INTO grupos (nome) VALUES ('CLIENTE');
INSERT INTO grupos (nome) VALUES ('RESTAURANTE');

INSERT INTO permissoes (nome, grupo_id) VALUES ('gerenciar_usuarios', 1);
INSERT INTO permissoes (nome, grupo_id) VALUES ('gerenciar_grupos', 1);
INSERT INTO permissoes (nome, grupo_id) VALUES ('gerenciar_permissoes', 1);
INSERT INTO permissoes (nome, grupo_id) VALUES ('gerenciar_restaurantes', 1);
INSERT INTO permissoes (nome, grupo_id) VALUES ('gerenciar_produtos', 1);
INSERT INTO permissoes (nome, grupo_id) VALUES ('visualizar_todos_pedidos', 1);
INSERT INTO permissoes (nome, grupo_id) VALUES ('alterar_status_pedido', 1);
INSERT INTO permissoes (nome, grupo_id) VALUES ('remover_usuarios', 1);
INSERT INTO permissoes (nome, grupo_id) VALUES ('remover_restaurantes', 1);

INSERT INTO permissoes (nome, grupo_id) VALUES ('gerenciar_cardapio', 2);
INSERT INTO permissoes (nome, grupo_id) VALUES ('visualizar_pedidos', 2);

-- INSERT INTO permissoes (nome, grupo_id) VALUES ('alterar_status_pedido', 2);

INSERT INTO permissoes (nome, grupo_id) VALUES ('fazer_pedido', 3);
INSERT INTO permissoes (nome, grupo_id) VALUES ('gerenciar_carrinho', 3);
INSERT INTO permissoes (nome, grupo_id) VALUES ('visualizar_cardapio', 3);
INSERT INTO permissoes (nome, grupo_id) VALUES ('editar_perfil', 3);

--INSERT INTO permissoes (nome, grupo_id) VALUES ('acompanhar_pedido', 3);