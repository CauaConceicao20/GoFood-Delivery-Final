import DbInitializer from './database/DbInitializer.js';

(async () => {
  const dbInit = new DbInitializer();
  await dbInit.runScript();
})();