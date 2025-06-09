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
DROP TABLE IF EXISTS categorias;

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

CREATE TABLE IF NOT EXISTS formas_pagamento (
    id INTEGER PRIMARY KEY,
    nome VARCHAR(20) NOT NULL CHECK (nome IN ('CARTAO_CREDITO', 'CARTAO_DEBITO', 'DINHEIRO', 'PIX'))
);

CREATE TABLE IF NOT EXISTS usuarios (
    id INTEGER PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL,
    dataCadastro DATETIME NOT NULL,
    cpf VARCHAR(14) NOT NULL UNIQUE,
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
    descricao VARCHAR(500) NOT NULL,
    razao_social VARCHAR(100),
    cnpj VARCHAR(18) NOT NULL UNIQUE,
    taxa_frete DECIMAL(10,2),
    data_cadastro DATETIME,
    data_atualizacao DATETIME,
    aberto BOOLEAN,
    ativo BOOLEAN,
    cidade_id INTEGER NOT NULL,
    usuario_id INTEGER NOT NULL,
    cep VARCHAR(10),
    logradouro VARCHAR(255),
    numero VARCHAR(20),
    complemento VARCHAR(255),
    bairro VARCHAR(100),
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

CREATE TABLE IF NOT EXISTS categorias (
    id INTEGER PRIMARY KEY,
    nome VARCHAR(20) NOT NULL CHECK (
        nome IN ('BEBIDAS', 'ALIMENTOS', 'SOBREMESAS', 'MARMITAS', 'VEGETARIANA', 'LANCHES')
    )
);

CREATE TABLE IF NOT EXISTS produtos (
    id INTEGER PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    descricao TEXT,
    preco DECIMAL(10,2) NOT NULL,
    ativo BOOLEAN,
    restaurante_id INTEGER NOT NULL,
    categoria_id INTEGER,
    FOREIGN KEY (restaurante_id) REFERENCES restaurantes(id),
    FOREIGN KEY (categoria_id) REFERENCES categorias(id)
);

CREATE TABLE IF NOT EXISTS fotos_produto (
    id INTEGER PRIMARY KEY,
    nome VARCHAR(255),
    descricao TEXT,
    content_type VARCHAR(100),
    tamanho BIGINT,
    url VARCHAR(150) NOT NULL,
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

INSERT INTO formas_pagamento (nome) VALUES ('CARTAO_CREDITO');
INSERT INTO formas_pagamento (nome) VALUES ('CARTAO_DEBITO');
INSERT INTO formas_pagamento (nome) VALUES ('DINHEIRO');
INSERT INTO formas_pagamento (nome) VALUES ('PIX');

-- ESTADOS
INSERT INTO estados (id, nome, sigla) VALUES (1, 'Acre', 'AC');
INSERT INTO estados (id, nome, sigla) VALUES (2, 'Alagoas', 'AL');
INSERT INTO estados (id, nome, sigla) VALUES (3, 'Amapá', 'AP');
INSERT INTO estados (id, nome, sigla) VALUES (4, 'Amazonas', 'AM');
INSERT INTO estados (id, nome, sigla) VALUES (5, 'Bahia', 'BA');
INSERT INTO estados (id, nome, sigla) VALUES (6, 'Ceará', 'CE');
INSERT INTO estados (id, nome, sigla) VALUES (7, 'Distrito Federal', 'DF');
INSERT INTO estados (id, nome, sigla) VALUES (8, 'Espírito Santo', 'ES');
INSERT INTO estados (id, nome, sigla) VALUES (9, 'Goiás', 'GO');
INSERT INTO estados (id, nome, sigla) VALUES (10, 'Maranhão', 'MA');
INSERT INTO estados (id, nome, sigla) VALUES (11, 'Mato Grosso', 'MT');
INSERT INTO estados (id, nome, sigla) VALUES (12, 'Mato Grosso do Sul', 'MS');
INSERT INTO estados (id, nome, sigla) VALUES (13, 'Minas Gerais', 'MG');
INSERT INTO estados (id, nome, sigla) VALUES (14, 'Pará', 'PA');
INSERT INTO estados (id, nome, sigla) VALUES (15, 'Paraíba', 'PB');
INSERT INTO estados (id, nome, sigla) VALUES (16, 'Paraná', 'PR');
INSERT INTO estados (id, nome, sigla) VALUES (17, 'Pernambuco', 'PE');
INSERT INTO estados (id, nome, sigla) VALUES (18, 'Piauí', 'PI');
INSERT INTO estados (id, nome, sigla) VALUES (19, 'Rio de Janeiro', 'RJ');
INSERT INTO estados (id, nome, sigla) VALUES (20, 'Rio Grande do Norte', 'RN');
INSERT INTO estados (id, nome, sigla) VALUES (21, 'Rio Grande do Sul', 'RS');
INSERT INTO estados (id, nome, sigla) VALUES (22, 'Rondônia', 'RO');
INSERT INTO estados (id, nome, sigla) VALUES (23, 'Roraima', 'RR');
INSERT INTO estados (id, nome, sigla) VALUES (24, 'Santa Catarina', 'SC');
INSERT INTO estados (id, nome, sigla) VALUES (25, 'São Paulo', 'SP');
INSERT INTO estados (id, nome, sigla) VALUES (26, 'Sergipe', 'SE');
INSERT INTO estados (id, nome, sigla) VALUES (27, 'Tocantins', 'TO');

-- CIDADES (exemplos, relacione o estado_id conforme acima)
INSERT INTO cidades (nome, estado_id) VALUES ('Rio Branco', 1);
INSERT INTO cidades (nome, estado_id) VALUES ('Maceió', 2);
INSERT INTO cidades (nome, estado_id) VALUES ('Macapá', 3);
INSERT INTO cidades (nome, estado_id) VALUES ('Manaus', 4);
INSERT INTO cidades (nome, estado_id) VALUES ('Salvador', 5);
INSERT INTO cidades (nome, estado_id) VALUES ('Fortaleza', 6);
INSERT INTO cidades (nome, estado_id) VALUES ('Brasília', 7);
INSERT INTO cidades (nome, estado_id) VALUES ('Vitória', 8);
INSERT INTO cidades (nome, estado_id) VALUES ('Goiânia', 9);
INSERT INTO cidades (nome, estado_id) VALUES ('São Luís', 10);
INSERT INTO cidades (nome, estado_id) VALUES ('Cuiabá', 11);
INSERT INTO cidades (nome, estado_id) VALUES ('Campo Grande', 12);
INSERT INTO cidades (nome, estado_id) VALUES ('Belo Horizonte', 13);
INSERT INTO cidades (nome, estado_id) VALUES ('Belém', 14);
INSERT INTO cidades (nome, estado_id) VALUES ('João Pessoa', 15);
INSERT INTO cidades (nome, estado_id) VALUES ('Curitiba', 16);
INSERT INTO cidades (nome, estado_id) VALUES ('Recife', 17);
INSERT INTO cidades (nome, estado_id) VALUES ('Teresina', 18);
INSERT INTO cidades (nome, estado_id) VALUES ('Rio de Janeiro', 19);
INSERT INTO cidades (nome, estado_id) VALUES ('Natal', 20);
INSERT INTO cidades (nome, estado_id) VALUES ('Porto Alegre', 21);
INSERT INTO cidades (nome, estado_id) VALUES ('Porto Velho', 22);
INSERT INTO cidades (nome, estado_id) VALUES ('Boa Vista', 23);
INSERT INTO cidades (nome, estado_id) VALUES ('Florianópolis', 24);
INSERT INTO cidades (nome, estado_id) VALUES ('São Paulo', 25);
INSERT INTO cidades (nome, estado_id) VALUES ('Aracaju', 26);
INSERT INTO cidades (nome, estado_id) VALUES ('Palmas', 27);

-- Exemplos de cidades adicionais para alguns estados
INSERT INTO cidades (nome, estado_id) VALUES ('Campinas', 25);
INSERT INTO cidades (nome, estado_id) VALUES ('Santos', 25);
INSERT INTO cidades (nome, estado_id) VALUES ('Sorocaba', 25);
INSERT INTO cidades (nome, estado_id) VALUES ('Uberlândia', 13);
INSERT INTO cidades (nome, estado_id) VALUES ('Contagem', 13);
INSERT INTO cidades (nome, estado_id) VALUES ('Joinville', 24);
INSERT INTO cidades (nome, estado_id) VALUES ('Londrina', 16);
INSERT INTO cidades (nome, estado_id) VALUES ('Maringá', 16);
INSERT INTO cidades (nome, estado_id) VALUES ('Caxias do Sul', 21);
INSERT INTO cidades (nome, estado_id) VALUES ('Niterói', 19);

-- CATEGORIAS DE PRODUTOS

INSERT INTO categorias (nome) VALUES ('BEBIDAS');
INSERT INTO categorias (nome) VALUES ('ALIMENTOS');
INSERT INTO categorias (nome) VALUES ('SOBREMESAS');
INSERT INTO categorias (nome) VALUES ('MARMITAS');
INSERT INTO categorias (nome) VALUES ('VEGETARIANA');
INSERT INTO categorias (nome) VALUES ('LANCHES');