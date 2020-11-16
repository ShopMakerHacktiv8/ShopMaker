const { Cart, Product } = require('../models')


class CartController {
  static async read(req, res, next) {
    try {
      const {shop_id} = req.params
      const transaction = await Cart.findAll({
        where : {
          shop_id : shop_id
        },
        include: [
          Product
        ]
      })
      res.status(200).json(transaction)
    } catch (err) {
      next(err)
    }
  }
}

module.exports = CartController
