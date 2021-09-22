//create route obj
const { request, response } = require("express");
const express = require("express");
const expressAsyncHandler = require("express-async-handler");
const checkToken = require("./Middleware/TokenMiddleware");
const booksApiObj = express.Router()
const objectID = require("mongodb").ObjectId
const multer = require("./Middleware/addImage")

booksApiObj.use(express.json())
let booksCollection;
booksApiObj.use((request,response,next)=>{
    booksCollection = request.app.get("booksCollection")
    next()
})

//get books from db
booksApiObj.get("/getbooks",async(request,response)=>{
    let books = await booksCollection.find().toArray()
    response.send({message:"books",payload:books})
})

// Add Books to db
booksApiObj.post("/addToBook", checkToken,multer.single("bookImage"), expressAsyncHandler(async (request, response) => {
    const book = JSON.parse(request.body.books)
    //console.log("book",book)
    book.bookImage=request.file.path
    await booksCollection.insertOne(book)
    response.status(201).json({
        status: "success",
        message: "book added",
        book:book
    })
}))

// Delete Books from db
booksApiObj.post("/deleteFromBook", checkToken, expressAsyncHandler(async (request, response) => {
    const book = request.body
    await booksCollection.deleteOne({ isbn: book.isbn })
    response.status(200).json({
        status: "success",
        message: "book deleted",
    })
}))

// Update books in db
booksApiObj.post("/updatetobook", checkToken,multer.single("bookImage"), expressAsyncHandler(async (request, response) => {
    const book = JSON.parse(request.body.books)
    //console.log("bookApi",book)
    if(request.file){
        book.bookImage=request.file.path
    }
    const bookID = book._id
    delete book._id
    await booksCollection.updateOne({ _id: new objectID(bookID) }, { $set: book })
    book._id = bookID
    response.status(200).json({
        status: "success",
        message: "book updated",
        book
    })
}))

//export module
module.exports = booksApiObj