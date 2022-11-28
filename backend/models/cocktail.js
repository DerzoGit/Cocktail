// Import des modules nécessaires
const { DataTypes } = require("sequelize")

// Définition du modèle Cocktail
module.exports = (sequelize) => {
    return Cocktail = sequelize.define("Cocktail", {
        id: { type: DataTypes.INTEGER(10), primaryKey: true, autoIncrement: true },
        userId: { type: DataTypes.INTEGER(10), allowNull: false },
        nom: { type: DataTypes.STRING(100), defaultValue: "", allowNull: false },
        description: { type: DataTypes.TEXT, defaultValue: "", allowNull: false },
        recette: { type: DataTypes.TEXT, defaultValue: "", allowNull: false }
        }, {
        paranoid: true // Soft delete
    })
}
