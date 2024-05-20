import {Model, Schema } from "mongoose";
const UserSchema = new Schema({
    name:{type: String, required:true},
    passwordHash: {type:String, required:true},
    email: {type:String, required: true, unique:true},
    emailVerified: {type:Boolean, required: true, default:false},
    role: {type:String, require:true, enum:['customer', 'admin'], default:"customer"}
}, {ecollection:"Users"})

//create a model
let UserModel = Model("User", UserSchema)
export {UserModel}
