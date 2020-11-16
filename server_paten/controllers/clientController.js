const generateManifest = require('../helpers/manifest')
const midtransClient = require('midtrans-client')
const { Shop, Cart, Product } = require('../models')

class ClientController {
  static async getManifest(req, res, next) {
    try {
      const { id } = req.params
      console.log(id)
      const shop = await Shop.findByPk(id)
      if (!shop) {
        throw { statusCode: 404, msg: 'shop not found' }
      }
      const manifest = generateManifest(shop.id, shop.name, shop.icon_url)
      res.json(manifest)
    } catch (err) {
      next(err)
    }
  }

  static async buyProduct(req, res, next) {
    try {
      console.log('AHAAAAAAAAAAADSDCSCDSCD')
      const { name, phone, address, total, product_id, quantity } = req.body
      // Create Snap API instance
      const { id } = req.params

      const cartObj = {
        user_name: name,
        user_phone: phone,
        user_address: address,
        product_id: product_id,
        quantity: quantity,
        shop_id: id,
      }

      const product = await Product.findByPk(product_id)

      if (!product) throw { statusCode: 404, msg: 'product not found' }

      if (quantity > product.stock)
        throw { statusCode: 400, msg: 'stock not available' }

      product.stock = product.stock - quantity
      product.save()

      await Cart.create(cartObj)

      let snap = new midtransClient.Snap({
        // Set to true if you want Production Environment (accept real transaction).
        isProduction: false,
        serverKey: 'SB-Mid-server-2ORv2ckTLMc46xFlfdi9liX5',
      })

      let parameter = {
        transaction_details: {
          order_id: 'order-csb-' + Math.round(new Date().getTime() / 1000),
          gross_amount: total,
        },
        credit_card: {
          secure: true,
        },
        customer_details: {
          first_name: name,
          phone: phone,
          shipping_address: {
            address: address,
          },
        },
        callbacks: {
          finish: `https://shopmaker-pwa.web.app/${id}/shop`,
        },
      }

      const transaction = await snap.createTransaction(parameter)

      let transactionToken = transaction.token

      res.status(201).json({ token: transactionToken })
    } catch (err) {
      console.log(err, '<<<<<<<<ERRORRR MIDTRANS!!!!')
      next(err)
    }
  }
}

module.exports = ClientController
