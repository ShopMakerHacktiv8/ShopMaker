const router = require('express').Router()
const ProductController = require('../controllers/productController')
const authentication = require('../middlewares/authentication')
const upload = require('../middlewares/upload')


router.post('/', authentication, upload.single('file'), ProductController.createProduct)
router.get('/', ProductController.getProduct)
router.get('/:id', ProductController.getProductById)
router.delete('/:id', authentication, ProductController.deleteProduct)
router.put('/:id', authentication, upload.single('file'), ProductController.updateProduct)


module.exports = router