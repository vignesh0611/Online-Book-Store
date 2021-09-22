// create mini exp app
const { request, response } = require("express")
const express=require("express")
const userApiObj=express.Router()
const expressAsyncHandler=require("express-async-handler")
const bcryptjs = require("bcryptjs")
const checkToken = require("./Middleware/TokenMiddleware")
const multer = require("./Middleware/addImage")
const jwt =require("jsonwebtoken")
const objectID = require("mongodb").ObjectId
const { decrypt,encrypt } = require("../Helpers/Encrypt")
const { sendMail } =require("../Helpers/email")
// body parser middleware
userApiObj.use(express.json())
//get usercollection
let usersCollection
let cartCollection
userApiObj.use((request,response,next)=>{
    usersCollection = request.app.get("userCollection")
    next()
})
userApiObj.use((request,response,next)=>{
    cartCollection = request.app.get("cartCollection")
    next()
})

// user register
userApiObj.post("/register",expressAsyncHandler(async(request,response)=>{
    let newUser = request.body
    //newUser = decrypt(newUser.user)
    //console.log("new user",newUser)
    // check for duplicate email
    const user = await usersCollection.findOne({email:newUser.email})
    
    //if user existed, send res as user existed
    if(user){
        response.send({message:"user exist"})
    }
    //else hash password
    else{
        // hash password
        let hashedPassword = await bcryptjs.hash(newUser.password,6)
        //replace plain password with hash password
        newUser.password = hashedPassword
        newUser.accountCreatedIn = new Date().toLocaleString()
        newUser.status = "active"
        //insert user obj to usercollection
        await usersCollection.insertOne(newUser)
        //send response
        response.send({message:"Success"})
    }
}))

//user login
userApiObj.post('/login',expressAsyncHandler(async(request,response)=>{
    // get credential
    let userCredentialObj = request.body
    userCredentialObj = decrypt(userCredentialObj.user)
    //console.log("usercerdentialdecrypt",userCredentialObj)
    // find user by username
    let user = await usersCollection.findOne({email : userCredentialObj.email})
    // if user not exist

    
    if(!user){
        response.send({message:"Invalid email"})
    }
    // if user found
    else {
        //compare password
        let status = await bcryptjs.compare(userCredentialObj.password,user.password)
        //if not equal
        if(status === false){
            response.send({message:"Invalid password"})
        }
        //if password match
        else{
            //console.log("user status",user.status);
            if(user.status === "blocked"){
                response.send({message: "Your Id has been blocked. Contact admin to continue shopping"})
            }
            else{
                await usersCollection.updateOne({email: userCredentialObj.email},{$set: {lastLogin: new Date().toLocaleString()}},{upsert:true})
                // create and send token
                let signedToken = await jwt.sign({email:user.email},process.env.SECRET,{expiresIn:1000})
                user = encrypt(user)
                // Send token in response
                response.send({message:"Success",token:signedToken,user:user})
            }
        }
    }
}))
    // Update User
userApiObj.put("/updateUserData", checkToken, multer.single("profilePicture"), expressAsyncHandler(async (request, response) => {
    let user = JSON.parse(request.body.user)
    //user = decrypt(user.user)
    //console.log("user:",user)
    if (request.file) {
        user.profilePicture = request.file.path
    }
    if (user.email !== user.cartemail) {
        const userDb = await usersCollection.findOne({ email: user.email })
        if (userDb) {
            throw new Error("email already exist")
        }
            await cartCollection.updateOne({ email: user.cartemail }, { $set: { email: user.email } })
    }
    const userId = user._id
    delete user._id
    delete user.cartemail
    let userObject = await usersCollection.updateOne({ _id: new objectID(userId) }, { $set: user })
    user._id = userId
    userget = user
    user = JSON.stringify(user)
    response.status(201).json({
        status: "success",
        message: "user updated",
        user: userget
    })
}))

// get users 
userApiObj.get("/getusers", checkToken, expressAsyncHandler(async (request, response) => {
    //console.log("request save");
    const usersDB = await usersCollection.find().toArray()
    //console.log("userdb",usersDB);
    response.status(200).json({
        status: "success",
        message: "users collection",
        users: usersDB
    })
}))

// update role
userApiObj.put("/updaterole", checkToken, expressAsyncHandler(async (request, response) => {
    const userUpdateState = request.body
    if (userUpdateState.status) {
        if(userUpdateState.status === "blocked"){
            sendMail(userUpdateState,"Your Account is Blocked",
            `\rHi ${userUpdateState.name},
            
            \rYour "My Book Shelf" account has been blocked. Please contact My Book shelf admin to unblock your account.
            
            \rThanks and Regards,
            \rMy Book Shelf team.`)
        }
        else{
            sendMail(userUpdateState,"Your Account is Unblocked",
            `\rHi ${userUpdateState.name},
            
            \rYour "My Book Shelf" account has been unblocked. Login to continue shopping.
            
            \rThanks and Regards,
            \rMy Book Shelf team.`)
        }
        await usersCollection.updateOne({ email: userUpdateState.email }, { $set: { status: userUpdateState.status } })
    }
    if (userUpdateState.role) {
        await usersCollection.updateOne({ email: userUpdateState.email }, { $set: { role: userUpdateState.role } })
    }
    response.status(200).json({
        status: "success",
        message: "role updated"
    })
}))

module.exports = userApiObj