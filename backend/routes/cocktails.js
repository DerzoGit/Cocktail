// Import des modules nécessaires
const express = require("express")
const checkTokenMiddleware = require("../middleware/checkToken")
const cocktailCtrl = require("../controllers/cocktail")

// Récupération du routeur d'express
let router = express.Router()

// Middleware logger dates des requêtes
router.use((req, res, next) => {
    const event = new Date()
    console.log("COCKTAIL Time:", event.toString())
    next()
})

// Routage Cocktail
router.get("", cocktailCtrl.getAllCocktails)
router.get("/:id", cocktailCtrl.getCocktail)
router.put("", checkTokenMiddleware, cocktailCtrl.addCocktail)
router.patch("/:id", checkTokenMiddleware, cocktailCtrl.updateCocktail)
router.post("/untrash/:id", checkTokenMiddleware, cocktailCtrl.untrashCocktail)
router.delete("/trash/:id", checkTokenMiddleware, cocktailCtrl.trashCocktail)
router.delete("/:id", checkTokenMiddleware, cocktailCtrl.deleteCocktail)

module.exports = router