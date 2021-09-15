const Crypto = require("./Crypto");
const Category = require("./Category");
const Tag = require("./Tag");


// Categories have many Products
Category.hasMany(Crypto, {
  foreignKey: "category_id",
});

// Tags belongToMany Products (through ProductTag)
Tag.belongsToMany(Crypto, {
  through: CryptoTag,
  foreignKey: "tag_id",
});

module.exports = {
  
  Category,
  Crypto,
  Tag,
  CryptoTag,
};
