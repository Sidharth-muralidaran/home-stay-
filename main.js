import express from "express"
import bodyParser from "body-parser"
import AdminRouter from "./Router/AdminRouter.js"
import StaffRouter from "./Router/StaffRouter.js"
import { engine } from "express-handlebars"
import path from "path"
import mongoose from 'mongoose'
import db from "./Database/connection.js"
import { dirname } from "path"
import { fileURLToPath } from "url"

const __dirname = dirname(fileURLToPath(import.meta.url))
const app = express()

//setting up template engine
app.set("view engine", "hbs")
app.set("views", path.join(__dirname, "/views"))
app.engine("hbs", engine({ extname: "hbs", defaultLayout: "layout", layoutsDir: path.join(__dirname, "/views/layouts") }))

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//app.use('/admin', AdminRouter)
app.use('/', AdminRouter)
app.use('/staff',StaffRouter)
mongoose.set('strictQuery', false);

db()

app.listen(4000)
