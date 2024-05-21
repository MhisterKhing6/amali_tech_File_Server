import { Router } from "express";
import { UserController } from "../controllers/userController.js";
//routes that doesnt involves user verfications

const nonAuthRoute = Router()

/* 
register user
method: post
domain: public
*/
nonAuthRoute.post("/register/customer", async (req, res) => {
    return UserController.register(req, res)
})

export {nonAuthRoute}