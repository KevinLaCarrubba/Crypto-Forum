const User = require("./User");
const Comment = require("./comment");
const Watchlist = require("./watchlist");

User.hasMany(Comment, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

Comment.belongsTo(User, {
  foreignKey: "user_id",
});

User.hasMany(Watchlist, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

Watchlist.belongsTo(User, {
  foreignKey: "user_id",
});

module.exports = { User, Comment, Watchlist };
