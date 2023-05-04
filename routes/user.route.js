const express = require(`express`)
const app = express()
app.use(express.json())
const userController = require(`../controller/user.controller`)
const { authorizeAdmin } = require(`../controller/auth.controller`)

//endpoint
app.get("/", [authorizeAdmin],userController.getAllUser)
app.post("/", [authorizeAdmin],userController.addUser)
app.put("/:id", [authorizeAdmin],userController.updateUser)
app.delete("/:id", [authorizeAdmin],userController.deleteUser);

module.exports = app