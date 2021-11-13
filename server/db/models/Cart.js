const Sequelize = require("sequelize");
const db = require("../db");

const Cart = db.define("cart", {
  totalProducts: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  subtotal: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
  }
});

module.exports = Cart;
