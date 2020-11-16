const ClientController = require('../controllers/clientController')

const router = require('express').Router()

router.get('/:id', ClientController.getManifest)
router.post('/:id/buy', ClientController.buyProduct)

module.exports = router
