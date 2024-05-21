/* 
controls user endpoins operations
*/
/*handles user controller functions */
import { UserModel } from "../models/user.js"
import sha1 from "sha1"
import { generateToken } from "../utils/WebTokenController.js"
class UserController  {

    static register = async (req, res) => {
        /**
         * register: register user to the system
         * @param {object} req: request object
         * @param {object} res: response
         * @returns {object} : json response of user detials
         */
        let userDetails = req.body
        //check if all required user details are given
        if(!(userDetails.email && userDetails.password && userDetails.name && userDetails.type))
            return res.status(400).json({"message": "fields missing"})
        //check if the user is already register
        let alreadyUser = await UserModel.findOne({email: userDetails.email})
        if(alreadyUser)
            return res.status(400).json({"message": "user with the same email already registered"})
        
        //check if the type rigth user role is given
        if(!(userDetails.type === "customer" ))
            return res.status(401).json({"message": "wrong user role"})
        //save the user to the database
        try {
            let passwordHash = sha1(userDetails.password)
            let userDb = UserModel({...userDetails, passwordHash})
            await userDb.save()
            res.status(201).json({"id": userDb._id})
        } catch(err) {
            console.log(err)
            return res.status(501).json({"message": "internal error"})
        }
    }

    static login = async (req, res) => {
        /**
         * register: register user to the system
         * @param {object} req: request object
         * @param {object} res: response
         * @return {object} : json response of user token
         */
        let loginDetails  = req.body
        //check if email and password is given
        try {
            if(!(loginDetails.email && loginDetails.password))
            return res.status(400).json({"message": "fields missing"})
        //check if user has registered
        let user = await UserModel.findOne({email:loginDetails.email})
        if(!user)
            return res.status(401).json({"message": "user hasnt registered"})
        //check if user hash passwrod match login hash passsword
        if(user.passwordHash !== sha1(loginDetails.password))
            return res.status(401).json({"message": "wrong passwrod"})
        //generate token for the user
        let token = generateToken({...user})
        //send token to user
        return res.status(200).json({token, "message": "login successful"})

        }catch(err) {
            console.log(err)
            return res.status(501).json({"message": "internal error"})
        }
        
    }
}

export {UserController}