const bcrypt = require("bcrypt")

const db = require("../models/index")

exports.getAllUsers = (req, res) => {
    db.User.findAll()
        .then(users => res.json({ data: users }))
        .catch(err => res.status(500).json({ message: "Database Error", error: err }))
}

exports.getUser = (req, res) => {
    let userId = parseInt(req.params.id)

    if(!userId) {
        return res.json(400).json({ message: "Missing parameter" })
    }

    db.User.findOne({ where: { id: userId }, raw: true })
    .then(user => {
        if((user == null)){
            return res.status(404).json({ message: "This user doesn't exist !" })
        }
        return res.json({ data: user })
    })
    .catch(err => res.status(500).json({ message: "Database error", error: err }))
}

exports.addUser = (req, res) => {
    const { nom, prenom, pseudo, email, password } = req.body

    if(!nom || !prenom || !pseudo || !email || !password) {
        return res.status(400).json({ message: "Missing data" })
    }

    db.User.findOne({ where: { email: email }, raw: true })
        .then(user => {
            if(user !== null) {
                return res.status(409).json({ message: `The user ${nom} already exist` })
            }

            bcrypt.hash(password, parseInt(process.env.BCRYPT_SALT_ROUND))
                .then(hash => {
                    req.body.password = hash

                    db.User.create(req.body)
                        .then(user => res.json({ message: "User created", data:user }))
                        .catch(err => res.status(500).json({ message: "Database error", error: err }))
                })
                .catch(err => res.status(500).json({ message: "Hash process error", error: err }))
        })
        .catch(err => res.status(500).json({ message: "Database error", error: err }))
}

exports.updateUser = (req, res) => {
    let userId = parseInt(req.params.id)

    if(!userId) {
        return res.status(400).json({ message: "Missing parameter" })
    }

    db.User.findOne({ where: { id: userId }, raw: true })
        .then(user => {
            if(user === null) {
                return res.status(404).json({ message: "This user doesn't exist" })
            }

            db.User.update(req.body, { where: { id: userId } })
                .then(user => res.status(200).json({ message: "User updated" }))
                .catch(err => res.status(500).json({ message: "Database error", error: err }))
        })
        .catch(err => res.status(500).json({ message: "Database error", error: err }))
}

exports.untrashUser = (req, res) => {
    let userId = parseInt(req.params.id)

    if(!userId) {
        return res.status(400).json({ message: "Missing parameter" })
    }

    db.User.restore({ where: { id: userId } })
        .then(() => res.status(204).json({}))
        .catch(err => res.status(500).json( { message: "Database error", error: err }))
}

exports.trashUser = (req, res) => {
    let userId = parseInt(req.params.id)

    if(!userId) {
        return res.status(400).json({ message: "Missing parameter" })
    }

    db.User.destroy({ where: { id: userId } })
        .then(() => res.status(204).json({}))
        .catch(err => res.status(500).json({ message: "Database error", error: err }))
}

exports.deleteUser = (req, res) => {
    let userId = parseInt(req.params.id)

    if(!userId) {
        return res.status(400).json({ message: "Missing parameter" })
    }

    db.User.destroy({ where: { id: userId }, force: true })
        .then(() => res.status(204).json({}))
        .catch(err => res.status(500).json({ message: "Database error", error: err }))
}