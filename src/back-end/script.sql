DROP TABLE IF EXISTS itens_carrinho;
DROP TABLE IF EXISTS itens_pedido;
DROP TABLE IF EXISTS pedidos;
DROP TABLE IF EXISTS carrinhos;
DROP TABLE IF EXISTS fotos;
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

CREATE TABLE IF NOT EXISTS fotos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    content_type TEXT NOT NULL,
    tamanho INTEGER NOT NULL,
    url TEXT NOT NULL,
    entidade_tipo TEXT CHECK(entidade_tipo IN ('PRODUTO', 'RESTAURANTE')) NOT NULL,
    entidade_id INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS carrinhos (
    id INTEGER PRIMARY KEY,
    quantidade_total_itens INTEGER NOT NULL,
    sub_total DECIMAL(10,2) NOT NULL,
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
    observacao VARCHAR(255),
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

-- Usuários para os restaurantes
INSERT INTO usuarios (id, nome, email, senha, dataCadastro, cpf, telefone)
VALUES 
(1, 'Carlos Silva', 'carlos@exemplo.com', 'senha123', '2024-06-12T12:00:00', '123.456.789-00', '(11) 99999-1111'),
(2, 'Maria Oliveira', 'maria@exemplo.com', 'senha123', '2024-06-12T12:00:00', '234.567.890-11', '(11) 99999-2222'),
(3, 'João Souza', 'joao@exemplo.com', 'senha123', '2024-06-12T12:00:00', '345.678.901-22', '(48) 98888-3333');

INSERT INTO usuarios_grupo (usuario_id, grupo_id) VALUES (1, 1);
INSERT INTO usuarios_grupo (usuario_id, grupo_id) VALUES (1, 3);
INSERT INTO usuarios_grupo (usuario_id, grupo_id) VALUES (2, 1);
INSERT INTO usuarios_grupo (usuario_id, grupo_id) VALUES (2, 3);

INSERT INTO usuarios_grupo (usuario_id, grupo_id) VALUES (3, 1);
INSERT INTO usuarios_grupo (usuario_id, grupo_id) VALUES (3, 3);

-- 3 Restaurantes completos
INSERT INTO restaurantes (nome, descricao, razao_social, cnpj, taxa_frete, data_cadastro, data_atualizacao, aberto, ativo, cidade_id, usuario_id, cep, logradouro, numero, complemento, bairro)
VALUES 
('Restaurante Sabor Caseiro', 'Comida brasileira tradicional', 'Sabor Caseiro Ltda', '12.345.678/0001-11', 7.50, '2024-06-12T12:00:00', '2024-06-12T12:00:00', 1, 1, 25, 1, '01001-000', 'Rua das Flores', '100', 'Sala 1', 'Centro'),
('Pizzaria Bella Massa', 'Pizzas artesanais e delivery', 'Bella Massa Pizzaria ME', '23.456.789/0001-22', 5.00, '2024-06-12T12:00:00', '2024-06-12T12:00:00', 1, 1, 25, 2, '11000-000', 'Av. Paulista', '2000', 'Loja 2', 'Bela Vista'),
('Veggie Life', 'Opções vegetarianas e veganas', 'Veggie Life Alimentos Ltda', '34.567.890/0001-33', 6.00, '2024-06-12T12:00:00', '2024-06-12T12:00:00', 1, 1, 24, 3, '88000-000', 'Rua das Palmeiras', '300', '', 'Centro');

INSERT INTO restaurantes_forma_pagamento (restaurante_id, forma_pagamento_id) VALUES (1, 1);
INSERT INTO restaurantes_forma_pagamento (restaurante_id, forma_pagamento_id) VALUES (1, 2);
INSERT INTO restaurantes_forma_pagamento (restaurante_id, forma_pagamento_id) VALUES (1, 3);
INSERT INTO restaurantes_forma_pagamento (restaurante_id, forma_pagamento_id) VALUES (1, 4);

-- Restaurante 2 aceita todas as formas de pagamento
INSERT INTO restaurantes_forma_pagamento (restaurante_id, forma_pagamento_id) VALUES (2, 1);
INSERT INTO restaurantes_forma_pagamento (restaurante_id, forma_pagamento_id) VALUES (2, 2);
INSERT INTO restaurantes_forma_pagamento (restaurante_id, forma_pagamento_id) VALUES (2, 3);
INSERT INTO restaurantes_forma_pagamento (restaurante_id, forma_pagamento_id) VALUES (2, 4);

-- Restaurante 3 aceita todas as formas de pagamento
INSERT INTO restaurantes_forma_pagamento (restaurante_id, forma_pagamento_id) VALUES (3, 1);
INSERT INTO restaurantes_forma_pagamento (restaurante_id, forma_pagamento_id) VALUES (3, 2);
INSERT INTO restaurantes_forma_pagamento (restaurante_id, forma_pagamento_id) VALUES (3, 3);
INSERT INTO restaurantes_forma_pagamento (restaurante_id, forma_pagamento_id) VALUES (3, 4);

-- INSERIR 30 PRODUTOS (10 para cada restaurante)
-- PRODUTOS DO RESTAURANTE 1 (ID = 1)
INSERT INTO produtos (id, nome, descricao, preco, ativo, restaurante_id, categoria_id) VALUES
  (1, 'Salada de Frutas', 'Salada de frutas frescas', 12.00, 1, 1, 1),
  (2, 'Arroz Integral', 'Arroz integral soltinho', 8.00, 1, 1, 1),
  (3, 'Frango Grelhado', 'Peito de frango grelhado', 18.00, 1, 1, 1),
  (4, 'Feijão Tropeiro', 'Feijão tropeiro tradicional', 14.00, 1, 1, 1),
  (5, 'Omelete de Legumes', 'Omelete com legumes frescos', 10.00, 1, 1, 1),
  (6, 'Sopa de Legumes', 'Sopa nutritiva de legumes', 11.00, 1, 1, 1),
  (7, 'Macarrão Integral', 'Macarrão integral ao molho', 13.00, 1, 1, 1),
  (8, 'Peixe Assado', 'Filé de peixe assado', 20.00, 1, 1, 1),
  (9, 'Purê de Batata', 'Purê de batata cremoso', 9.00, 1, 1, 1),
  (10, 'Carne de Panela', 'Carne cozida com legumes', 19.00, 1, 1, 1),

-- PRODUTOS DO RESTAURANTE 2 (ID = 2)
  (11, 'Burguer Clássico', 'Hambúrguer tradicional', 22.00, 1, 2, 2),
  (12, 'Burguer Bacon', 'Hambúrguer com bacon crocante', 25.00, 1, 2, 2),
  (13, 'Burguer Duplo', 'Dois hambúrgueres suculentos', 28.00, 1, 2, 2),
  (14, 'Burguer Veggie', 'Hambúrguer vegetariano', 20.00, 1, 2, 2),
  (15, 'Batata Frita', 'Batata frita crocante', 10.00, 1, 2, 2),
  (16, 'Onion Rings', 'Anéis de cebola empanados', 12.00, 1, 2, 2),
  (17, 'Milkshake Chocolate', 'Milkshake de chocolate', 15.00, 1, 2, 2),
  (18, 'Milkshake Morango', 'Milkshake de morango', 15.00, 1, 2, 2),
  (19, 'Cheeseburguer', 'Hambúrguer com queijo', 23.00, 1, 2, 2),
  (20, 'Chicken Burguer', 'Hambúrguer de frango', 21.00, 1, 2, 2),

-- PRODUTOS DO RESTAURANTE 3 (ID = 3)
  (21, 'Mousse de Maracujá', 'Mousse cremoso de maracujá', 9.00, 1, 3, 3),
  (22, 'Pudim de Leite', 'Pudim tradicional', 10.00, 1, 3, 3),
  (23, 'Torta de Limão', 'Torta doce de limão', 11.00, 1, 3, 3),
  (24, 'Brigadeiro Gourmet', 'Brigadeiro artesanal', 4.00, 1, 3, 3),
  (25, 'Beijinho', 'Doce de coco', 4.00, 1, 3, 3),
  (26, 'Bolo de Cenoura', 'Bolo com cobertura de chocolate', 7.00, 1, 3, 3),
  (27, 'Brownie', 'Brownie de chocolate', 8.00, 1, 3, 3),
  (28, 'Quindim', 'Doce de gema e coco', 6.00, 1, 3, 3),
  (29, 'Torta de Morango', 'Torta doce de morango', 12.00, 1, 3, 3),
  (30, 'Cocada', 'Doce de coco tradicional', 5.00, 1, 3, 3);

/*-- INSERIR FOTOS PARA RESTAURANTES
INSERT INTO fotos (nome, descricao, content_type, tamanho, url, entidade_tipo, entidade_id) VALUES
  ('burguer.png', 'Foto do restaurante Burguer Mania', 'image/png', 123456, '/uploads/img-produtos-almoço/burguer.png', 'RESTAURANTE', 102),
  ('salada_frutas.png', 'Foto do restaurante Sabor da Casa', 'image/png', 123456, '/uploads/img-produtos-almoço/salada_frutas.png', 'RESTAURANTE', 101),
  ('mousse_maracuja.png', 'Foto do restaurante Doces Delícias', 'image/png', 123456, '/uploads/img-produtos-almoço/mousse_maracuja.png', 'RESTAURANTE', 103);
*/

CREATE TABLE IF NOT EXISTS fotos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    content_type TEXT NOT NULL,
    tamanho INTEGER NOT NULL,
    url TEXT NOT NULL,
    entidade_tipo TEXT CHECK(entidade_tipo IN ('PRODUTO', 'RESTAURANTE')) NOT NULL,
    entidade_id INTEGER NOT NULL
);

