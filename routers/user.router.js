const Router = require('koa-router');
const ctrlUser = require('../controllers/user.controller');
const ctrlAction = require('../controllers/action.controller');

const router = new Router();

router.post('/sign-in', ctrlUser.checkUser);
//router.get('/actions', ctrlAction.getActions);
router.patch('/user/:id', ctrlUser.addCompletedAction);


module.exports = router;
