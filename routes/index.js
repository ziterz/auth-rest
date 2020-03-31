const express = require("express");
const router = express.Router();
const userRoute = require("./userRoute");
const bookRoute = require("./bookRoute");

router.use("/", userRoute);
router.use("/book", bookRoute);

module.exports = router;
