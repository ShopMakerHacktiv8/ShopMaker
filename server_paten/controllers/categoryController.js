const { Category } = require('../models')

class Controller {
  static async read(req, res, next) {
    try {
      const { shop_id } = req.body
      let categories = await Category.findAll({
        where: {
          shop_id
        }
      })

      categories = categories.map(category => {
        return {
          id: category.id, name: category.name, shop_id: category.shop_id
        }
      })
      res.status(200).json(categories)
    } catch (error) {
      next(error)
    }
  }


  static async add(req, res, next) {
    try {
      const { id } = req.shopData
      const { name } = req.body
      const categoryObj = { shop_id: id, name }
      const category = await Category.create(categoryObj)
      res.status(201).json({ id: category.id, name: category.name, shop_id: category.shop_id })
    } catch (error) {
      next(error)
    }
  }

  static async delete(req, res, next) {
    try {
      const {id} = req.params
      let category = await Category.findByPk(id) 
      if (!category) {
        throw {statusCode : 404, msg : "category not found"}
      }
      await category.destroy()
      res.status(200).json({ message: `delete category success` })
    } catch (error) {
      next(error)
    }
  }
}


module.exports = Controller