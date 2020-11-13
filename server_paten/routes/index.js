const app = require('../app')
const router = require('express').Router()
<<<<<<< HEAD
const ProductController = require('../controllers/productController')
=======
const shopRouter = require('./shopRouter')
>>>>>>> main

router.get('/', (req, res) => {
  res.json({ welcome: 'hello world' })
})

<<<<<<< HEAD
// product router
router.post('/products', ProductController.createProduct)
router.get('/products', ProductController.getProduct)
router.get('/products/:id', ProductController.getProductById)
router.delete('/products/:id', ProductController.deleteProduct)
router.put('/products/:id', ProductController.updateProduct)
=======
router.use('/shops', shopRouter)
>>>>>>> main

module.exports = router
