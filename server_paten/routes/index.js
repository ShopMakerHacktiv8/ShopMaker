const router = require('express').Router()
const ProductController = require('../controllers/productController')

router.get('/', (req, res) => {
  res.json({ welcome: 'hello world' })
})

// product router
router.post('/products', ProductController.createProduct)
router.get('/products', ProductController.getProduct)
router.get('/products/:id', ProductController.getProductById)
router.delete('/products/:id', ProductController.deleteProduct)
router.put('/products/:id', ProductController.updateProduct)

module.exports = router
