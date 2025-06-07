import express from 'express';
import cors from 'cors';
import UsuarioController from './controller/UsuarioController.js';
import RestauranteController from './controller/RestauranteController.js';
import DbInitializer from './database/DbInitializer.js';
import ErrorHandler from './exception/ErrorHandler.js';

(async () => {
  const dbInit = new DbInitializer();
  await dbInit.runScript();
})();

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.use('/api/v1/usuarios', new UsuarioController().router);
app.use('/api/v1/restaurantes', new RestauranteController().router);

app.use(ErrorHandler.errorHandler);

app.listen(port, () => {
  console.log(`Servidor rodando na porta: ${port}`);
});