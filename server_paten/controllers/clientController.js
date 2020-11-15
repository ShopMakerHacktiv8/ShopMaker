const generateManifest = require('../helpers/manifest')
const midtransClient = require('midtrans-client')
const { Shop } = require('../models')

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
      const { name, phone, address, total } = req.body
      // Create Snap API instance
      const { id } = req.params
      console.log(id)
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
