const sequelize = require('../config/connection');
const { User, Comment, Watchlist } = require('../models');

const userData = require('./userData.json');
const commentData = require('./commentData.json');
const watchListData = require('./watchListData.json');


const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  for (const watchlist of watchlistData) {
    await Watchlist.create({
      ...watchlist,
      user_id: user[Math.floor(Math.random() * users.length)].id,
    });
  }

  for (const comment of commentData) {
    await Comment.create({
      ...comment,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
    
    const watchlist = await Watchlist.bulkCreate(watchListData);

    for (const comment of commentData) {
      await Comment.create({
        ...comment,
        user_id: users[Math.floor(Math.random() * users.length)].id,
      });
    }


  process.exit(0);
};

seedDatabase();
