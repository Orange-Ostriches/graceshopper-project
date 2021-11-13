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

<<<<<<< HEAD
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
=======
router.put("/", async (req, res, next) => {
  const product = req.body;
  // localStorage.setItem('cart', { cart object })
  // just store locally for guest user
>>>>>>> 860e3317226317a0b85612106e3674ec20fbab5a

// PUT /api/carts/:id
router.put("/:id", async (req, res, next) => {
  try {
<<<<<<< HEAD
    const cart = await Cart.findByPk(req.params.id);
    await cart.update(req.body);
    res.json(cart);
=======
    // here I can check for an existing cart in localStorage
      // if cart in localStorage, then don't create a new cart
    const cart = await Cart.findOrCreate();
    // console.log(Object.keys(cart.__proto__))

    // if cart exists
      // then findOrCreate a cart
      // {where: not checked out}

    await cart.addSpaceship(product.id)
    res.send(cart);
>>>>>>> 860e3317226317a0b85612106e3674ec20fbab5a
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


