const router = require("express").Router();
const {
  models: { Spaceship },
} = require("../db");
module.exports = router;

// GET /api/spaceships
router.get("/", async (req, res, next) => {
  try {
    const spaceships = await Spaceship.findAll();
    res.json(spaceships);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const spaceship = await Spaceship.findByPk(req.params.id);
    res.json(spaceship);
  } catch (error) {
    next(error);
  }
});
