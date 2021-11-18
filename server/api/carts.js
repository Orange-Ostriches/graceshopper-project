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

  // PUT /api/carts/:id
  router.put("/:id", async (req, res, next) => {
    try {
      const cart = await Cart.findOrCreate();
      // console.log(Object.keys(cart.__proto__))
      await cart.addSpaceship(product.id)
      res.send(cart);
    } catch (error) {
      next(error);
    }
  });
});
