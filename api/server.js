const express = require("express");
const Resources = require("./resources/resources-model");
const server = express();

server.use(express.json());

server.get("/", (req, res) => {
  res.status(200).json({ api: "up" });
});

server.post("/resources", async (req, res) => {
  const newResource = await Resources.insert(req.body);

  res.status(201).json(newResource);
});

server.delete("/resources/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const resource = await Resources.remove(id);
    if (resource) {
      res.status(200).json({
        message: `resource ${resource} deleted`,
      });
    } else {
      res.status(404).json({
        message: `The resource with ID (${id}) does not exist`,
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "The resource could not be removed",
    });
  }
});

module.exports = server;
