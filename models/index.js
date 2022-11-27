const User = require("./User");
const Project = require("./Project");
const Entry = require("./Entry")

// User.hasMany(Project, {
//   foreignKey: "user_id",
//   onDelete: "CASCADE",
// });

User.hasMany(Entry, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

Entry.belongsTo(User, {
  foreignKey: "user_id",
});

module.exports = { User, Project, Entry };
