const ShopController = require('../controllers/shopController')
const upload = require('../middlewares/upload')

const router = require('express').Router()

router.post('/login', ShopController.login)
router.post('/register', upload.single('file'), ShopController.register)
router.get('/:id', ShopController.findOne)

// upload.single('file')
module.exports = router
