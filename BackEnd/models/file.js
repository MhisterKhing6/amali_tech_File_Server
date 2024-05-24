import {Model, Schema } from "mongoose";
const FileSchema = new Schema({
    title:     {type: String, required:true, unique},
    downloads: {type: Number, default: 0},
    emailSent: {type:Number, default: 0},
    filePath:  {type:String, required:true},
    fileName:  {type:String, required:true},
    updatedAt: {type:Date, default:Date.now},
    uploadedBy:{type:String, required:true}//fk to users

})

//create a model
let FileModel = Model("File", FileSchema)
export {FileModel}
