const router = require("express").Router();
const Project = require("../../models/Project");
const auth = require("../middleware/auth");
const sendEmail = require("../../nodemailer/send-email");
const User = require("../../models/User");

router.post("/create", auth, async (req, res) => {
  const newProject = new Project({
    ...req.body,
    created_by: req.user._id,
  });

  try {
    await newProject.save();
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(newProject));
  } catch (err) {
    res.writeHead(400, { "Content-Type": "application/json" });
    res.end(JSON.stringify(err));
  }
});

router.get("/:projectId", auth, async (req, res) => {
  const { projectId } = req.params;

  const project = await Project.findById(projectId, (err, doc) => {
    if (err) {
      res.writeHead(400, { "Content-Type": "application/json" });

      res.end(JSON.stringify(err));
    }
  });

  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify(project));
});

router.patch("/members/:projectId", auth, async (req, res) => {
  const isRequestBodyEmpty =
    Object.keys(req.body).length === 0 && req.body.constructor === Object;

  if (isRequestBodyEmpty) {
    try {
      const { _id, name, email, photo } = req.user;

      const project = await Project.findById(req.params.projectId, (error) => {
        if (error) {
          return res.status(500).json({ message: "Failed to find a project" });
        }
      });

      const isCreator = project.created_by === _id;

      if (isCreator) {
        return res
          .status(500)
          .json({ message: "You are creator of this project" });
      }

      const isMemberExist = project.members.some(
        (member) => member._id === _id
      );

      if (isMemberExist) {
        return res
          .status(500)
          .json({ message: "You are already a member of this project" });
      }

      const isMentorExist = project.mentors.some(
        (mentor) => mentor._id === _id
      );

      if (isMentorExist) {
        return res
          .status(500)
          .json({ message: "You are already a mentor of this project" });
      }

      project.members.push({ _id, name, email, photo });

      const updatedProject = await Project.findByIdAndUpdate(
        req.params.projectId,
        project,
        { new: true },
        (error) => {
          if (error) {
            return res.status(500).json({ message: "Failed to update" });
          }
        }
      );

      await res.json(updatedProject);
    } catch (e) {
      res.status(500).json({
        message: "Something went wrong. Try again later.",
        error: e,
      });
    }
  } else {
    try {
      const { _id, name, email, photo } = req.body;

      const project = await Project.findById(req.params.projectId, (error) => {
        if (error) {
          return res.status(500).json({ message: "Failed to find a project" });
        }
      });

      const isCreator = project.created_by === _id;

      if (isCreator) {
        return res
          .status(500)
          .json({ message: "User is creator of this project" });
      }

      const isMemberExist = project.members.some(
        (member) => member._id === _id
      );

      if (isMemberExist) {
        return res
          .status(500)
          .json({ message: "User is already a member of this project" });
      }

      const isMentorExist = project.mentors.some(
        (mentor) => mentor._id === _id
      );

      if (isMentorExist) {
        return res
          .status(500)
          .json({ message: "User is already a mentor of this project" });
      }

      project.members.push({ _id, name, email, photo });

      const updatedProject = await Project.findByIdAndUpdate(
        req.params.projectId,
        project,
        { new: true },
        (error) => {
          if (error) {
            return res.status(500).json({ message: "Failed to update" });
          }
        }
      );

      try {
        const user = await User.findById(_id, (error) => {
          if (error) {
            return res
              .status(500)
              .json({ message: "Failed to find a project" });
          }
        });

        const projectWithRole = {
          _id: project._id.toString(),
          title: project.title,
          deadline: project.deadline,
          role: "member",
        };

        user.projects.member.push(projectWithRole);

        await User.findByIdAndUpdate(_id, user, { new: true }, (error) => {
          if (error) {
            return res.status(500).json({ message: "Failed to update" });
          }
        });
      } catch (e) {
        return res.status(500).json({
          message: "Something went wrong. Try again later.",
          error: e,
        });
      }

      await res.json(updatedProject);
    } catch (e) {
      res.status(500).json({
        message: "Something went wrong. Try again later.",
        error: e,
      });
    }
  }
});

