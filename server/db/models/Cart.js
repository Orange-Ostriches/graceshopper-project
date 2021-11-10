const Sequelize = require("sequelize");
const db = require("../db");

const Cart = db.define("cart", {
  products: {
    type: Sequelize.ARRAY(Sequelize.JSON),
    allowNull: true,
  },
  subtotal: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
  },
});

module.exports = Cart;
