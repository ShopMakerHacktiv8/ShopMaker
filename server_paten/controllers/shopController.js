const { comparePassword } = require('../helpers/bcrypt')
const { generateToken } = require('../helpers/jwt')
const generateManifest = require('../helpers/manifest')
const { Shop } = require('../models')

class ShopController {
  static async register(req, res, next) {
    try {
      const {
        email,
        password,
        name,
        address,
        phone,
        description,
        file,
      } = req.body

      const shopObj = {
        email,
        password,
        name,
        address,
        phone,
        description,
        icon_url: file,
      }
      const shop = await Shop.create(shopObj, { individualHooks: true })
      res.status(201).json({
        id: shop.id,
        email: shop.email,
        name: shop.name,
      })
    } catch (err) {
      console.log(err)
      next(err)
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body

      if (!email || !password) {
        throw { statusCode: 400, msg: 'invalid email or password' }
      }

      const shop = await Shop.findOne({ where: { email } })

      if (!shop) {
        throw { statusCode: 400, msg: 'invalid email or password' }
      }
      if (!comparePassword(password, shop.password)) {
        throw { statusCode: 400, msg: 'invalid email or password' }
      }

      const access_token = generateToken({
        id: shop.id,
        email: shop.email,
        name: shop.name,
      })

      res.status(200).json({
        access_token: access_token,
        id: shop.id,
        email: shop.email,
        name: shop.name,
      })
    } catch (err) {
      next(err)
    }
  }

  static async findOne(req, res, next) {
    try {
      const { id } = req.params
      const shop = await Shop.findByPk(id)
      if (!shop) throw { statusCode: 404, msg: 'shop not found' }
      res.status(200).json({
        id: shop.id,
        email: shop.email,
        name: shop.name,
        address: shop.address,
        phone: shop.phone,
        description: shop.description,
        icon_url: shop.icon_url,
      })
    } catch (err) {
      console.log(err)
      next(err)
    }
  }
}

module.exports = ShopController
