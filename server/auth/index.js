const router = require('express').Router()
const { models: {User, Cart, CartSpaceship }} = require('../db')
module.exports = router

router.post('/login', async (req, res, next) => {
  try {
    res.send({ token: await User.authenticate(req.body)});
  } catch (err) {
    next(err)
  }
})


router.post('/signup', async (req, res, next) => {
  try {
    const user = await User.create(req.body)
    res.send({token: await user.generateToken()})
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      res.status(401).send('User already exists')
    } else {
      next(err)
    }
  }
})

router.get('/me', async (req, res, next) => {
  try {
    let user = await User.findByToken(req.headers.authorization)
    let cart = await Cart.findOrCreate({where: {userId: user.id, isCheckedOut: false}})

    let localStorageSpaceships

    let isNewCart = cart[1]
    let cartId = cart[0].id
    let cartObj = cart[0]

    if(req.headers.spaceships !== 'undefined') {
      localStorageSpaceships = JSON.parse(req.headers.spaceships)
    }

    if(isNewCart && localStorageSpaceships !== undefined) {
      localStorageSpaceships.forEach( async (spaceship) => {
        await CartSpaceship.create({
          itemQty: spaceship.itemQty,
          cartId: cartId,
          spaceshipId: spaceship.id
        })
      })
    }
    // else {
      // can merge items from localStorage to existing cart here
      // for now just send existing cart witout taking into account
      // localStorage items if user already has a cart in db
    // }

    res.send(await User.findByToken(req.headers.authorization))

  } catch (ex) {
    next(ex)
  }
})
