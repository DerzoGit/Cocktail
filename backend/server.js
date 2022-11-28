// Import des moduleq nécessaires
const express = require("express")
const cors = require("cors")
const checkTokenMiddleware = require("./middleware/checkToken")
const errorHandler = require("./middleware/errorHandler")

// Import de la connexion DB
let DB = require("./db.config")

// Initialisation de l'API
const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Import des routes
const userRoutes = require("./routes/users")
const cocktailRoutes = require("./routes/cocktails")
const authRoutes = require("./routes/auth")

// Mise en place routage 
app.get("/", (req, res) => res.send("I'm online"))
app.use("/users", checkTokenMiddleware, userRoutes)
app.use("/cocktails", cocktailRoutes)
app.use("/auth", authRoutes)

app.get("*", (req, res) => res.status(501).send("Where the hell are you going ?"))

app.use(errorHandler)

// Start server avec test DB
DB.sequelize.authenticate()
    .then(() => console.log("Database connection OK"))
    .then(() => {
        app.listen(process.env.SERVER_PORT, () => {
            console.log(`This server is running on port ${process.env.SERVER_PORT}. Have fun`)
        })
    })
    .catch(err => console.log("Database error", err))
