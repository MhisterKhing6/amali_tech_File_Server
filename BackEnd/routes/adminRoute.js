import { Router } from "express";
import { UserController } from "../controllers/userController.js";
import { decodeToken } from "../utils/WebTokenController.js";
import { UserModel } from "../models/user.js";
import { AdminController } from "../controllers/adminController.js";
//routes handles all admin operations

const adminRoute = Router()

//middle to verify admin

adminRoute.use(async (req, res, next) => {
/**
 * retrieves admin information
 */
//get authorization token
let token = getAuthorizationtoken(req)
if(!token)
    return res.status(401).json({"message": "user not login"})
//decode token to get user informaiton
let userDetials = decodeToken(token)
if(!userDetials)
    return res.status(400).json({"message": "token expired login"})
let user = await UserModel.findOne({"email":userDetials.email})
if(!(user && user.role ==="admin"))
    return res.status(401).json({"message": "user doesnt have permission for service"})
//set user to req.user
req.user = user
next()
})

/**
 * upload file to the file server
 * method: post
 * domain: restricted to admin users
 */
adminRoute.post("/upload-file", AdminController.uploadFile)
