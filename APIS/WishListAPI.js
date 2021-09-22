const { request, response } = require("express");
const express = require("express")
const wishListApiObj = express.Router()
const expressAsyncHandler=require("express-async-handler")
const checkToken = require("./Middleware/TokenMiddleware")

wishListApiObj.use(express.json())
let wishListCollection;
wishListApiObj.use((request,response,next)=>{
    wishListCollection = request.app.get("wishListCollection")
    next()
})
// adding to wishlist
wishListApiObj.post("/addItemToWishList",checkToken,expressAsyncHandler(async(request,response)=>{
    const { books } = request.body
    //console.log("books12323",books)
    const email = request.email
    await wishListCollection.updateOne({ email },{$addToSet:{wishList:books}},{upsert:true})
    response.status(201).json({status: "success",message: "item added"})
}))
// get from wishlist
wishListApiObj.get("/getItemsfromWishList", checkToken, expressAsyncHandler(async (request, response) => {
    const email = request.email
    //console.log("wish list email:",email)
    //console.log("email11",email);
    const wishListFromDB = await wishListCollection.findOne({ email })
    //console.log("wishListItem",wishListFromDB.wishList)
    response.status(200).json({
        status: "success",
        wishListItems: wishListFromDB.wishList,
        wishlistEmail: wishListFromDB.email
    })
}))
//remove from wishlist
wishListApiObj.post("/removeItemFromWishList", checkToken, expressAsyncHandler(async (request, response) => {
    const { books } = request.body
    const email = request.email
    await wishListCollection.updateOne({ email }, { $pull: { wishList: books } })
    response.status(200).json({
        status: "success",
        message: "item deleted"
    })
}))

module.exports = wishListApiObj