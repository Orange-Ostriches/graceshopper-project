const Sequelize = require("sequelize");
const db = require("../db");

const CartSpaceship = db.define("cartSpaceship", {
  itemQty: {
    type: Sequelize.INTEGER,
    defaultValue: 1,
  },
});

module.exports = CartSpaceship;
