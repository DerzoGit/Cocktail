const db = require("../models/index")
const { RequestError, CocktailError } = require("../middleware/customError")

exports.getAllCocktails = (req, res, next) => {
    db.Cocktail.findAll()
        .then(cocktails => res.json({ data: cocktails }))
        .catch(err => next(err))
}

exports.getCocktail = async (req, res, next) => {
    try {
        let cocktailId = parseInt(req.params.id)

        if(!cocktailId) {
            throw new RequestError("Missing parameter")
        }

        let cocktail = await db.Cocktail.findOne({ where: { idd: cocktailId }, raw: true })
    
        if((cocktail == null)) {
            throw new CocktailError("This cocktail doesn't exist !", 0)
        }
        return res.json({ data: cocktail })

    } catch(err) {
        next(err)
    }
}

exports.addCocktail = async (req, res, next) => {
    try {
        const { userId, nom, description, recette } = req.body

        if(!userId || !nom || !description || !recette) {
            throw new RequestError("Missing data")
        }
    
        let cocktail = await db.Cocktail.findOne({ where: { nom: nom }, raw: true })
        if(cocktail !== null) {
            throw new CocktailError(`The cocktail ${nom} already exist`, 1)
        }

        cocktail = await db.Cocktail.create(req.body)
        return res.json({ message: "Cocktail created", data:cocktail })

    } catch(err) {
        next(err)
    }
}

exports.updateCocktail = async (req, res, next) => {
    try {
        let cocktailId = parseInt(req.params.id)

        if(!cocktailId) {
            throw new RequestError("Missing parameter")
        }

        let cocktail = await db.Cocktail.findOne({ where: { id: cocktailId }, raw: true })
        if(cocktail === null) {
            throw new CocktailError("This cocktail doesn't exist !", 0)
        }

        cocktail = await db.Cocktail.update(req.body, { where: { id: cocktailId } })
        return res.status(200).json({ message: "Cocktail updated" })

    } catch(err) {
        next(err)
    }
}

exports.untrashCocktail = async (req, res, next) => {
    try {
        let cocktailId = parseInt(req.params.id)

        if(!cocktailId) {
            throw new RequestError("Missing parameter")
        }
    
        await db.Cocktail.restore({ where: { id: cocktailId } })
            return res.status(204).json({})
    } catch(err) {
        next(err)
    }   
}

exports.trashCocktail = async (req, res, next) => {
    try {
        let cocktailId = parseInt(req.params.id)

        if(!cocktailId) {
            throw new RequestError("Missing parameter")
        }
    
        await db.Cocktail.destroy({ where: { id: cocktailId } })
            return res.status(204).json({})
    } catch(err) {
        next(err)
    }
}

exports.deleteCocktail = async (req, res, next) => {
    try {
        let cocktailId = parseInt(req.params.id)

        if(!cocktailId) {
            throw new RequestError("Missing parameter")
        }

        await db.Cocktail.destroy({ where: { id: cocktailId }, force: true })
            return res.status(204).json({})
    } catch(err) {
        next(err)
    }
}