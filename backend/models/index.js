const User = require("./user")
const Cocktail = require("./cocktail")

User.hasMany(Cocktail, { foreignKey: "userId", onDelete: "cascade" })
Cocktail.belongsTo(User, { foreignKey: "userId" })

module.exports = {
    User, Cocktail
}