router.patch("/mentors/:projectId", auth, async (req, res) => {
  const { _id, name, photo, email } = req.body;

  try {
    const project = await Project.findById(req.params.projectId, (error) => {
      if (error) {
        return res.status(500).json({ message: "Failed to find a project" });
      }
    });

    const isCreator = project.created_by === _id;

    if (isCreator) {
      return res
        .status(500)
        .json({ message: "User is a creator of this project" });
    }

    const isMentorExist = project.mentors.some((mentor) => mentor._id === _id);

    if (isMentorExist) {
      return res
        .status(500)
        .json({ message: "User is mentor of this project" });
    }

    const isMemberExist = project.members.some((member) => member._id === _id);

    if (isMemberExist) {
      return res
        .status(500)
        .json({ message: "User is member of this project" });
    }

    project.mentors.push({ _id, name, photo, email });

    const updatedProject = await Project.findByIdAndUpdate(
      req.params.projectId,
      project,
      { new: true },
      (error) => {
        if (error) {
          return res.status(500).json({ message: "Failed to update" });
        }
      }
    );

    try {
      const user = await User.findById(_id, (error) => {
        if (error) {
          return res.status(500).json({ message: "Failed to find a project" });
        }
      });

      const projectWithRole = {
        _id: project._id.toString(),
        title: project.title,
        deadline: project.deadline,
        role: "mentor",
      };

      user.projects.mentor.push(projectWithRole);

      await User.findByIdAndUpdate(_id, user, { new: true }, (error) => {
        if (error) {
          return res.status(500).json({ message: "Failed to update" });
        }
      });
    } catch (e) {
      return res.status(500).json({
        message: "Something went wrong. Try again later.",
        error: e,
      });
    }

    await res.json(updatedProject);
    return;
  } catch (e) {
    return res.status(500).json({
      message: "Something went wrong. Try again later.",
      error: e,
    });
  }
});

router.post("/send-email", auth, async (req, res) => {
  try {
    const {userEmail, userName, projectTitle, projectId, teamId} = req.body;

    const mailResult = sendEmail(userEmail, userName, projectTitle, projectId, teamId);

    await mailResult.then((result) => {
      if (result === "Success") {
        return res.status(200).json({ status: "The email has been sent." });
      } else {
        return res
          .status(500)
          .json({ status: "Something went wrong. Try again" });
      }
    });
  } catch (e) {
    res.status(500).json({ status: "Something went wrong. Try again" });
  }
});

router.delete("/:projectId", auth, async (req, res) => {
  const { projectId } = req.params;

  const removedProject = await Project.findByIdAndRemove(
    projectId,
    async (err, doc) => {
      if (err) {
        return res.status(500).json({ message: "Failed to delete" });
      }
    }
  );

  const users = await User.find({}, (error) => {
    if (error) {
      return res.status(500).json({ message: "Failed to find a users" });
    }
  });

  const usersWithProjectInMentor = [];
  const usersWithProjectInMember = [];

  users.forEach((user) => {
    const isProjectInMentor = user.projects.mentor.some(
      (project) => project._id === projectId
    );

    if (isProjectInMentor) {
      usersWithProjectInMentor.push(user);
    }

    const isProjectInMember = user.projects.member.some(
      (project) => project._id === projectId
    );

    if (isProjectInMember) {
      usersWithProjectInMember.push(user);
    }
  });

  if (usersWithProjectInMentor.length !== 0) {
    usersWithProjectInMentor.forEach(async (user) => {
      user.projects.mentor = user.projects.mentor.filter(
        (project) => project._id !== projectId
      );

      await User.findByIdAndUpdate(user._id, user, { new: true }, (error) => {
        if (error) {
          return res.status(500).json({ message: "Failed to update" });
        }
      });
    });
  }

  if (usersWithProjectInMember.length !== 0) {
    usersWithProjectInMember.forEach(async (user) => {
      user.projects.member = user.projects.member.filter(
        (project) => project._id !== projectId
      );

      await User.findByIdAndUpdate(user._id, user, { new: true }, (error) => {
        if (error) {
          return res.status(500).json({ message: "Failed to update" });
        }
      });
    });
  }

  res.json({
    message: `Project ${projectId} has been removed successfully`,
    removedProject,
  });
  return;
});

module.exports = router;
