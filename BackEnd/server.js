import Express from "express";
import Cors from "cors"
import configuration from "config"
import { connectDb } from "./utils/MongodbConector.js";

//server initializing
const fileServer = Express()

//connect to database
connectDb()

//middlewares
fileServer.use(Cors()) //cross origin communication
fileServer.use(Express.json()) // json body parsing

fileServer.get("/", (req, res) => {
    return res.send("ok i am working")
})

fileServer.listen(configuration.host.port,configuration.host.ip, () => {
    console.log(`app is listening at http://${configuration.host.ip}:${configuration.host.port}`)
})