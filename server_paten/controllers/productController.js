const { Product, Category } = require('../models')
const midtransClient = require('midtrans-client');

class ProductController {
  static async createProduct(req, res, next) {
    try {
      const { category_id, name, price, stock, description, file } = req.body
      const productObj = { shop_id: req.shopData.id, category_id, name, image_url: file, price, stock, description }
      const newProduct = await Product.create(productObj)

      res.status(201).json({
        id: newProduct.id,
        shop_id: newProduct.shop_id,
        category_id: newProduct.category_id,
        name: newProduct.name,
        image_url: newProduct.image_url,
        price: newProduct.price,
        stock: newProduct.stock,
        description: newProduct.description
      });

    } catch (err) {
      next(err)
    }
  }

  static async getProduct(req, res, next) {
    try {
      const { category_id } = req.query
      const { shop_id } = req.body
      let products = []
      if (category_id) {
        products = await Product.findAll({
          order: [["id", "DESC"]],
          where: { category_id, shop_id },
          include: {
            model: Category,
            attributes: {
              exclude: ["createdAt", "updatedAt"]
            }
          }
        })
      } else {
        products = await Product.findAll({
          order: [["id", "DESC"]],
          where: { shop_id },
          include: {
            model: Category,
            attributes: {
              exclude: ["createdAt", "updatedAt"]
            }
          }
        });
      }
      products = products.map(product => {
        return {
          id: product.id,
          name: product.name,
          image_url: product.image_url,
          price: product.price,
          stock: product.stock,
          description: product.description,
          category_id: product.category_id,
          category: product.Category
        }
      });
      res.status(200).json(products)
    } catch (err) {
      next(err)
    }
  }

  static async getProductById(req, res, next) {
    try {
      const { id } = req.params
      const product = await Product.findByPk(id)
      if (!product) throw { msg: 'product not found', statusCode: 404 }

      res.status(200).json(product)
    } catch (err) {
      next(err)
    }
  }

  static async deleteProduct(req, res, next) {
    try {
      const { id } = req.params
      const product = await Product.findByPk(id)
      if (!product) throw { msg: 'product not found', statusCode: 404 }

      product.destroy()
      res.status(200).json({
        message: 'delete product success'
      })
    } catch (err) {
      next(err)
    }
  }

  static async updateProduct(req, res, next) {
    try {
      const { id } = req.params
      const { name, price, stock, description, category_id, file } = req.body
      let product = await Product.findByPk(id)
      if (!product) throw { msg: 'product not found', statusCode: 404 }

      product.name = name
      product.image_url = file
      product.price = +price
      product.stock = +stock
      product.description = description
      product.category_id = category_id || null;

      await product.save()

      res.status(200).json({
        id: product.id,
        name: product.name,
        image_url: product.image_url,
        price: product.price,
        stock: product.stock,
        description: product.description,
        category_id: product.category_id
      })

    } catch (err) {
      next(err)
    }
  }

  static async buyProduct(req, res, next) {
    try {
      const {name, phone, address, city, postal_code, total} = req.body
      // Create Snap API instance
      let snap = new midtransClient.Snap({
        // Set to true if you want Production Environment (accept real transaction).
        isProduction: false,
        serverKey: 'SB-Mid-server-2ORv2ckTLMc46xFlfdi9liX5'
      })

      let parameter = {
        "transaction_details": {
          "order_id":  "order-csb-" + Math.round(new Date().getTime() / 1000),
          "gross_amount": total
        },
        "credit_card": {
          "secure": true
        },
        "customer_details": {
          "first_name": name,
          "phone": phone,
          "shipping_address": {
            "address": address,
            "city": city,
            "postal_code": postal_code
          }
        }
      };

    const transaction = await snap.createTransaction(parameter)
          let transactionToken = transaction.token;
          res.status(201).json({token : transactionToken})
    } catch (err) {
      console.log(err, "<<<<<<<<ERRORRR MIDTRANS!!!!")
      next(err)
    }
  }
}

module.exports = ProductController