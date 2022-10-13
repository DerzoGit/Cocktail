const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const db = require("../models/index")

exports.login = async (req, res) => {
    const { email, password } = req.body

    if(!email || !password) {
        return res.status(400).json({ message: "Bad email or password" })
    }

    try {
        let user = await db.User.findOne({ where: { email: email }, raw: true })
        if(user === null) {
            return res.status(401).json({ message: "This account doesn't exist" })
        }

        let test = await bcrypt.compare(password, user.password)
        if(!test) {
            return res.status(401).json({ message: "Wrong password" })
        }

        const token = jwt.sign({
            id: user.id,
            nom: user.nom,
            prenom: user.prenom,
            email: user.email
        }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_DURING})

        return res.json({ access_token: token })
    } catch(err) {
        if(err.name == "SequelizeDatabaseError") {
            res.status(500).json({ message: "Database Error", error: err })
        }
        res.status(500).json({ message: "Login process failed", error: err })
        
    }
}