const router = require('express').Router();
const { models: { Spaceship }} = require('../db');
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

