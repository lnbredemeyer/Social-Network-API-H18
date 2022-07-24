const connection = require('../config/connection');
const { User, Thought } = require('../models');
const { getRandomUser, getRandomThoughts } = require('./data');

connection.on('error', (err) => err);

connection.once('open', async () => {
  console.log('connected');

  // Drop existing thoughts
  await Thought.deleteMany({});

  // Drop existing user
  await User.deleteMany({});

  // Create empty array to hold the students
  const users = [];
  const thoughts = [];

  // Loop 20 times -- add users to the users array
  for (let i = 0; i < 20; i++) {
    // Get some random assignment objects using a helper function that we imported from ./data
    const username = getRandomUser();
    const email = `${username}${Math.floor(Math.random() * (99 - 18 + 1) + 18)}@socialapi.com`;

    users.push({
      username,
      email,
    });

  // Loop 20 times -- add thoughts to the thoughts array
  for (let i = 0; i < 20; i++) {
    // Get some random assignment objects using a helper function that we imported from ./data
    const thoughtText = getRandomThoughts();

    thoughts.push({
      thoughtText,
      username,
    });
  }  
  }  

  // Add users to the collection and await the results
  await User.collection.insertMany(users);

  // Add thoughts to the collection and await the results
  await Thought.collection.insertMany(thoughts);

  // Log out the seed data to indicate what should appear in the database
  console.table(users);
  console.info('Seed complete! 🌱');
  process.exit(0);
});
