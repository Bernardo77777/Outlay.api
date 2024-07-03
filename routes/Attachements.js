const express = require('express');
const multer = require('multer');
const controller = require('../controllers/Attachement');

const attachmentRouter = express.Router();

// Configuração de armazenamento do Multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ storage: storage });

// Rota para criar um novo attachment com upload de arquivo
attachmentRouter.post('/create', upload.single('file'), controller.create);

// Rota para atualizar um attachment com upload de novo arquivo
attachmentRouter.put('/update/:id', upload.single('file'), controller.update);

// Rota para download de um attachment pelo ID
attachmentRouter.get('/download/:id', controller.download);

module.exports = attachmentRouter;
