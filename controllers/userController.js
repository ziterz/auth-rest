const { User } = require("../models");
const { decryptPassword } = require("../helpers/bcrypt");
const { generateToken } = require("../helpers/jwt");

class UserController {
  static signup(req, res) {
    let payload = {
      email: req.body.email,
      password: req.body.password
    };
    User.create(payload)
      .then(result => {
        let user = {
          id: result.id,
          email: result.email
        };
        let token = generateToken(user);
        res.status(201).json({
          id: user.id,
          email: user.email,
          access_token: token
        });
      })
      .catch(err => {
        res.status(500).json(err);
      });
  }

  static signin(req, res) {
    let payload = {
      email: req.body.email,
      password: req.body.password
    };
    User.findOne({
      where: {
        email: payload.email
      }
    })
      .then(result => {
        if (result) {
          let compare = decryptPassword(payload.password, result.password);
          if (compare) {
            let user = {
              id: result.id,
              email: result.email
            };
            let token = generateToken(user);
            res.status(200).json({
              id: user.id,
              email: user.email,
              access_token: token
            });
          } else {
            res.status(400).json({
              type: "Bad Request",
              msg: "Invalid email/password"
            });
          }
        } else {
          res.status(400).json({
            type: "Bad Request",
            msg: "Invalid email/password"
          });
        }
      })
      .catch(err => {
        res.status(500).json({
          type: "InternalServerError",
          msg: err
        });
      });
  }
}

module.exports = UserController;
