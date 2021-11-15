//this is the access point for all things database related!

const db = require("./db");

const User = require("./models/User");
const Spaceship = require("./models/Spaceship");
const Cart = require("./models/Cart");

User.hasMany(Cart);
User.hasMany(Spaceship);
Cart.belongsTo(User);
Cart.hasMany(Spaceship);
Spaceship.belongsTo(Cart);
Spaceship.belongsTo(User, { through: Cart })

module.exports = {
  db,
  models: {
    User,
    Spaceship,
    Cart,
  },
};
