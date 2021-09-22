//create route obj
const { request, response } = require("express");
const express = require("express")
const categoryApiObj = express.Router()
const expressAsyncHandler=require("express-async-handler")
const checkToken = require("./Middleware/TokenMiddleware")
const objectID = require("mongodb").ObjectId
categoryApiObj.use(express.json())
let categoryCollection;
categoryApiObj.use((request,response,next)=>{
    categoryCollection = request.app.get("categoryCollection")
    next()
})
//get products
categoryApiObj.get("/getcategory",async(request,response)=>{
    let category = await categoryCollection.find().toArray()
    response.send({message:"category",payload:category})
})

// Add category
categoryApiObj.post("/addToCategory", checkToken, expressAsyncHandler(async (request, response) => {
    const category = request.body
    await categoryCollection.insertOne(category)
    response.status(201).json({
        status: "success",
        message: "category added"
    })
}))

// Delete category
categoryApiObj.post("/deletefromCategory", checkToken, expressAsyncHandler(async (request, response) => {
    const category = request.body
    await categoryCollection.deleteOne({ category: category.category })
    response.status(200).json({
        status: "success",
        message: "category deleted"
    })
}))

// Update category
categoryApiObj.post("/updatetoCategory", checkToken, expressAsyncHandler(async (request, response) => {
    const category = request.body
    await categoryCollection.updateOne({ _id: new objectID(category._id) }, { $set: { category: category.category } })
    response.status(200).json({
        status: "success",
        message: "category updated"
    })
}))

//export module
module.exports = categoryApiObj