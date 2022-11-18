import Axios from "./caller.service"

let getAllCocktails = () => {
    return Axios.get("/cocktails")
}

let getCocktail = (cocktailId) => {
    return Axios.get("/cocktails/"+cocktailId)
}

let updateCocktail = (cocktail) => {
    return Axios.patch("/cocktails/"+cocktail.id, cocktail)
}

let createCocktail = (cocktail) => {
    return Axios.put("/cocktails/", cocktail)
}

let deleteCocktail = (cocktailId) => {
    return Axios.delete("/cocktails/"+cocktailId)
}

export const cocktailService = {
    getAllCocktails,
    getCocktail,
    updateCocktail,
    createCocktail,
    deleteCocktail
}