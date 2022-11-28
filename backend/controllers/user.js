// Import des modules nécessaires
const db = require("../db.config")
const { RequestError, UserError } = require("../middleware/customError")

// Controllers User
exports.getAllUsers = (req, res, next) => {
    db.User.findAll()
        .then(users => res.json({ data: users }))
        .catch(err => next(err))
}

exports.getUser = async (req, res, next) => {
    try {
        let userId = parseInt(req.params.id)

        // Vérification si ID présent et correspond
        if(!userId) {
            throw new RequestError("Missing Parameter")
        }
    
        // Récupération de User et vérification
        let user = await db.User.findOne({ where: { id: userId } })
        
        // Test si résultat
        if((user == null)){
            throw new UserError("This user doesn't exist !", 0)
        }
        // Renvoie du user trouvé
        return res.json({ data: user })
    } catch(err) {
        next(err)
    }
}

exports.updateUser = async (req, res, next) => {
    try {
        let userId = parseInt(req.params.id)

        // Vérification ID présent et correspondant
        if(!userId) {
            throw new RequestError("Missing parameter")
        }
    
        // Recherche User et vérification
        let user = await db.User.findOne({ where: { id: userId } })
        if(user === null) {
            throw new UserError("This user doesn't exist", 0)
        }

        // Mise à jour de User
        user = await db.User.update(req.body, { where: { id: userId } })

        // Réponse de l'update
        return res.status(200).json({ message: "User updated" })

    } catch(err) {
        next(err)
    }
}

exports.untrashUser = async (req, res, next) => {
    try {
        let userId = parseInt(req.params.id)

        // Vérification ID présent et correspondant
        if(!userId) {
            throw new RequestError("Missing parameter")
        }
    
        await db.User.restore({ where: { id: userId } })
        // Réponse untrash User
        return res.status(204).json({})
            
    } catch(err) {
        next(err)
    }
}

exports.trashUser = async (req, res, next) => {
    try {
        let userId = parseInt(req.params.id)

        // Vérification ID présent et correspondant
        if(!userId) {
            throw new RequestError("Missing parameter")
        }
    
        // Trash de User
        await db.User.destroy({ where: { id: userId } })
        // Réponse trash User
        return res.status(204).json({})

    } catch(err) {
        next(err)
    }
}

exports.deleteUser = async (req, res, next) => {
    try {
        let userId = parseInt(req.params.id)

        // Vérification ID présent et correspondant
        if(!userId) {
            throw new RequestError("Missing parameter")
        }
    
        // Supression de User
        await db.User.destroy({ where: { id: userId }, force: true })
        // Réponse de delete User
        return res.status(204).json({})
        
    } catch(err) {
        next(err)
    }
}