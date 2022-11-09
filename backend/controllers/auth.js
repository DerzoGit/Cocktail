const jwt = require("jsonwebtoken")
const db = require("../db.config")
const { AuthenticationError } = require("../middleware/customError")

exports.signup = async (req, res, next) => {
    try {
        const { nom, prenom, pseudo, email, password } = req.body

        if(!nom || !prenom || !pseudo || !email || !password) {
            throw new AuthenticationError("Missing parameter")
        }
    
        let user = await db.User.findOne({ where: { email: email } })
        if(user !== null) {
            throw new AuthenticationError(`The user ${nom} already exist`, 3)
        }

        user = await db.User.create(req.body)
        return res.json({ message: "User created", data:user })
    } catch(err) {
        next(err)
    }
}

exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body

        if(!email || !password) {
            throw new AuthenticationError("Bad email or password", 0)
        }
        
        let user = await db.User.findOne({ where: { email: email } })
        if(user === null) {
            throw new AuthenticationError("This account doesn't exist", 1)
        }

        let test = await db.User.checkPassword(password, user.password)
        if(!test) {
            throw new AuthenticationError("Wrong password", 2)
        }

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