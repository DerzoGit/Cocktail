const db = require("../models/index")
const { removeAttribute } = require("../models/user")

exports.getAllCocktails = (req, res) => {
    db.Cocktail.findAll()
        .then(cocktails => res.json({ data: cocktails }))
        .catch(err => res.status(500).json({ message: "Database Error", error: err }))
}

exports.getCocktail = async (req, res) => {
    let cocktailId = parseInt(req.params.id)

    if(!cocktailId) {
        return res.json(400).json({ message: "Missing parameter" })
    }

    try {
        let cocktail = await db.Cocktail.findOne({ where: { id: cocktailId }, raw: true })
    
        if((cocktail == null)){
            return res.status(404).json({ message: "This cocktail doesn't exist !" })
        }
        return res.json({ data: cocktail })

    } catch(err) {
        return res.status(500).json({ message: "Database error", error: err })
    }
}

exports.addCocktail = async (req, res) => {
    const { userId, nom, description, recette } = req.body

    if(!userId || !nom || !description || !recette) {
        return res.status(400).json({ message: "Missing data" })
    }

    try {
        let cocktail = await db.Cocktail.findOne({ where: { nom: nom }, raw: true })
        if(cocktail !== null) {
            return res.status(409).json({ message: `The cocktail ${nom} already exist` })
        }

        cocktail = await db.Cocktail.create(req.body)
        return res.json({ message: "Cocktail created", data:cocktail })

    } catch(err) {
        return res.status(500).json({ message: "Database error", error: err })
    }
}

exports.updateCocktail = async (req, res) => {
    let cocktailId = parseInt(req.params.id)

    if(!cocktailId) {
        return res.status(400).json({ message: "Missing parameter" })
    }

    try {
        let cocktail = await db.Cocktail.findOne({ where: { id: cocktailId }, raw: true })
        if(cocktail === null) {
            return res.status(404).json({ message: "This cocktail doesn't exist" })
        }

        cocktail = await db.Cocktail.update(req.body, { where: { id: cocktailId } })
        return res.status(200).json({ message: "Cocktail updated" })

    } catch(err) {
        return res.status(500).json({ message: "Database error", error: err })
    }

}

exports.untrashCocktail = (req, res) => {
    let cocktailId = parseInt(req.params.id)

    if(!cocktailId) {
        return res.status(400).json({ message: "Missing parameter" })
    }

    db.Cocktail.restore({ where: { id: cocktailId } })
        .then(() => res.status(204).json({}))
        .catch(err => res.status(500).json( { message: "Database error", error: err }))
}

exports.trashCocktail = (req, res) => {
    let cocktailId = parseInt(req.params.id)

    if(!cocktailId) {
        return res.status(400).json({ message: "Missing parameter" })
    }

    db.Cocktail.destroy({ where: { id: cocktailId } })
        .then(() => res.status(204).json({}))
        .catch(err => res.status(500).json({ message: "Database error", error: err }))
}

exports.deleteCocktail = (req, res) => {
    let cocktailId = parseInt(req.params.id)

    if(!cocktailId) {
        return res.status(400).json({ message: "Missing parameter" })
    }

    db.Cocktail.destroy({ where: { id: cocktailId }, force: true })
        .then(() => res.status(204).json({}))
        .catch(err => res.status(500).json({ message: "Database error", error: err }))
}