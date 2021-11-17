const router = require("express").Router();
const {
  models: { Cart, CartSpaceship, Spaceship },
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

router.get("/:userId", async (req, res, next) => {
  try {

    const foundCart = await Cart.findOne(
      {
        where: {
          userId: req.params.userId,
          isCheckedOut: false
        },
        include: [Spaceship]
    }
    )

    res.send(foundCart)
  } catch (error) {
    next(error)
  }
})

router.post("/guest-checkout", async (req, res, next) => {
  try {
    const spaceships = req.body.cartItems
    let newCart = await Cart.create()
    let foundspaceships
    await newCart.update({isCheckedOut: true})

    spaceships.forEach( async (spaceship) => {
      await CartSpaceship.create({
        itemQty: spaceship.itemQty,
        cartId: newCart.id,
        spaceshipId: spaceship.id
      }).then(async () => {
        foundspaceships = await CartSpaceship.findAll({
          where: {
            cartId: newCart.id
          }
        })
      }
      ).finally(() => res.send(foundspaceships))
    })

  } catch(error) {
    next(error)
  }
})

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

