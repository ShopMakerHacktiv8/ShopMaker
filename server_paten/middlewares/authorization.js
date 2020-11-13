const Category = require('../controllers/categoryController');

class Authorization {
  static async category(req, res, next) {
    try {
      let { id } = req.params;
      const category = await Category.findByPk(id);
      if (!cart) throw { msg: "cart not found", statusCode: 404 };
      if (cart.user_id !== req.userData.id)
        throw { name: "AuthorizationFailed" };
      next();
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
}