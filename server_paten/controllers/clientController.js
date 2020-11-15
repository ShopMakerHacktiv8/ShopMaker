const generateManifest = require('../helpers/manifest')
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
}

module.exports = ClientController
