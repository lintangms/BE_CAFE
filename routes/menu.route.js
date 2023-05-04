const express = require(`express`)
const app = express()
app.use(express.json())
const menuController = require(`../controller/menu.controller`)
const { authorizeAdmin } = require(`../controller/auth.controller`)

app.get("/getmenu", [authorizeAdmin],menuController.getAllMenu)
app.post("/postmenu", [authorizeAdmin],menuController.addMenu)
app.put("/updatemenu/:id", [authorizeAdmin],menuController.updateMenu)
app.delete("/:id", [authorizeAdmin],menuController.deleteMenu)

module.exports = app