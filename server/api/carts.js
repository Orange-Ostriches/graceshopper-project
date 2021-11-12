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

router.post("/", async (req, res, next) => {
  const product = req.body;

  try {
    // here I can check for an existing cart in localStorage
      // if cart in localStorage, then don't create a new cart
    const cart = await Cart.create();
    console.log(Object.keys(cart.__proto__))
    await cart.addSpaceship(product.id)
    res.send(await cart.getSpaceships());
  } catch (error) {
    next(error);
  }
})
