const { User } = require("../models/usersModal");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

exports.putDummyData = async (req, res) => {
  console.log(req.body);
  try {
    const { username, password } = req.body;
    const newUser = new User({ username, password });
    await newUser.save();
    console.log(newUser);
    res.status(200).json({
      message: "success",
      data: {
        newUser,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: `${err}`,
    });
  }
};
exports.registerEndPoints = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (user) {
      return res.json({ message: "User already exist plz Login" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();
    res.json({ message: "User Registered successfully" });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: `${err}`,
    });
  }
};
exports.loginEndPoints = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.json({ message: "Username does't exist" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    console.log(isPasswordValid);
    if (!isPasswordValid) {
      return res
        .status(400)
        .json({ message: "Username or password is incorrect" });
    }
    const token = jwt.sign({ id: user._id }, "secret");
    // const token = ...: The resulting JWT is assigned to the token variable. This token can be sent back to the client and used for authentication or authorization purposes.
    res.json({ token, userID: user._id });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: `${err}`,
    });
  }
};
exports.getAllUsers = async (req, res) => {
  try {
    let query = User.find();
    // console.log(query);
    const user = await query;
    res.status(200).json({
      data: {
        user,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: "failed to load the data",
    });
  }
};
