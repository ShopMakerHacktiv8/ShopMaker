const { Shop } = require('../models')
const { verifyToken } = require('../helpers/jwt')

const authentication = async (req, res, next) => {
  try {
    let { access_token } = req.headers
    let decoded = verifyToken(access_token)
    const shop = await Shop.findOne({ where: { email: decoded.email } })
    console.log('INI SHOPPPP')
    if (!shop) throw { name: 'AuthenticationFailed' }
    req.shopData = decoded
    next()
  } catch (err) {
    console.log(err)
    next(err)
  }
}

module.exports = authentication
