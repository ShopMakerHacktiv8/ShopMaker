const router = require('express').Router()
const Category = require('../controllers/categoryController')
const authentication = require('../middlewares/authentication');

router.get('/', Category.read)
router.post('/',authentication, Category.add)
router.delete('/:id', authentication,  Category.delete)

module.exports = router
