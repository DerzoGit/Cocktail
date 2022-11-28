import axios from "axios"
import { accountService } from "./account.service"
import router from "@/router"
import store from "@/store"

const Axios = axios.create({
    baseURL: "http://localhost:3000"
})

Axios.interceptors.request.use(request => {
    if(accountService.isLogged()) {
        request.headers.Authorization = "Bearer " +accountService.getToken() 
    }

    return request
})

Axios.interceptors.response.use(response => {
    return response
}, error => {

    if(!error.response) {
        // Network error
        store.commit("displayNotif", { display: true, message: error })
        return Promise.reject(error)
    } else {
        if(error.response.status == 401){
            accountService.logout()
            router.push("/login")
        } else {
            store.commit("displayNotif", { display: true, message: error.response.data.message })
            return Promise.reject(error)
        }
    }

    
})

export default Axios