const express = require("express")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const db = require("../models/index")

let router = express.Router()

router.post("/login", (req, res) => {
    const { email, password } = req.body

    if(!email || !password) {
        return res.status(400).json({ message: "Bad email or password" })
    }

    db.User.findOne({ where: { email: email }, raw: true })
        .then(user => {
            if(user === null) {
                return res.status(401).json({ message: "This account doesn't exist" })
            }

            bcript.compare(password, user.password)
                .then(test => {
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
                })
                .catch(err => res.status(500).json({ message: "Login process failed", error: err }))
        })
        .catch(err => res.status(500).json({ message: "Database Error", error: err }))
})

module.exports = router