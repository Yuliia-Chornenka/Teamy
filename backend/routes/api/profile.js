const router = require("express").Router();
const User = require("../../models/User");
const upload = require("../middleware/file-upload");
const auth = require("../middleware/auth");
const multer = require("multer");
const bcrypt = require("bcryptjs");

router.get("/profile", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id, (error) => {
      if (error) {
        return res.status(500).json({ message: "Failed to find a user" });
      }
    });
    await res.json(user);
  } catch (e) {
    res.status(500).json({
      message: "Something went wrong. Try again later.",
      error: e,
    });
  }
});

/*  Change avatar  */
router.patch("/profile", auth, async (req, res) => {
  try {
    await upload(req, res, function (err) {
      const imgUrl = `https://teamy.s3.amazonaws.com/${req.file}`;

      if (err instanceof multer.MulterError) {
        res.status(413).json("File size must not exceed 1 megabyte");
      } else {
        User.findByIdAndUpdate(
          req.user._id,
          { photo: imgUrl },
          { new: true },
          (error) => {
            if (error) {
              return res.status(500).json({ message: "Failed to update" });
            }
          }
        );
        res.send({ image: imgUrl });
      }
    });
  } catch (e) {
    res.status(500).json({
      message: "Something went wrong. Try again later",
      error: e,
    });
  }
});

router.put("/profile/project-mentor", auth, async (req, res) => {
  try {
    const project = {
      _id: req.body._id,
      title: req.body.title,
      deadline: req.body.deadline,
      role: "mentor",
    };

    const user = await User.findById(req.user._id, (error) => {
      if (error) {
        return res.status(500).json({ message: "Failed to find a user" });
      }
    });

    user.projects.mentor.push(project);

    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      user,
      { new: true },
      (error) => {
        if (error) {
          return res.status(500).json({ message: "Failed to update" });
        }
      }
    );
    await res.json(updatedUser);
  } catch (e) {
    res.status(500).json({
      message: "Something went wrong. Try again later.",
      error: e,
    });
  }
});

router.put("/profile/project-member", auth, async (req, res) => {
  try {
    const project = {
      _id: req.body._id,
      title: req.body.title,
      deadline: req.body.deadline,
      role: "member",
    };
    
    const user = await User.findById(req.user._id, (error) => {
      if (error) {
        return res.status(500).json({ message: "Failed to find a user" });
      }
    });

    user.projects.member.push(project);

    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      user,
      { new: true },
      (error) => {
        if (error) {
          return res.status(500).json({ message: "Failed to update" });
        }
      }
    );
    await res.json(updatedUser);
  } catch (e) {
    res.status(500).json({
      message: "Something went wrong. Try again later.",
      error: e,
    });
  }
});

router.delete("/profile", auth, async (req, res) => {
  try {
    let user = await User.findById(req.user._id);
    if (!user) return res.status(404).json("USER not found");

    await User.findByIdAndDelete(req.user._id, (error) => {
      if (error) {
        return res.status(500).json({ message: "Failed to delete" });
      }
    });
    await res.json("Successfully delete a user");
  } catch (e) {
    res.status(500).json({
      message: "Something went wrong. Try again later",
      error: e,
    });
  }
});

router.put("/profile/change-password", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json("USER not found");

    let { password, newPassword, newPasswordConfirmation } = req.body;
    if (password && newPassword && newPasswordConfirmation) {
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        await res.status(401).json({ message: "Invalid password" });
      }

      if (newPassword !== newPasswordConfirmation) {
        await res.json({ message: "Passwords does not match" });
      }

      const salt = await bcrypt.genSalt(10);
      newPassword = await bcrypt.hash(newPassword, salt);

      const updatedUser = await User.findByIdAndUpdate(
        req.user._id,
        {
          ...req.body,
          password: newPassword,
        },
        { new: true }
      );
      await res.json({ user: updatedUser, logout: true });
    } else {
      if (password || !password.length) {
        delete req.body.password;
      }

      const updatedUser = await User.findByIdAndUpdate(req.user._id, req.body, {
        new: true,
      });
      await res.json({ user: updatedUser, logout: false });
    }
  } catch (e) {
    res.status(500).json({
      message: "Something went wrong. Try again later",
      error: e,
    });
  }
});

module.exports = router;
