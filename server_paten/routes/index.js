const router = require('express').Router()

router.get('/', (req, res) => {
  res.json({ welcome: 'hello world' })
})

module.exports = router
