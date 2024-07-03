const router = require('express').Router();
const authRouter = require('./Auths');
const userRouter = require('./Users');
const costRouter = require('./Costs');
const descriptionRouter = require('./Descriptions')
const attachementRouter = require('./Attachements');

router.use('/auth', authRouter);
router.use('/Users', userRouter);
router.use('/Costs', costRouter);
router.use('/Attachements', attachementRouter);
router.use('/Descriptions', descriptionRouter);

module.exports = router;