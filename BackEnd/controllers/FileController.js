/** use to handle file operations */
import { ObjectId } from "mongodb"
import {FileModel} from "../models/file.js"
import path from "path"
class FileController {
    static downloadFile = async (req, res) => {
        /**
         * downloads a given file given a file Id
         * @param {object} req: http request object
         * @param {object} res : http response object
         */
        //get file id
        let fileId = req.params.fileId
        let fileDetails = await FileModel.findOne({_id: new ObjectId(fileId)})
        //check if if file exist
        if(!fileDetails)
            return res.status(400).json({"id": "wrong file Id"})
        //send download file
        let fileName = path.basename(fileDetails.filePath)
        return res.download(fileDetails.filePath,fileName)
    }
}
export {FileController}