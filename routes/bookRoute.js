const express = require("express");
const router = express.Router();
const bookController = require("../controllers/bookController");
const authentication = require('../middlewares/authentication')
const authorization = require('../middlewares/authorization')

router.use(authentication)
router.post("/", bookController.create);
router.get("/", bookController.findAll);
router.get("/:id", bookController.findOne);
router.put("/", bookController.update);
router.delete("/:id", authorization, bookController.delete);

module.exports = router;
