import {model, Schema } from "mongoose";
const VerfiyTokenSchema = new Schema({
    user_id :{type:String, required:true},
    secrete_number: {type:String, required:true},
    expiry_date: {type:Date, required:true},
    type: {type:String, required:true}
})

//create a model
let VerifTokenModel = model("VerifyToken", VerfiyTokenSchema)

