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
 const { products } = req.body;
 try {
   const cart = await Cart.create({ products });
   res.send(cart);
 } catch (error) {
   next(error);
 }
})
