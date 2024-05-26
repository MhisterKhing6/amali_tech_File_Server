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
        //increment downloads
        fileDetails = fileDetails.downloads + 1
        //save changes
        await fileDetails.save()
        //send download file
        let fileName = path.basename(fileDetails.filePath)
        return res.download(fileDetails.filePath, fileName)
    }

    static searchFiles = async (req, res) => {
        /**
         * getFiles returns files with pagination
         * @param {object} req: request object
         * @param {object} res : response object
         */
        //get pagination information
        let page = req.query.page
        let limit = req.query.limit 
        //calculate ofset
        if(!(page && limit))
            return res.status(400).json({"message": "pagination information, page and limit not given in query string"})
        //calculate offset
        let offset = (page - 1) * limit
        //check for search patter
        let searchPattern = req.query.title
        //convert + to space
        let results = null
        if(searchPattern) {
            //convert + to space
            let pattern = searchPattern.replace(/\+/g, " ") // spaces are not allowed in url
            //search database with pattern
            results = await FileModel.find({title: new RegExp(pattern, 'i')}).skip(offset).limit(limit).select("title description") //check if title contain serch patter

        }
        else 
            results = await FileModel.find().skip(offset).limit(limit).select("title description")
        //convert id to String 
        let response = results.map(file => {
                return {title: file.title, description:file.description, id:file._id.toString()}
        })
        return res.status(200).json({"totalResults" : response.length, response})
    }
}
export {FileController}