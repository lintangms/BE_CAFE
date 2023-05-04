const express = require(`express`)
const app = express()

app.use(express.json())

// call transaksiController
let transaksiController = require("../controller/transaksi.controller")
const { authorizeKasir } = require(`../controller/auth.controller`)

// endpoint get data transaksi
app.get("/", [authorizeKasir],transaksiController.getAlltransaksi)

// endpoint add data transaksi
app.post("/", [authorizeKasir],transaksiController.addtransaksi)

app.put("/:id", [authorizeKasir],transaksiController.updatetransaksi)
app.delete("/:id", [authorizeKasir],transaksiController.deletetransaksi)


module.exports = app