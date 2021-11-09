const Sequelize = require('sequelize');
const db = require('../db');

const Spaceship = db.define('spaceship', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  price: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  fuelType: {
    type: Sequelize.STRING,
    defaultValue: 'solar',
    validate: {
      isIn: [['plutonium', 'uranium', 'hydrogen']]
    }
  },
  size: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isIn: [['small', 'medium', 'large']]
    }
  },
  range: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  specialty: {
    type: Sequelize.STRING,
    allowNull: true,
    validate: {
      isIn: [['exploration', 'mining', 'combat', 'transportation']]
    }
  },
  topSpeed: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  autopilot: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  description: {
    type: Sequelize.STRING(1000),
    defaultValue: 'This rocket will solve all of your intergalactic needs!'
  },
  image: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: 'https://www.bungie.net/common/destiny2_content/screenshots/855351525.jpg',
    validate: {
      isUrl: true
    }
  }
})

module.exports = Spaceship;
