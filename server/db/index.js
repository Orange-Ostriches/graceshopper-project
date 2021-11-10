//this is the access point for all things database related!

const db = require("./db");

const User = require("./models/User");
const Spaceship = require("./models/Spaceship");
const Cart = require("./models/Cart");

User.hasOne(Cart);
Cart.belongsTo(User);

module.exports = {
  db,
  models: {
    User,
    Spaceship,
    Cart,
  },
};
