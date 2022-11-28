// Import des modules nécessaires
const jwt = require("jsonwebtoken")
const db = require("../db.config")
const { AuthenticationError } = require("../middleware/customError")

// Controllers Auth
exports.signup = async (req, res, next) => {
    try {
        const { nom, prenom, pseudo, email, password } = req.body

        // Validation des données reçues
        if(!nom || !prenom || !pseudo || !email || !password) {
            throw new AuthenticationError("Missing parameter")
        }
    
        // Vérification de User si déjà existant
        let user = await db.User.findOne({ where: { email: email } })
        if(user !== null) {
            throw new AuthenticationError(`The user ${nom} already exist`, 3)
        }

        // Création de User
        user = await db.User.create(req.body)

        // Renvoi le User créé
        return res.json({ message: "User created", data:user })
    } catch(err) {
        next(err)
    }
}

exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body

        // Validation des données
        if(!email || !password) {
            throw new AuthenticationError("Bad email or password", 0)
        }
        
        // Vérification de l'existance de User
        let user = await db.User.findOne({ where: { email: email } })
        if(user === null) {
            throw new AuthenticationError("This account doesn't exist", 1)
        }

        // Vérification du password
        let test = await db.User.checkPassword(password, user.password)
        if(!test) {
            throw new AuthenticationError("Wrong password", 2)
        }

        // Génération et envoi du token
        const token = jwt.sign({
            id: user.id,
            nom: user.nom,
            prenom: user.prenom,
            email: user.email
        }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_DURING})

        return res.json({ access_token: token })
    } catch(err) {
        next(err)
    }
}