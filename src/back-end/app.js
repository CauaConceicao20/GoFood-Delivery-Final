import express from 'express';
import cors from 'cors';
import UsuarioController from './controller/UsuarioController.js';
import DbInitializer from './database/DbInitializer.js';

(async () => {
  const dbInit = new DbInitializer();
  await dbInit.runScript();
})();

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.use('/usuarios', new UsuarioController().router);

app.listen(port, () => {
  console.log(`Servidor rodando na porta: ${port}`);
});