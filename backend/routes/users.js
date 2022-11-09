const express = require("express")
const userCtrl = require("../controllers/user")

let router = express.Router()

router.use((req, res, next) => {
    const event = new Date()
    console.log("USER Time:", event.toString())
    next()
})


router.get("/", userCtrl.getAllUsers)
router.get("/:id", userCtrl.getUser)
router.patch("/:id", userCtrl.updateUser)
router.post("/untrash/:id", userCtrl.untrashUser)
router.delete("/trash/:id", userCtrl.trashUser)
router.delete("/:id", userCtrl.deleteUser)

module.exports = router