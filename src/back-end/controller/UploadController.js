import express from 'express';
import ConfigMulter from '../config/ConfigMulter.js';

class UploadController {
  constructor() {
    this.router = express.Router();
    this.configMulter = new ConfigMulter();
    this.upload = this.configMulter.getUploader();
    this.iniciaRotas();
  }

  iniciaRotas() {
    this.router.post(
      '/imagem',
      this.upload.single('arquivo'),
      this.uploadImagem.bind(this)
    );
  }

  async uploadImagem(req, res) {
    try {
      if (!req.file) {
        return res.status(400).json({ erro: 'Nenhum arquivo enviado.' });
      }

      const imageUrl = `/uploads/${req.file.filename}`;
      return res.status(200).json({ message: 'Upload realizado com sucesso!', url: imageUrl });
    } catch (err) {
      return res.status(500).json({ erro: 'Erro no upload do arquivo.' });
    }
  }
}

export default UploadController;