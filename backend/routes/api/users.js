const router = require("express").Router();
const User = require("../../models/User");
const auth = require("../middleware/auth");

router.get("/users", auth, async (req, res) => {
  try {
    const users = await User.find({}, (error) => {
      if (error) {
        return res.status(500).json({ message: "Failed to find a users" });
      }
    });

    // _id: ed66bf1f9409f0017c8fb28
    // name:"Ivan"
    // email:"davane4ek@gmail.com"
    // photo:"https://teamy.s3.amazonaws.com/15911189851838069da92-96a5-4ad6-bb93-6b..."
    const formatedUsersData = users.map((user) => {
      return {
        _id: user._id,
        name: user.name,
        email: user.email,
        photo: user.photo,
      };
    });

    await res.json(formatedUsersData);
  } catch (e) {
    res.status(500).json({
      message: "Something went wrong. Try again later.",
      error: e,
    });
  }
});

router.get("/users/:userId", auth, async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId, (error) => {
      if (error) {
        return res.status(500).json({ message: "Failed to find a user" });
      }
      return;
    });
    await res.json(user);
  } catch (e) {
    res.status(500).json({
      message: "Something went wrong. Try again later.",
      error: e,
    });
  }
});

module.exports = router;
