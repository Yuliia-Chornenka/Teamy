const router = require("express").Router();
const Project = require("../../models/Project");
const auth = require("../middleware/auth");
const sendEmail = require('../../nodemailer/send-email');

router.post("/create", auth, async (req, res) => {
  const newProject = new Project({
    ...req.body,
    created_by: req.user._id,
  });

  try {
    await newProject.save();
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        _id: newProject._id,
        title: newProject.title,
        deadline: newProject.deadline,
      })
    );
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

router.patch("/:projectId", auth, async (req, res) => {
  try {
    const memberId = req.user._id;

    const project = await Project.findById(req.params.projectId, (error) => {
      if (error) {
        return res.status(500).json({ message: "Failed to find a project" });
      }
    });

    const isMemberExist = project.members.some(
      (member) => member.id === req.user._id
    );

    if (isMemberExist) {
      return res
        .status(500)
        .json({ message: "You are already a member of this project" });
    }

    project.members.push({ id: memberId, name: req.user.name });

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
});

router.post('/send-email', auth, async (req, res) => {
    try {
      const email = req.user.email;
      const mailResult = sendEmail(email);

       await mailResult.then((result) => {
         if (result === 'Success') {
           return res.status(200).json({status: 'The email has been sent.'});
         } else {
           return res.status(500).json({status: 'Something went wrong. Try again'});
         }
       });
    } catch (e) {
      res.status(500).json({status: 'Something went wrong. Try again'});
    }
  });

module.exports = router;
