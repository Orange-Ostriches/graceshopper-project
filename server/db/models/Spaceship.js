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
    defaultValue: 'Plutonium',
    validate: {
      isIn: [['Plutonium', 'Uranium', 'Hydrogen']]
    }
  },
  size: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isIn: [['Small', 'Medium', 'Large']]
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
      isIn: [['Exploration', 'Mining', 'Combat', 'Transportation']]
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
