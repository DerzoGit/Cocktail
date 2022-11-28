// Import des modules nécessaires
const express = require("express")
const authCtrl = require("../controllers/auth")

// Récupération du routage d'express
let router = express.Router()

// Middleware logger dates des requêtes
router.use((req, res, next) => {
    const event = new Date()
    console.log("AUTH Time:", event.toString())
    next()
})

// Routage Auth
router.put("/signup", authCtrl.signup)
router.post("/login", authCtrl.login)

module.exports = router