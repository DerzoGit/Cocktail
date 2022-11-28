// Import des modules nécessaires
const express = require("express")
const userCtrl = require("../controllers/user")

// Récupération du routeur d'express
let router = express.Router()

// Middleware logger date des requêtes
router.use((req, res, next) => {
    const event = new Date()
    console.log("USER Time:", event.toString())
    next()
})

// Routage User
router.get("/", userCtrl.getAllUsers)
router.get("/:id", userCtrl.getUser)
router.patch("/:id", userCtrl.updateUser)
router.post("/untrash/:id", userCtrl.untrashUser)
router.delete("/trash/:id", userCtrl.trashUser)
router.delete("/:id", userCtrl.deleteUser)

module.exports = router