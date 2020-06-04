const router = require("express").Router();
const User = require("../../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.post("/register", async (req, res) => {
  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist) return res.status(400).send("Email is already exist");

  //hash pass
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
    photo: "",
  });
  try {
    await user.save();
    res.send({ user: user._id });
  } catch (err) {
    res.status(400).send(err);
  }
});

router.get("/register", (req, res) => {
  res.send("REGISTER");
});

//LOGIN

router.post("/login", async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Email is not found");

  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) return res.status(401).send("Invalid password");

  //Token

  const obj = {
    _id: user._id,
    dates: user.dates,
    name: user.name,
    email: user.email,
    photo: user.photo,
  };

  const token = jwt.sign(obj, process.env.TOKEN_SECRET);

  res.header("authorization", token).send(JSON.stringify({ token }));
});

router.post("/login/fb", async (req, res) => {
  const existedUser = await User.findOne({ email: req.body.email });

  if (existedUser) {
    const obj = {
      _id: existedUser._id,
      dates: existedUser.dates,
      name: existedUser.name,
      email: existedUser.email,
      photo: existedUser.photo,
    };

    const token = jwt.sign(obj, process.env.TOKEN_SECRET);

    try {
      res.header("authorization", token).send(JSON.stringify({ token }));
      return;
    } catch (err) {
      res.status(400).send(err);
      return;
    }
  }

  const user = new User({
    name: req.body.name,
    email: req.body.email,
    photo: req.body.photo,
  });

  // Token

  const obj = {
    _id: user._id,
    dates: user.dates,
    name: user.name,
    email: user.email,
    photo: user.photo,
  };

  const token = jwt.sign(obj, process.env.TOKEN_SECRET);

  try {
    await user.save();
    res.header("authorization", token).send(JSON.stringify({ token }));
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;
