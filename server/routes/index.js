const Router =  require('koa-router');
const userCtrl = require('../controllers/userCtrl');

const router = Router();

router.get('/', userCtrl);

module.exports = router;