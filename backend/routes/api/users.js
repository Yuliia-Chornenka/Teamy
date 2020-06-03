const router = require("express").Router();
const User = require("../../models/User");
const auth = require('../middleware/auth');


router.get('/users', auth, async (req, res) => {
  try {
    const users = await User.find({}, (error) => {
      if (error) {
        return res.status(500).json({ message: "Failed to find a users" });
      }
    });
    await res.json(users);
  } catch (e) {
    res.status(500).json({
      message: 'Something went wrong. Try again later.',
      error: e,
    });
  }
});


router.get('/users/:userId', auth, async (req, res) => {
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
      message: 'Something went wrong. Try again later.',
      error: e,
    });
  }
});



module.exports = router;
