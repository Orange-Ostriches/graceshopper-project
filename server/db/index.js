//this is the access point for all things database related!
const db = require("./db");

const User = require("./models/User");
const Spaceship = require("./models/Spaceship");
const Cart = require("./models/Cart");
const CartSpaceship = require("./models/CartSpaceship");

User.hasMany(Cart);
User.hasMany(Spaceship);
Cart.belongsTo(User);
Cart.belongsToMany(Spaceship, { through: "CartSpaceship" });
Spaceship.belongsToMany(Cart, { through: "CartSpaceship" });
Cart.hasMany(CartSpaceship);

module.exports = {
  db,
  models: {
    User,
    Spaceship,
    Cart,
    CartSpaceship,
  },
};
