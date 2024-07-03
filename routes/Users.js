const userRouter = require('express').Router();
const controller = require('../controllers/User');

//students CRUD
userRouter.get('/', controller.getAll);
userRouter.get('/:id', controller.getById);
userRouter.post('/create', controller.create);
userRouter.put('/update/:id', controller.update);
userRouter.delete('/delete/:id', controller.delete);

module.exports = userRouter;