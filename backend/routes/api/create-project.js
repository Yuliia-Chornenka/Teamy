const router = require("express").Router();
const ProjecMongotModel = require("../../models/Project");

router.post("/create-project", async (req, res) => {
  const newProject = new ProjecMongotModel({
    ...req.body,
    created_by: "creatorid",
  });

  try {
    await newProject.save();
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ id: newProject._id }));
  } catch (err) {
    res.writeHead(400, { "Content-Type": "application/json" });
    res.end(JSON.stringify(err));
  }
});

module.exports = router;
