"use strict";

const spaceshipNames = [
  "Visage Station",
  "Outlander",
  "Epitome Base",
  "Novis",
  "Elyse Colony",
  "Tartarus Colony",
  "  Aeris",
  "Escort",
  "Nott Terminal",
  "Aether Terminal",
  "Symbolica Station",
  "Nox Terminal",
  "Phoenix",
  "Ecstasis Colony",
  "Warden Terminal",
  "Glory Station",
  "Guardian Base",
  "Hyperion Terminal",
  "Heirloom",
  "Neo",
  "Illume Colony",
  "Epitome Terminal",
  "Mother Terminal",
  "Janus",
  "Athena Colony",
  "Eir Station",
  "Dawn",
  "Ecstasis Base",
  "Utopis Base",
  "Pedigree Colony",
  "Exposure Colony",
  "Juno Colony",
  "Chrono Terminal",
  "Olympus",
  "Hemera Base",
  "Heirloom",
  "Prometheus Terminal",
  "Guardian Base",
  "Angel Station",
  "Borealis Colony",
  "Azure Colony",
  "Mythos Terminal",
  "Phoenix Terminal",
  "Illume Colony",
  "Nebula Colony",
  "Symbolica",
  "Nox Terminal",
  "Fauna Base",
  "Lumina",
  "Legacy Base",
  "Hera Base",
  "Saga",
  "Novis Station",
  "Outlander Base",
  "Voyage Terminal",
  "Daydream Base",
  "Paradox",
  "Vulcan Station",
  "Chronos Base",
  "Prism Colony",
  "Ancestor Station",
  "Athena Terminal",
  "Omega Station",
  "Awe",
  "Orphan",
  "Genesis Colony",
  "Rogue Station",
  "Terra Station",
  "Empyrea Station",
  "Terran Station",
  "Orphan",
  "Vulcan Station",
  "Epitome",
  "Curator Station",
  "Hypnos",
  "Nero Colony",
  "Voyage Base",
  "Gaia Colony",
  "Eternity",
  "Terminus",
  "Apollo Colony",
  "Miracle Colony",
  "Empyrea",
  "Dawn Base",
  "Helios Colony",
  "Saga Colony",
  "Ender Station",
  "Dawn Colony",
  "Minerva Station",
  "Marvel",
  "Marvel Colony",
  "Awe Base",
  "Aeon Station",
  "Amazone Station",
  "Elysium",
  "Voyage Terminal",
  "Heritage Colony",
];
const fuelTypes = ["Plutonium", "Uranium", "Hydrogen"];
const sizes = ["Small", "Medium", "Large"];
const specialties = ["Exploration", "Mining", "Combat", "Transportation"];
const image =
  "https://www.bungie.net/common/destiny2_content/screenshots/806017499.jpg";

const {
  db,
  models: { Spaceship, User, Cart },
} = require("../server/db");

const spaceships = [
  {
    name: "WarpTrace 9000",
    price: 175,
    fuelType: "Uranium",
    size: "Medium",
    range: 1500,
    specialty: "Transportation",
    topSpeed: 300,
    autopilot: true,
    description:
      'The newest addition to the WarpTrace fleet, this spectacular spaceship will get you where you need to go faster than you can say "SOLD!".',
  },
  {
    name: "GigaBlaster Mk7",
    price: 400,
    fuelType: "Hydrogen",
    size: "Large",
    range: 1000,
    specialty: "Combat",
    topSpeed: 420,
    autopilot: false,
    description: "If you have enemies that need blastin', look no further.",
    image:
      "https://64.media.tumblr.com/0a798505b52e0589d0760e56bec8219e/tumblr_odtma4Id6G1vu9wkoo1_1280.jpg",
  },
  {
    name: "Driller",
    price: 250,
    fuelType: "Plutonium",
    size: "Large",
    range: 2500,
    specialty: "Transportation",
    topSpeed: 100,
    autopilot: true,
    description:
      "The spaceship naming budget dried up after all R&D was funneled into more important features... See for yourself.",
    image:
      "https://cdnb.artstation.com/p/assets/images/images/007/980/509/large/nirmal-thomas-banner60.jpg?1620629708",
  },
];

const users = [
  {
    username: "cody",
    password: "123",
  },
  {
    username: "murphy",
    password: "123",
  },
  {
    username: "goodguygary",
    password: "notasnail123",
  },
  {
    username: "adMan",
    password: "theAdmin",
    isAdmin: true,
  },
];

const carts = [
  {
    products: [
      {
        name: "Driller",
        price: 250,
        fuelType: "Plutonium",
        size: "Large",
        range: 2500,
        specialty: "Transportation",
        topSpeed: 100,
        autopilot: true,
        description:
          "The spaceship naming budget dried up after all R&D was funneled into more important features... See for yourself.",
        image:
          "https://cdnb.artstation.com/p/assets/images/images/007/980/509/large/nirmal-thomas-banner60.jpg?1620629708",
      },
      {
        name: "GigaBlaster Mk7",
        price: 400,
        fuelType: "Hydrogen",
        size: "Large",
        range: 1000,
        specialty: "Combat",
        topSpeed: 420,
        autopilot: false,
        description: "If you have enemies that need blastin', look no further.",
        image:
          "https://64.media.tumblr.com/0a798505b52e0589d0760e56bec8219e/tumblr_odtma4Id6G1vu9wkoo1_1280.jpg",
      },
    ],
    subtotal: 650,
    userId: 2,
  },
  {
    products: null,
    subtotal: 0,
    userId: 3,
  },
  {
    products: [
      {
        name: "WarpTrace 9000",
        price: 175,
        fuelType: "Uranium",
        size: "Medium",
        range: 1500,
        specialty: "Transportation",
        topSpeed: 300,
        autopilot: true,
        description:
          'The newest addition to the WarpTrace fleet, this spectacular spacehip will get you where you need to go faster than you can say "SOLD!".',
      },
    ],
    subtotal: 175,
    userId: 1,
  },
];

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  await db.sync({ force: true }); // clears db and matches models to tables
  console.log("db synced!");

  // Creating Users
  // const users = await Promise.all([
  //   User.create({ username: 'cody', password: '123' }),
  //   User.create({ username: 'murphy', password: '123' }),
  // ])

  await Promise.all(
    spaceships.map((spaceship) => {
      return Spaceship.create(spaceship);
    })
  );

  await Promise.all(
    spaceshipNames.map((spaceshipName) =>
      Spaceship.create({
        name: spaceshipName,
        price: Math.ceil(Math.random() * 10) * 100,
        fuelType: fuelTypes[Math.floor(Math.random() * 3)],
        size: sizes[Math.floor(Math.random() * 3)],
        range: Math.ceil(Math.random() * 10) * 250,
        specialty: specialties[Math.floor(Math.random() * 4)],
        topSpeed: Math.ceil(Math.random() * 10) * 50,
        autopilot: Math.round(Math.random()) === 0,
        description: "The greatest spaceship you've never owned.",
        image,
      })
    )
  );

  await Promise.all(
    users.map((user) => {
      return User.create(user);
    })
  );

  await Promise.all(
    carts.map((cart) => {
      return Cart.create(cart);
    })
  );

  console.log(
    `seeded ${spaceships.length + spaceshipNames.length} spaceships, ${
      users.length
    } users, and ${carts.length} carts`
  );
  console.log(`seeded successfully!`);
  // return {
  //   users: {
  //     cody: users[0],
  //     murphy: users[1]
  //   }
  // }
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log("seeding...");
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log("closing db connection");
    await db.close();
    console.log("db connection closed");
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;
