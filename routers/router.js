const Router = require('koa-router');
const ctrlUser = require('../controllers/user.controller');
const ctrlAction = require('../controllers/action.controller');

const router = new Router();

router.get('/sign-in', ctrlUser.checkUser);
router.get('/user/:username', ctrlUser.getUser);
router.put('/user', ctrlUser.updateUser);
router.post('/newUser', ctrlUser.addUser);
router.get('/listUsers', ctrlUser.getAllUsers);
router.get('/actions', ctrlAction.getActions);
router.post('/addActions', ctrlAction.addAction);

// error handling
router.get('/404', ctx => ctx.throw(404));
router.get('/500', ctx => ctx.throw(500));


module.exports = router;
