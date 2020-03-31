const { verify } = require("../helpers/jwt");
const { User } = require("../models");

function authentication(req, res, next) {
  try {
    let decoded = verify(req.headers.access_token);
    User.findOne({
      where: {
        id: decoded.id
      }
    })
      .then(result => {
        if (result) {
          req.currentUserId = result.id;
          return next();
        } else {
          return res.status(404).json({
            name: "NotFound",
            errors: [{ message: "User not found" }]
          });
        }
      })
      .catch(err => {
        return res.status(401).json({
          name: "Unauthorized",
          errors: [{ message: "User unauthenticated" }]
        });
      })
  } catch(err) {
    return res.status(500).json({
      name: "InternalServerError",
      errors: [{ message: err }]
    });
  }
}

module.exports = authentication