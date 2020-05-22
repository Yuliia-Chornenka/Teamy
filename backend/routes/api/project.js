const router = require("express").Router();
const Project = require("../../models/Project");

router.post("/create", async (req, res) => {
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

router.get("/:projectId", async (req, res) => {
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

module.exports = router;
