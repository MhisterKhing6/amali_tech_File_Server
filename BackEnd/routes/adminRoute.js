import { Router } from "express";
import { UserController } from "../controllers/userController.js";
//routes handles all admin operations

const adminRoute = Router()

//middle to verify admin

adminRoute.use(async (req, res, next) => {
//check if authenticaion admin has has registered


})
