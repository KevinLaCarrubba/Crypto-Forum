const Crypto = require("./Crypto");
const Category = require("./Category");
const Tag = require("./Tag");
const CryptoTag = require("./CryptoTag");

// Products belongsTo Category
Crypto.belongsTo(Category, {
  foreignKey: "category_id",
  onDelete: "CASCADE",
});

// Categories have many Products
Category.hasMany(Crypto, {
  foreignKey: "category_id",
});

// Products belongToMany Tags (through ProductTag)
Crypto.belongsToMany(Tag, {
  through: CryptoTag,
  foreignKey: "crypto_id",
});

// Tags belongToMany Products (through ProductTag)
Tag.belongsToMany(Crypto, {
  through: CryptoTag,
  foreignKey: "tag_id",
});

module.exports = {
  Crypto,
  Category,
  Tag,
  CryptoTag,
};
