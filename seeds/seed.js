const sequelize = require('../config/connection');
const { User, Comment } = require('../models');

const userData = require('./userData.json');
const commentData = require('./commentData.json');

const seedDatabase = async () => {
    await sequelize.sync({ force: true });
  
    const users = await User.bulkCreate(userData, {
      individualHooks: true,
      returning: true,
    });
    

    process.exit(0);
};

seedDatabase();