import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';

class ConfigMulter {
  constructor() {
    this.__filename = fileURLToPath(import.meta.url);
    this.__dirname = path.dirname(this.__filename);

    this.storage = multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, path.resolve(this.__dirname, '..', 'uploads'));
      },
      filename: (req, file, cb) => {
        const timestamp = Date.now();
        const ext = path.extname(file.originalname);
        cb(null, `${timestamp}-${file.originalname}`);
      }
    });

    this.upload = multer({ storage: this.storage });
  }

  getUploader() {
    return this.upload;
  }
}

export default ConfigMulter;