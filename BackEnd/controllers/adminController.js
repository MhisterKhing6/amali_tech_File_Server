/**Controls admin operations */

import { FileModel } from "../models/file.js"
import { getFileNameFromTitle, saveUpolaodFileDisk } from "../utils/FileHandler.js"

class AdminController {
    /** */
    static registerAdmin = async (req, res) => {
        /**
         * register: registers admin, testing purposes
         * @param {object} req: request object
         * @param {object} res: response
         * @returns {object} : json response of user detials
         */
        let userDetails = req.body
        //check if all required user details are given
        if(!(userDetails.email && userDetails.password && userDetails.name))
            return res.status(400).json({"message": "fields missing"})
        //check if the user is already register
        let alreadyUser = await UserModel.findOne({email: userDetails.email})
        if(alreadyUser)
            return res.status(400).json({"message": "user with the same email already registered"})
        
        //save the user to the database
        try {
            let passwordHash = sha1(userDetails.password)
            let userDb = UserModel({role:"admin", emailVerified:true, name:userDetails.name, email:userDetails.email, passwordHash})
            //send verificaion message
            let verificationCode = generateSecretNumber()
            //save information in the Verify token database
            await userDb.save()
            //verify object
            let verifyObject = {"userId":userDb._id.toString(), verificationCode, type:"email"}
            let verifyToken = await new VerifTokenModel(verifyObject).save()
            //asynchroneously send verificatio message
            sendEmailVerification(userDb, verificationCode)
            res.status(201).json({"id": userDb._id, verificationId: verifyToken._id.toString()})
        } catch(err) {
            console.log(err)
            return res.status(501).json({"message": "internal error"})
        }
    }

    static uploadFile = async (req, res) => {
        /**
         * uploadFile: upload file handler for admin users
         * @param {object} req: http request object
         * @param {object} res: http response object
         * @return {object} json response
         */
        let fileDetails = req.body
        //check if all file details are given
        if(!(fileDetails.title && fileDetails.fileName && fileDetails.description && fileDetails.data))
            return res.status(400).json({"message": "fields missing"})
        try {
            //check if the same file has been uploaded
            let uploadedfile = await FileModel.findOne({"title": fileDetails.title})
            if(uploadedfile)
                return res.status(400).json({"message": "a file with the same title has been uploaded"})
            //generate file name for file from the title
            let diskfileName = getFileNameFromTitle(fileDetails.title, fileDetails.fileName)
            if(!diskfileName)
                return res.status(400).json({"message": "cant determine file type"})
            let adminId = req.user._id.toString()
            //save to file
            let filePath = await saveUpolaodFileDisk(adminId, diskfileName, fileDetails.data)
            //check if file is saved
            if(!filePath)
              return res.status(501).json({"message": "couldnt save file to disk"})
            //save file databae entry
            let uploadedFile = await new FileModel({uploadedBy:adminId, title:fileDetails.title, filePath, description:fileDetails.description}).save()
            //return successfully saved response
            return res.status(201).json({"message": "file saved", fileId:uploadedFile._id.toString()})
            
        }catch(err){
            console.log(err)
            res.status(501).json({"message": "internal error"})
        }
        return res.status(200).send("not implemented")
    }

    
    static viewFileStats = async (req, res) => {
        /**
         * uploadFile: upload file handler for admin users
         * @param {object} req: http request object
         * @param {object} res: http response object
         * @return {object} json response
         */
        //get all files in the file database
        let files = await FileModel.find().select("title emailSent downloads")
        return res.status(200).json(files)

    }
}

export {AdminController}