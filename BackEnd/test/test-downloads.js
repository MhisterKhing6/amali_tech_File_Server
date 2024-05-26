import {assert} from "chai";
import { UserModel } from "../models/user.js";
import request from "supertest"
import { connectDb } from "../utils/MongodbConector.js";
import { fileServer } from "../server.js";
import sha1 from "sha1"
import { generateToken } from "../utils/WebTokenController.js";
import { FileModel } from "../models/file.js";
import { promisify } from "util";
import path from "path";
import { rm} from "fs";

let rmAsync = promisify(rm)

describe("test admin view file stats",  () => {
let verifiedCustomer = {"name": "text2", "password": "text3333", "email": "text323@gmail.com", "role": "admin", "emailVerified": true}
let passwordHash = sha1(verifiedCustomer.password)
let authToken = null

let fileName = "fileName.txt"
let fileContent = "text file content"
let base64Content = Buffer.from(fileContent).toString("base64")
let fileEntry1 = {fileName, data:base64Content, title: "test for upload file 1", description: "test string content"}
let fileId = null
before(async () => {
    await connectDb()
    //register user with admin previlages
    let user = await new UserModel({...verifiedCustomer, passwordHash}).save()
    //get token for user login
    authToken = generateToken({...user})
    //delete all files in the database
    await FileModel.deleteMany()
     fileId =   await request(fileServer)
    .post("/admin/upload-file")
    .set('Authorization', `Bearer ${authToken}`)
    .type('json')
    .send(fileEntry1)
    

})

after(async () => {
    await UserModel.deleteMany()
    await FileModel.deleteMany()
    await rmAsync(path.join(path.resolve("."), "Files"), {recursive:true})

})

it("should return message about pagination information  and 400 status code", async () => {
    let response = await request(fileServer)
    .get(`/user/files/download/"wrongId`)
    .set('Authorization', `Bearer ${authToken}`)
    .type('json')
    assert.equal(response.status, 400)
    assert.isString(response.body.message)
})

xit("should return total result and 200 status code", async () => {
    let response = await request(fileServer)
    .get(`/user/files/download/${fileId}`)
    .set('Authorization', `Bearer ${authToken}`)
    .type('json')
    assert.equal(response.status, 200)
    assert.equal(response.body.totalResults, 0)
})


})