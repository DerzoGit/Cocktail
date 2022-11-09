const { Model, DataTypes } = require("sequelize")
const sequelize = require("../db.config")
const bcrypt = require("bcrypt")

class User extends Model {}

User.init({
    id: { type: DataTypes.INTEGER(10), primaryKey: true, autoIncrement: true },
    nom: { type: DataTypes.STRING(100), defaultValue: "", allowNull: false },
    prenom: { type: DataTypes.STRING(100), defaultValue: "", allowNull: false },
    pseudo: { type: DataTypes.STRING(100), allowNull: false, unique: true },
    email: { type: DataTypes.STRING, validate: { isEmail: true } },
    password: { type: DataTypes.STRING(64), is: /^[0-9a-f]{64}$/i }
    }, {
        sequelize,
        modelName: "User",
        tableName: "users",
        paranoid: true // Soft delete
    })

User.beforeCreate( async (user, options) => {
    let hash = await bcrypt.hash(user.password, parseInt(process.env.BCRYPT_SALT_ROUND))
    user.password = hash
})

User.checkPassword = async (password, originel) => {
    return await bcrypt.compare(password, originel)
}

// User.sync()
// User.sync({ force: true })
// User.sync({ alter: true })

    module.exports = User;