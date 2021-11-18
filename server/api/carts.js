const router = require("express").Router();
const {
  models: { Cart, CartSpaceship, Spaceship },
} = require("../db");
const User = require("../db/models/User");
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

router.get("/:credential", async (req, res, next) => {
  try {

    let foundCart
    if(Number(req.params.credential)) {
      foundCart = await Cart.findOne(
        {
          where: {
            userId: req.params.credential,
            isCheckedOut: false
          },
          include: [Spaceship]
      }
      )
      res.send(foundCart)
    } else {
      let user = await User.findByToken(req.params.credential)
      let cart = await Cart.findOne(
        {
          where: {
            userId: user.id,
            isCheckedOut: false
          },
          include: [Spaceship]
        }
      )

      res.send(cart)
    }

  } catch (error) {
    next(error)
  }
})

router.post("/:spaceshipId/:credential", async (req, res, next) => {
  try {
    let user = await User.findByToken(req.params.credential)
    let cart = await Cart.findOne(
      {
        where: {
          userId: user.id,
          isCheckedOut: false
        },
        include: [Spaceship]
      }
    )

    const record = await CartSpaceship.findOne(
      {
        where: {
        cartId: cart.id,
        spaceshipId: req.params.spaceshipId
        }
      }
    )

    if(!record) {
      await cart.addSpaceship(req.params.spaceshipId)
    } else {
      await record.update({...record, itemQty: record.itemQty + 1})
    }

    res.send(cart)
  } catch (error) {
    next(error)
  }
})

router.put("/:spaceshipId/:credential", async (req, res, next) => {
  try {
    let user = await User.findByToken(req.params.credential)
    let cart = await Cart.findOne(
      {
        where: {
          userId: user.id,
          isCheckedOut: false
        },
        include: [Spaceship]
      }
    )

    const record = await CartSpaceship.findOne(
      {
        where: {
        cartId: cart.id,
        spaceshipId: req.params.spaceshipId
        }
      }
    )

    if(!record) {
      await cart.addSpaceship(req.params.spaceshipId)
    } else if(record.itemQty > 1) {
      await record.update({...record, itemQty: record.itemQty - 1})
    }

    res.send(cart)
  } catch (error) {
    next(error)
  }
})

router.delete("/:cartId/:spaceshipId", async (req, res, next) => {
  try {

    const cartspaceship = await CartSpaceship.findOne({
      where: {
        cartId: req.params.cartId,
        spaceshipId: req.params.spaceshipId
      }
    })

    await cartspaceship.destroy()

    res.sendStatus(200)
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

router.post("/user-checkout", async (req, res, next) => {
  try {
    let user = await User.findByPk(req.body.userId)
    let cart = await Cart.findOne({where: {userId: user.id, isCheckedOut: false}})

    cart.update({...cart, isCheckedOut: true})
    res.send(await user.createCart())
  } catch(error) {
    next(error)
  }
})
