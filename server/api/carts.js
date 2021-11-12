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

router.put("/", async (req, res, next) => {
  const product = req.body;
  // localStorage.setItem('cart', { cart object })
  // just store locally for guest user

  try {
    // here I can check for an existing cart in localStorage
      // if cart in localStorage, then don't create a new cart
    const cart = await Cart.findOrCreate();
    // console.log(Object.keys(cart.__proto__))

    // if cart exists
      // then findOrCreate a cart
      // {where: not checked out}

    await cart.addSpaceship(product.id)
    res.send(cart);
  } catch (error) {
    next(error);
  }
})
