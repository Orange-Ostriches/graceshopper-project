const router = require('express').Router();
const { models: { Spaceship }} = require('../db');
const Sequelize = require('sequelize');
module.exports = router;

// GET /api/spaceships
router.get('/', async (req, res, next) => {
  try {
    const spaceships = await Spaceship.findAll()
    res.json(spaceships);
  } catch (error) {
    next(error)
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

router.get('/:id', async (req, res, next) => {
  try {
    const spaceship = await Spaceship.findByPk(req.params.id);
    res.json(spaceship);
  } catch (error) {
    next(error)
  }
});