INSERT INTO fotos (id, nome, content_type, tamanho, url, entidade_tipo, entidade_id) VALUES
('1', 'salada_frutas.png', 'image/png', 123456, '/uploads/img-produtos-almoço/salada_frutas.png', 'PRODUTO', 1),
('2', 'arroz_integral.png', 'image/png', 123456, '/uploads/img-produtos-almoço/arroz_integral.png', 'PRODUTO', 2),
('3', 'frango_grelhado.png', 'image/png', 123456, '/uploads/img-produtos-almoço/frango_grelhado.png', 'PRODUTO', 3),
('4', 'feijao_tropeiro.png', 'image/png', 123456, '/uploads/img-produtos-almoço/feijao_tropeiro.png', 'PRODUTO', 4),
('5', 'omelete_legumes.png', 'image/png', 123456, '/uploads/img-produtos-almoço/omelete_legumes.png', 'PRODUTO', 5),
('6', 'sopa_legumes.png', 'image/png', 123456, '/uploads/img-produtos-almoço/sopa_legumes.png', 'PRODUTO', 6),
('7', 'macarrao_integral.png', 'image/png', 123456, '/uploads/img-produtos-almoço/macarrao_integral.png', 'PRODUTO', 7),
('8', 'peixe_assado.png', 'image/png', 123456, '/uploads/img-produtos-almoço/peixe_assado.png', 'PRODUTO', 8),
('9', 'pure_batata.png', 'image/png', 123456, '/uploads/img-produtos-almoço/pure_batata.png', 'PRODUTO', 9),
('10', 'carne_panela.png', 'image/png', 123456, '/uploads/img-produtos-almoço/carne_panela.png', 'PRODUTO', 10),

