const express = require("express");
const router = express.Router()
const path = require("path")
const { getAllRestaurants, viewRestaurant, addRestaurant, updateRestaurant, deleteRestaurant } = require("../controllers/restaurantController");
const login = require("../controllers/usersController");
// private route
router.route("/restaurants").get(getAllRestaurants)
router.route("/single-restaurant/:id").get(viewRestaurant)
router.route("/add-restaurant").post(addRestaurant)
router.route("/update-restaurant/:id").put(updateRestaurant)
router.route("/delete-restaurant/:id").delete(deleteRestaurant)
// auth route
router.route("/login").get(login)
module.exports = router