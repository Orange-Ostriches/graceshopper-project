const router = require("express").Router();
const {
  models: { Spaceship, User },
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

router.delete("/:id", async (req, res, next) => {
  try {
    const { isAdmin } = await User.findByToken(req.headers.authorization);
    if (isAdmin !== true) {
      const error = Error("Unauthorized access");
      error.status = 401;
      throw error;
    }
    const spaceship = await Spaceship.findByPk(req.params.id);
    await spaceship.destroy();
    res.send(spaceship);
  } catch (error) {
    next(error);
  }
});
