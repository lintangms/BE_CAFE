const express = require('express')

const app = express()

app.use(express.json())

const mejaController = require('../controller/meja.controller')
const { authorizeAdmin } = require(`../controller/auth.controller`)

app.get("/", [authorizeAdmin], mejaController.getAllMeja)

app.post("/", [authorizeAdmin], mejaController.addMeja)

// app.post("/find", mejaController.findMeja)

app.put("/:id", [authorizeAdmin], mejaController.updateMeja)

app.delete("/:id", [authorizeAdmin], mejaController.deleteMeja)
module.exports = app