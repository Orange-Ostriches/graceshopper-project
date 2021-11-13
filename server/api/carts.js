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

// GET /api/carts/:id
router.get("/:id", async (req, res, next) => {
  try {
    const cart = await Cart.findByPk(req.params.id);
    res.json(cart);
  } catch (error) {
    next(error);
  }
});

// POST /api/carts
router.post("/", async (req, res, next) => {
  try {
    const cart = await Cart.create(req.body);
    res.status(201).json(cart);
  } catch (error) {
    next(error);
  }
});

// PUT /api/carts/:id
router.put("/:id", async (req, res, next) => {
  try {
    const cart = await Cart.findByPk(req.params.id);
    await cart.update(req.body);
    res.json(cart);
  } catch (error) {
    next(error);
  }
});


//if new user, create a cart
//if existing user, get cart from localStorage
//if cart in localStorage, then don't create a new cart
//findorcreate cart
//add product to cart
//send cart back to client


