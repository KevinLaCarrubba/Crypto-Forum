const seedCategories = require('./category-seeds');
const seedCrypto = require('./crypto-seeds');
const seedTags = require('./tag-seeds');
const seedCryptoTags = require('./crypto-tag-seeds');

const sequelize = require('../config/connection');

const seedAll = async () => {
  await sequelize.sync({ force: true });
  console.log('\n----- DATABASE SYNCED -----\n');
  await seedCategories();
  console.log('\n----- CATEGORIES SEEDED -----\n');

  await seedCrypto();
  console.log('\n----- CRYPTO SEEDED -----\n');

  await seedTags();
  console.log('\n----- TAGS SEEDED -----\n');

  await seedCryptoTags();
  console.log('\n----- CRYPTO TAGS SEEDED -----\n');

  process.exit(0);
};

seedAll();
