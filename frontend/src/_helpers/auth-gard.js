import router from "@/router" 

export function authGard(to) {
    let token = localStorage.getItem("token")

    if(token) {
        return true
    }

    router.push("/login")
}