('11', 'burguer_classico.png', 'image/png', 123456, '/uploads/img-produtos-almoço/burguer_classico.png', 'PRODUTO', 11),
('12', 'burguer_bacon.png', 'image/png', 123456, '/uploads/img-produtos-almoço/burguer_bacon.png', 'PRODUTO', 12),
('13', 'burguer_duplo.png', 'image/png', 123456, '/uploads/img-produtos-almoço/burguer_duplo.png', 'PRODUTO', 13),
('14', 'burguer_veggie.png', 'image/png', 123456, '/uploads/img-produtos-almoço/burguer_veggie.png', 'PRODUTO', 14),
('15', 'batata_frita.png', 'image/png', 123456, '/uploads/img-produtos-almoço/batata_frita.png', 'PRODUTO', 15),
('16', 'onion_rings.png', 'image/png', 123456, '/uploads/img-produtos-almoço/onion_rings.png', 'PRODUTO', 16),
('17', 'milkshake_chocolate.png', 'image/png', 123456, '/uploads/img-produtos-almoço/milkshake_chocolate.png', 'PRODUTO', 17),
('18', 'milkshake_morango.png', 'image/png', 123456, '/uploads/img-produtos-almoço/milkshake_morango.png', 'PRODUTO', 18),
('19', 'cheeseburguer.png', 'image/png', 123456, '/uploads/img-produtos-almoço/cheeseburguer.png', 'PRODUTO', 19),
('20', 'chicken_burguer.png', 'image/png', 123456, '/uploads/img-produtos-almoço/chicken_burguer.png', 'PRODUTO', 20),

('21', 'mousse_maracuja.png', 'image/png', 123456, '/uploads/img-produtos-almoço/mousse_maracuja.png', 'PRODUTO', 21),
('22', 'pudim_leite.png', 'image/png', 123456, '/uploads/img-produtos-almoço/pudim_leite.png', 'PRODUTO', 22),
('23', 'torta_limao.png', 'image/png', 123456, '/uploads/img-produtos-almoço/torta_limao.png', 'PRODUTO', 23),
('24', 'brigadeiro_gourmet.png', 'image/png', 123456, '/uploads/img-produtos-almoço/brigadeiro_gourmet.png', 'PRODUTO', 24),
('25', 'beijinho.png', 'image/png', 123456, '/uploads/img-produtos-almoço/beijinho.png', 'PRODUTO', 25),
('26', 'bolo_cenoura.png', 'image/png', 123456, '/uploads/img-produtos-almoço/bolo_cenoura.png', 'PRODUTO', 26),
('27', 'brownie.png', 'image/png', 123456, '/uploads/img-produtos-almoço/brownie.png', 'PRODUTO', 27),
('28', 'quindim.png', 'image/png', 123456, '/uploads/img-produtos-almoço/quindim.png', 'PRODUTO', 28),
('29', 'torta_morango.png', 'image/png', 123456, '/uploads/img-produtos-almoço/torta_morango.png', 'PRODUTO', 29),
('30', 'cocada.png', 'image/png', 123456, '/uploads/img-produtos-almoço/cocada.png', 'PRODUTO', 30);