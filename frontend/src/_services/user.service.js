import Axios from "./caller.service"

let getAllUsers = () => {
    return Axios.get("/users")
}

let getUser = (userId) => {
    return Axios.get("/users/"+userId)
}

export const userService = {
    getAllUsers,
    getUser
}