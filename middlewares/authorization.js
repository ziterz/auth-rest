const { Book } = require('../models')

function authorization(req, res, next) {
  Book.findOne({
    where: {
      id: req.params.id
    }
  })
    .then(result => {
      if (result) {
        if (result.UserId == req.currentUserId) {
          return next();
        } else {
          return res.status(401).json({
            name: "Unauthorized",
            errors: [{ message: "User not authorized" }]
          });
        }
      } else {
        return res.status(404).json({
          name: "NotFound",
          errors: [{ message: "User not found" }]
        });
      }
    })
    .catch(err => {
      return res.status(500).json({
        name: "InternalServerError",
        errors: [{ message: err }]
      });
    })
}

module.exports = authorization