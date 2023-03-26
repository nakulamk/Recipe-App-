const express = require("express");
const userController = require("../controllers/userController");

const router = express.Router();

router.route("/putData").post(userController.putDummyData);
router.route("/getData").get(userController.getAllUsers);
router.route("/register").post(userController.registerEndPoints);

router.route("/login").post(userController.loginEndPoints);

module.exports = router;
