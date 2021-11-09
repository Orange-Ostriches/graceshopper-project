const { db, models } = require('./server/db');
const { Spaceship, User } = models;

const spaceships = [{
  name: 'WarpTrace 9000',
  price: 175,
  fuelType: 'uranium',
  size: 'medium',
  range: 1500,
  specialty: 'transportation',
  topSpeed: 300,
  autopilot: true,
  description: 'The newest addition to the WarpTrace fleet, this spectacular spacehip will get you where you need to go faster than you can say "SOLD!".',
},{
  name: 'GigaBlaster Mk7',
  price: 400,
  fuelType: 'hydrogen',
  size: 'large',
  range: 1000,
  specialty: 'combat',
  topSpeed: 420,
  autopilot: false,
  description: "If you have enemies that need blastin', look no further.",
  image: 'https://64.media.tumblr.com/0a798505b52e0589d0760e56bec8219e/tumblr_odtma4Id6G1vu9wkoo1_1280.jpg'
},{
  name: 'Driller',
  price: 250,
  fuelType: 'plutonium',
  size: 'large',
  range: 2500,
  specialty: 'transportation',
  topSpeed: 100,
  autopilot: true,
  description: "The spaceship naming budget dried up after all R&D was funneled into more important features... See for yourself.",
  image: 'https://cdnb.artstation.com/p/assets/images/images/007/980/509/large/nirmal-thomas-banner60.jpg?1620629708'
}];

const users = [{
  username: 'goodguygary',
  password: 'notasnail123'
}, {
  username: 'fiestyfuego',
  password: 'lolpasswordxd'
}, {
  username: 'keymaster7',
  password: 'topsecret'
}];

const seed = async () => {
  try {
    await db.sync({ force: true });

    await Promise.all(spaceships.map(spaceship => {
    return Spaceship.create(spaceship)
    }))

    await Promise.all(users.map(user => {
      return User.create(user)
    }))

  } catch (error) {
    console.log(error);
  }
};

module.exports = seed;


