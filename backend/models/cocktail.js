const { Model, DataTypes } = require("sequelize")
const sequelize = require("../db.config")

class Cocktail extends Model {}

Cocktail.init({
        id: { type: DataTypes.INTEGER(10), primaryKey: true, autoIncrement: true },
        userId: { type: DataTypes.INTEGER(10), allowNull: false },
        nom: { type: DataTypes.STRING(100), defaultValue: "", allowNull: false },
        description: { type: DataTypes.TEXT, defaultValue: "", allowNull: false },
        recette: { type: DataTypes.TEXT, defaultValue: "", allowNull: false }
    }, {
        sequelize,
        modelName: "Cocktail",
        tableName: "cocktails",
        paranoid: true // Soft delete
    })

    module.exports = Cocktail;