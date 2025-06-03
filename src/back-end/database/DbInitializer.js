import fs from 'fs/promises';
import path from 'path';
import Connection from './Connection.js';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default class DbInitializer {
  constructor() {
    this.connection = new Connection();
    this.scriptPath = path.resolve(__dirname, '../script.sql');
  }

  async runScript() {
    const sql = await fs.readFile(this.scriptPath, 'utf-8');
    const db = await this.connection.connect();
    try {
      await db.exec(sql);
    } finally {
      await this.connection.close();
    }
  }
}
