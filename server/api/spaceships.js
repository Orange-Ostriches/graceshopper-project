const router = require("express").Router();
const Sequelize = require("sequelize")
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

router.get('/featured', async (req, res, next) => {
  try {
    const featSpaceships = await Spaceship.findAll({
      order: [Sequelize.literal('random()')],
      limit: 5
    })
    res.json(featSpaceships)
  } catch (error) {
    console.log(error)
  }
})

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

router.put("/:id", async (req, res, next) => {
  try {
    const { isAdmin } = await User.findByToken(req.headers.authorization);
    if (isAdmin !== true) {
      const error = Error("Unauthorized access");
      error.status = 401;
      throw error;
    }
    const spaceship = await Spaceship.findByPk(req.params.id);
    res.send(await spaceship.update(req.body));
  } catch (error) {
    next(error);
  }
});

router.post("/create", async (req, res, next) => {
  try {
    const { isAdmin } = await User.findByToken(req.headers.authorization);
    if (isAdmin !== true) {
      const error = Error("Unauthorized access");
      error.status = 401;
      throw error;
    }
    const spaceship = await Spaceship.create(req.body);
    res.send(spaceship);
  } catch (error) {
    next(error);
  }
});
