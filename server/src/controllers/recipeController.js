const { Recipe } = require("../models/recipeModal");
const { User } = require("../models/usersModal");

exports.getAllRecipe = async (req, res) => {
  try {
    // const result = await RecipesModel.find({});
    let query = Recipe.find({});
    const recipe = await query;
    // res.status(200).json({
    //   message: "success",
    //   data: {
    //     recipe: recipe,
    //   },
    res.status(200).json({ recipe });
  } catch (err) {
    console.log(err);
  }
};

exports.addRecipe = async (req, res) => {
  const recipe = new Recipe(req.body);
  try {
    const response = await recipe.save();
    res.json(response);
  } catch (err) {
    console.log(err);
  }
};
exports.saveRecipe = async (req, res) => {
  const recipe = await Recipe.findById(req.body.recipeID);
  const user = await User.findById(req.body.userID);
  try {
    user.savedRecipes.push(recipe);
    await user.save();
    res.status(201).json({ savedRecipes: user.savedRecipes });
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.getSavedRecipe = async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.userID);
    res.status(201).json({ savedRecipes: user?.savedRecipes });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};
exports.getSavedIdRecipe = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    const savedRecipes = await Recipe.find({
      _id: { $in: user.savedRecipes },
    });

    console.log(savedRecipes);
    res.status(201).json({ savedRecipes });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};
