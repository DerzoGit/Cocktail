const express = require("express")
const cors = require("cors")

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get("/", (req, res) => res.send("I'm online"))
app.get("*", (req, res) => res.status(501).send("Where the hell are you going ?"))

app.listen(3000, () => {
    console.log("This server is running on port 3000. Have fun")
})