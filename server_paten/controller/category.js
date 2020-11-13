const {Category} = require('../models')

class Controller {
    static read(req,res,next) {
        Category.findAll()
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            console.log(err);
            next(err)
        })
    }

    static readId(req,res,next) {
        Category.findOne({
            where : {
                shop_id : req.params.id
            }
        })
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            next(err)
            console.log(err);
        })
    }

    static add (req,res,next) {
        Category.create(req.body)
        .then(data => {
            res.status(201).json(data)
        })
        .catch(err => {
            next(err)
        })
    }

    static edit (req,res,next) {
        Category.update(req.body, {
            where : {
                id : req.params.id
            },
            returning : true
        })
        .then(data => {
            res.status(200).json(data[1][0])
        })
        .catch(err => {
            next(err)
        })
    }

    static delete (req,res,next) {
        Category.destroy({
            where : {
                id : req.params.id
            }
        })
        .then(data => {
            res.status(200).json(`Category success to delete`)
        })
        .catch(err => {
            next(err)
        })
    }
}

module.exports = Controller