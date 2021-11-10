const router = require("express").Router();
const {
  models: { Cart },
} = require("../db");
module.exports = router;

// GET /api/carts
router.get("/", async (req, res, next) => {
  try {
    const carts = await Cart.findAll();
    res.json(carts);
  } catch (error) {
    next(error);
  }
});
