const express = require("express");
const recipeController = require("../controllers/recipeController");
const router = express.Router();

router.get("/getAllRecipe", recipeController.getAllRecipe);
router.post("/", recipeController.addRecipe);
router.put("/", recipeController.saveRecipe);
router.get("/savedRecipes/ids/:userID", recipeController.getSavedIdRecipe);
router.get("/savedRecipes", recipeController.getSavedRecipe);

module.exports = router;
