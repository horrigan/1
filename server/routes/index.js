const Router =  require('koa-router');
const userCtrl = require('../controllers/userCtrl');
const movieCtrl = require('../controllers/movieCtrl');
const findDocCtrl = require('../controllers/findDocCtrl');

const router = Router();

router.get('/', userCtrl);

router.post('/save-movie', movieCtrl);

router.get('/find-doc', findDocCtrl);


module.exports = router;