const ClientController = require('../controllers/clientController')

const router = require('express').Router()

router.get('/:id', ClientController.getManifest)

module.exports = router
