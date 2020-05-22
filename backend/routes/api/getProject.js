const router = require("express").Router();
const ProjecMongotModel = require("../../models/Project");

router.get("/project/:id", async (req, res) => {
  const { id } = req.params;

  const project = await ProjecMongotModel.findById(req.params.id, (err, doc) => {
    if (err) {
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(JSON.stringify(err));
    }
  });

  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify(project));
});

module.exports = router;
