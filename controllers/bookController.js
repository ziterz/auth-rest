const { Book } = require('../models/index')

class bookController {

  static create(req, res) {
    let payload = {
      name: req.body.name,
      UserId: req.currentUserId
    }
    Book.create(payload)
      .then(result => {
        return res.status(201).json({
          msg: "Book is successfully created",
          book: result
        })
      })
      .catch(err => {
        return res.status(500).json({
          name: "InternalServerError",
          errors: [{ message: err }]
        });
      })
  }

  static findAll (req,res) {
    let UserId = req.currentUserId;
    Book.findAll({
      where: {
        UserId
      }
    })
      .then(result => {
        return res.status(200).json({
          book: result
        })
      })
      .catch(err => {
        return res.status(500).json({
          name: "InternalServerError",
          errors: [{ message: err }]
        });
      })
  }

  static findOne (req,res) {

  }

  static update (req,res) {

  }

  static delete (req,res) {
    Book.destroy({
      where: {
        id: req.params.id
      }
    })
      .then(result => {
        return res.status(200).json({
          msg:  "Book is successfully deleted"
        })
      })
      .catch(err => {
        return res.status(500).json({
          name: "InternalServerError",
          errors: [{ message: err }]
        });
      })
  }
}

module.exports = bookController