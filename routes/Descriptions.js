const descriptionRouter = require('express').Router();
const controller = require('../controllers/Description');

descriptionRouter.get('/:id', controller.getById);
descriptionRouter.post('/create', controller.create);
descriptionRouter.put('/update/:id', controller.update);

module.exports = descriptionRouter;