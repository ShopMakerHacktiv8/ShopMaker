const { Product, Category } = require('../models')

class ProductController {
  static createProduct(req, res, next) {
    // try {
    //   const { shop_id, category_id, name, image_url, price, stock, description } = req.body
    //   const productObj = { shop_id, category_id, name, image_url, price, stock, description }
    //   console.log(productObj, '<=== product obj')
    //   const newProduct = await Product.create({ productObj })
    //   console.log(newProduct, '<=== new product')

    //   res.status(201).json({
    //     id: newProduct.id,
    //     shop_id: newProduct.shop_id,
    //     category_id: newProduct.category_id,
    //     name: newProduct.name,
    //     image_url: newProduct.image_url,
    //     price: newProduct.price,
    //     stock: newProduct.stock,
    //     description: newProduct.description
    //   });
            
    // } catch (err) {
    //   console.log(err, '<==== error create product at controller')
    //   next(err)
    // }
    const { shop_id, category_id, name, image_url, price, stock, description } = req.body
    // console.log(req.body, '<=== req.body at create controller')

    Product.create({
      shop_id, category_id, name, image_url, price, stock, description
    })
      .then(product => {
        // console.log(product, '<=== create product di controller')
        res.status(201).json({
          id: product.id,
          shop_id: product.shop_id,
          category_id: product.category_id,
          name: product.name,
          image_url: product.image_url,
          price: product.price,
          stock: product.stock,
          description: product.description
        })
      })
      .catch(err => {
        console.log(err, '<==== error create product di controller')
        next(err)
      })
  }

  static async getProduct(req, res, next) {
    try {
      const { category_id } = req.query
      let products = []
      if (category_id) {
        products = await Product.findAll({
          order: [["id", "DESC"]],
          where: { category_id },
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
      console.log(err, '<=== error get all product at controller')
      next(err)
    }
  }

  static async getProductById(req, res, next) {
    try {
      const { id } = req.params
      const product = await Product.findByPk(id)
      if (!product) throw { msg: 'product not found!', statusCode: 404}

      res.status(200).json(product)      
    } catch (err) {
      console.log(err, '<=== error get by id product at controller')
      next(err)
    }
  }

  static async deleteProduct(req, res, next) {
    try {
      const { id } = req.params
      const product = await Product.findByPk(id)
      if (!product) throw { msg: 'product not found!', statusCode: 404}

      product.destroy()
      res.status(200).json({
        message: 'delete product success'
      })
    } catch (err) {
      console.log(err, '<=== error at delete product controller')
      next(err)
    }
  }

  static updateProduct(req, res, next) {
    const { id } = req.params
    Product.findByPk(id)
      .then(product => {
        console.log(product, '<=== product at update controller')
        if (!product) throw { err: 'product nor found', statusCode: 404} 
        return product.update({
          ...product,
          ...req.body
        })
      })
      .then(product => {
        console.log(product, '<=== berhasil update di controller product')
        res.status(200).json(product)
      })
      .catch(err => {
        console.log(err, '<=== error update di product controller')
        next(err)
      })
  }

  // static async updateProduct(req, res, next) {
  //   try {
  //     const { id } = req.params
  //     const { name, image_url, price, stock, description, category_id } = req.body
  //     let product = await Product.findByPk(id)
  //     if (!product) throw { msg: 'product not found!', statusCode: 404}

  //     product.name = name
  //     product.image_url = image_url
  //     product.price = price
  //     product.stock = stock
  //     product.description = description
  //     product.category_id = category_id || null;

  //     await Product.save()

  //     res.status(200).json({
  //       id: product.id,
  //       name: product.name,
  //       image_url: product.image_url,
  //       price: product.price,
  //       stock: product.stock,
  //       description: product.description,
  //       category_id: product.category_id
  //     })

  //   } catch (err) {
  //     console.log(err, '<=== error update product at controller')
  //     next(err)
  //   }
  // }
}

module.exports = ProductController