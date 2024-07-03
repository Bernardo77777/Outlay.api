const express = require('express');
const controller = require('../controllers/Cost');

const costRouter = express.Router();

// Rota para criar um novo custo
costRouter.post('/create', controller.create);

// Rota para obter um custo pelo ID
costRouter.get('/:id', controller.getById);

// Rota para todos os custo
costRouter.get('/', controller.getAll);

// Rota para todos os custo de utilizadores
costRouter.get('/all/:id', controller.getAllByUserId);

// Rota para atualizar um custo pelo ID
costRouter.put('/update/:id', controller.update);

// Rota para excluir um custo pelo ID
costRouter.delete('/delete/:id', controller.delete);

module.exports = costRouter;
