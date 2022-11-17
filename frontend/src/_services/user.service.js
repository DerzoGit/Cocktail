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

export const userService = {
    getAllUsers,
    getUser,
    updateUser
}