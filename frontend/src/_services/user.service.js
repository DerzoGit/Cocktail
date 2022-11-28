import Axios from "./caller.service"

let getAllUsers = () => {
    return Axios.get("/users")
}

let getUser = (userId) => {
    return Axios.get("/users/"+userId)
}

let updateUser = (user) => {
    return Axios.patch("/users/"+user.id, user)
}

let createUser = (user) => {
    return Axios.put("/auth/signup/", user)
}

let deleteUser = (userId) => {
    return Axios.delete("/users/"+userId)
}

export const userService = {
    getAllUsers,
    getUser,
    updateUser,
    createUser,
    deleteUser
}