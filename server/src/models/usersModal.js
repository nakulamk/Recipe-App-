const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  savedRecipes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Recipe" }],
});

const User = mongoose.model("User", userSchema);
module.exports = { User };

// const testUser = new User({
//   userName: test1,
//   password: testPass,
// });
// testUser
//   .save()
//   .then((savedUser) => {
//     console.log(savedUser);
//   })
//   .catch((err) => {
//     console.log(err);
//   });
