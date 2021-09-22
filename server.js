//carete express app(install: npm i express )
const express = require("express")
const app = express()

//configure dotenv (install: npm i dotenv)
// provides all environment variables to process.env
require("dotenv").config()

// import path module
const path = require("path")

// connect build of react app with express
app.use(express.static(path.join(__dirname,'./build')))

//API import
const categoryApiObj = require("./APIS/categoryAPI")
app.use("/category",categoryApiObj)

const booksApiObj = require("./APIS/booksAPI")
app.use("/books",booksApiObj)

const userApiObj = require("./APIS/UserAPI")
app.use("/user",userApiObj)

const cartApiObj = require("./APIS/CartApi")
app.use("/cart",cartApiObj)

const wishListApiObj = require("./APIS/WishListAPI")
app.use("/wishlist",wishListApiObj)
//mongodb module
const mongoClient = require("mongodb").MongoClient
//database url
const dbURL=process.env.DATABASE_URL
//db connect
mongoClient.connect(dbURL,(error,client)=>{
    if(error){
        console.log("error",error)
    }
    else{
        //get db obj
        let dbObject = client.db("onlinebookstore")
        //get collection from db
        let categoryCollection = dbObject.collection("categorycollection")
        let booksCollection = dbObject.collection("bookscollection")
        let userCollection = dbObject.collection("userscollection")
        let cartCollection = dbObject.collection("cartcollection")
        let wishListCollection = dbObject.collection("wishlistcollection")

        //get to app object
        app.set("categoryCollection",categoryCollection)
        app.set("booksCollection",booksCollection)
        app.set("userCollection",userCollection)
        app.set("cartCollection",cartCollection)
        app.set("wishListCollection",wishListCollection)

        //console to check db connection
        console.log("Connected to db....");
    }
})

// error handling middle ware
app.use((error,request,response,next)=>{
    response.send({message:"Error",reason:error.message})
})
// for page refresh (dealing with unmatched path)
app.get('*',(request,response)=>{
    response.sendFile(path.join(__dirname,'./build','index.html'))
})






//assign port to run
const PORT = process.env.PORT
app.listen(PORT,()=>console.log(`Server listening on port ${PORT}...`))