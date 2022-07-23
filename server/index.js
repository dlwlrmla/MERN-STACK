import express from "express"
import { dirname, join } from "path"
import { fileURLToPath } from "url"
import cors from "cors"
import { PORT } from "./config.js"
import taskRoutes from "./routes/tasks.routes.js"


const app = express() 
const __dirname =  dirname(fileURLToPath(import.meta.url))
console.log(__dirname)

app.use(cors())
app.use(express.json())
app.use(taskRoutes)

app.use(express.static(join(__dirname, "../client/dist")))

app.listen(PORT)
console.log(`server escuchando en el puerto ${PORT}`)