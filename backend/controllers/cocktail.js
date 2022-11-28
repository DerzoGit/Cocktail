// Import des modules nécessaires
const db = require("../db.config")
const { RequestError, CocktailError } = require("../middleware/customError")

// Controllers Cocktail
exports.getAllCocktails = (req, res, next) => {
    db.Cocktail.findAll({ include: { model: db.User, attributes: ["id", "pseudo", "email"] }})
        .then(cocktails => res.json({ data: cocktails }))
        .catch(err => next(err))
}

exports.getCocktail = async (req, res, next) => {
    try {
        let cocktailId = parseInt(req.params.id)

        // Vérification ID présent et correspondant
        if(!cocktailId) {
            throw new RequestError("Missing parameter")
        }

        // Récupération cocktail en incluant info USer
        let cocktail = await db.Cocktail.findOne({ where: { id: cocktailId }, include: { model: db.User, attributes: ["id", "pseudo", "email"] } })
    
        // Test si résultat
        if((cocktail == null)) {
            throw new CocktailError("This cocktail doesn't exist !", 0)
        }

        // Réponse Cocktail trouvé
        return res.json({ data: cocktail })

    } catch(err) {
        next(err)
    }
}

exports.addCocktail = async (req, res, next) => {
    try {
        const { userId, nom, description, recette } = req.body

        // Validation des données reçues
        if(!userId || !nom || !description || !recette) {
            throw new RequestError("Missing data")
        }
    
        // Vérification de Cocktail si existant
        let cocktail = await db.Cocktail.findOne({ where: { nom: nom } })
        if(cocktail !== null) {
            throw new CocktailError(`The cocktail ${nom} already exist`, 1)
        }

        // Création du Cocktail
        cocktail = await db.Cocktail.create(req.body)
        
        // Réponse du Cocktail créé
        return res.json({ message: "Cocktail created", data:cocktail })

    } catch(err) {
        next(err)
    }
}

exports.updateCocktail = async (req, res, next) => {
    try {
        let cocktailId = parseInt(req.params.id)

        // Vérification ID présent et correspondant
        if(!cocktailId) {
            throw new RequestError("Missing parameter")
        }

        // Recherche du Cocktail et vérification
        let cocktail = await db.Cocktail.findOne({ where: { id: cocktailId } })
        if(cocktail === null) {
            throw new CocktailError("This cocktail doesn't exist !", 0)
        }

        // Mise à jour du Cocktail
        cocktail = await db.Cocktail.update(req.body, { where: { id: cocktailId } })

        // Réponse update Cocktail
        return res.status(200).json({ message: "Cocktail updated" })

    } catch(err) {
        next(err)
    }
}

exports.untrashCocktail = async (req, res, next) => {
    try {
        let cocktailId = parseInt(req.params.id)

        // Vérification ID présent et correspondant
        if(!cocktailId) {
            throw new RequestError("Missing parameter")
        }
    
        await db.Cocktail.restore({ where: { id: cocktailId } })
        // Réponse untrash Cocktail
        return res.status(204).json({})
    } catch(err) {
        next(err)
    }   
}

exports.trashCocktail = async (req, res, next) => {
    try {
        let cocktailId = parseInt(req.params.id)

        // Vérification ID présent et correspondant
        if(!cocktailId) {
            throw new RequestError("Missing parameter")
        }
    
        // Trash Cocktail
        await db.Cocktail.destroy({ where: { id: cocktailId } })
        // Réponse trash Cocktail
        return res.status(204).json({})
    } catch(err) {
        next(err)
    }
}

exports.deleteCocktail = async (req, res, next) => {
    try {
        let cocktailId = parseInt(req.params.id)

        // Vérification ID présent et correspondant
        if(!cocktailId) {
            throw new RequestError("Missing parameter")
        }

        // Delete Cocktail
        await db.Cocktail.destroy({ where: { id: cocktailId }, force: true })
        // Réponse delete Cocktail
        return res.status(204).json({})
    } catch(err) {
        next(err)
    }
}