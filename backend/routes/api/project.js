const router = require("express").Router();
const Project = require("../../models/Project");
const auth = require("../middleware/verify");

router.post("/create", auth, async (req, res) => {
  const newProject = new Project({
    ...req.body,
    created_by: "creatorid",
  });

  try {
    await newProject.save();
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ id: newProject._id, title: newProject.title }));
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

    project.members.push(memberId);

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

    res.json(updatedProject);
  } catch (e) {
    res.status(500).json({
      message: "Something went wrong. Try again later.",
      error: e,
    });
  }
});

module.exports = router;
