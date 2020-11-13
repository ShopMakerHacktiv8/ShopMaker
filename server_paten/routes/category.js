const router = require('express').Router()
const Category = require('../controller/category')

router.get('/', Category.read)
router.post('/', Category.add)
router.put('/:id', Category.edit)
router.delete('/:id', Category.delete)

module.exports = router
