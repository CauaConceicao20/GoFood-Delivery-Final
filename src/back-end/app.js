import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './config/swagger.js';
import UsuarioController from './controller/UsuarioController.js';
import RestauranteController from './controller/RestauranteController.js';
import DbInitializer from './database/DbInitializer.js';
import ErrorHandler from './exception/ErrorHandler.js';
import AuthController from './controller/AuthController.js';
import ProdutoController from './controller/ProdutoController.js';
import CarrinhoController from './controller/CarrinhoController.js';
import PedidoController from './controller/PedidoController.js';
import UploadController from './controller/UploadController.js';
import cookieParser from 'cookie-parser';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

(async () => {
  const dbInit = new DbInitializer();
  await dbInit.runScript();
})();

const app = express();
const port = 3001;

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

app.use(cookieParser());
app.use(express.json());

app.use('/uploads', express.static(path.resolve(__dirname, 'uploads')));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api/v1/auth', new AuthController().router);
app.use('/api/v1/usuarios', new UsuarioController().router);
app.use('/api/v1/restaurantes', new RestauranteController().router);
app.use('/api/v1/produtos', new ProdutoController().router);
app.use('/api/v1/carrinhos', new CarrinhoController().router);
app.use('/api/v1/pedidos', new PedidoController().router);
app.use('/api/v1/uploads', new UploadController().router);

app.use(ErrorHandler.errorHandler);

app.listen(port, () => {
  console.log(`Servidor rodando na porta: ${port}`);
  console.log(`Documentação disponível em http://localhost:${port}/api-docs`);
});