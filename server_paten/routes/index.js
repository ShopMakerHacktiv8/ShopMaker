const app = require('../app')
const router = require('express').Router()
const productRouter = require('./productRouter')
const shopRouter = require('./shopRouter')
const categoryRouter = require('./categoryRouter')
router.get('/', (req, res) => {
  res.json({ welcome: 'hello world' })
})

router.use('/products', productRouter)
router.use('/shops', shopRouter)
router.use('/categories', categoryRouter)

module.exports = router
