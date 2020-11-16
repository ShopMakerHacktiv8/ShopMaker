// const { Cart } = require('../models')

// class CartController {
//   static async read(req, res, next) {
//     try {
//       const {shopid} = req.params
//       const transaction = await Cart.findAll({
//         where : {
//           status : true
//         }
//       })
//       res.status(200).json(transaction)
//     } catch (err) {
//       console.log(err)
//       next(err)
//     }
//   }
// }

// module.exports = CartController
