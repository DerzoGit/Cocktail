// const bcrypt = require("bcrypt")
const db = require("../models/index")
const { RequestError, UserError } = require("../middleware/customError")

exports.getAllUsers = (req, res, next) => {
    db.User.findAll()
        .then(users => res.json({ data: users }))
        .catch(err => next(err))
}

exports.getUser = async (req, res, next) => {
    try {
        let userId = parseInt(req.params.id)

        if(!userId) {
            throw new UserError("Missing Parameter")
        }
    
        let user = await db.User.findOne({ where: { id: userId }, raw: true })
            if((user == null)){
                throw new UserError("This user doesn't exist !", 0)
            }
            return res.json({ data: user })
    } catch(err) {
        next(err)
    }
}

exports.addUser = async (req, res, next) => {
    try {
        const { nom, prenom, pseudo, email, password } = req.body

        if(!nom || !prenom || !pseudo || !email || !password) {
            throw new UserError("Missing paremeter")
        }
    
        let user = await db.User.findOne({ where: { email: email }, raw: true })
                if(user !== null) {
                    throw new UserError(`The user ${nom} already exist`, 1)
                }
    
                // let hash = await bcrypt.hash(password, parseInt(process.env.BCRYPT_SALT_ROUND))
                // req.body.password = hash
    
                user = await db.User.create(req.body)
                return res.json({ message: "User created", data:user })
    } catch(err) {
        next(err)
    }
}

exports.updateUser = async (req, res, next) => {
    try {
        let userId = parseInt(req.params.id)

        if(!userId) {
            throw new UserError("Missing parameter")
        }
    
        let user = await db.User.findOne({ where: { id: userId }, raw: true })
                if(user === null) {
                    throw new UserError("This user doesn't exist", 0)
                }
    
                user = await db.User.update(req.body, { where: { id: userId } })
                return res.status(200).json({ message: "User updated" })

    } catch(err) {
        next(err)
    }
}

exports.untrashUser = async (req, res, next) => {
    try {
        let userId = parseInt(req.params.id)

        if(!userId) {
            throw new UserError("Missing parameter")
        }
    
        await db.User.restore({ where: { id: userId } })
        return res.status(204).json({})
            
    } catch(err) {
        next(err)
    }
}

exports.trashUser = async (req, res, next) => {
    try {
        let userId = parseInt(req.params.id)

        if(!userId) {
            throw new UserError("Missing parameter")
        }
    
        await db.User.destroy({ where: { id: userId } })
        return res.status(204).json({})

    } catch(err) {
        next(err)
    }
}

exports.deleteUser = async (req, res, next) => {
    try {
        let userId = parseInt(req.params.id)

        if(!userId) {
            throw new UserError("Missing parameter")
        }
    
        await db.User.destroy({ where: { id: userId }, force: true })
        return res.status(204).json({})
        
    } catch(err) {
        next(err)
    }
}