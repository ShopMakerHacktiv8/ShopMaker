const app = require('../app')
const router = require('express').Router()
const productRouter = require('./productRouter')
const shopRouter = require('./shopRouter')
const categoryRouter = require('./categoryRouter')
const clientRouter = require('./clientRouter')

router.use('/products', productRouter)
router.use('/shops', shopRouter)
router.use('/categories', categoryRouter)
router.use('/clients', clientRouter)

module.exports = router
