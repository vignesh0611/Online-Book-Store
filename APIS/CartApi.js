//create route obj
const { request, response } = require("express");
const express = require("express")
const cartApiObj = express.Router()
const expressAsyncHandler=require("express-async-handler")
const checkToken = require("./Middleware/TokenMiddleware")

cartApiObj.use(express.json())
let cartCollection;
cartApiObj.use((request,response,next)=>{
    cartCollection = request.app.get("cartCollection")
    next()
})

// add cart iteams and quantity to db
cartApiObj.post("/addItemToCart",checkToken,expressAsyncHandler(async(request,response)=>{
    const { books,quantity } = request.body
    //console.log("books12323",books)
    const email = request.email
    const cartOfUser = await cartCollection.findOne({ email })
    if (cartOfUser) {
        if(JSON.stringify(cartOfUser).includes(JSON.stringify(books))){
            await cartCollection.updateOne({"email":email,"cart.books":books},{$inc:{"cart.$.quantity":quantity}})
        }
        else{
            await cartCollection.updateOne({email},{$push: {cart:{books,quantity}}})
        }
    } else {
        await cartCollection.insertOne({ email, cart: [{books,quantity}] })
    }
    response.status(201).json({status: "success",message: "item added"})
}))

// get cart items and quantity from db
cartApiObj.get("/getCartItems", checkToken, expressAsyncHandler(async (request, response) => {
    const email = request.email
    //console.log("cart email",email)
    const cartItems = await cartCollection.findOne({ email })
    response.status(200).json({status: "success",payload: cartItems?.cart,cartemail:cartItems.email})
    //console.log(cartItems.cart)
}))

// update cart iteams and quantity in db
cartApiObj.post("/updateCart", checkToken, expressAsyncHandler(async (request, response) => {
    const { books, quantity } = request.body
    const email = request.email
    await cartCollection.updateOne({ "email": email, "cart.books": books }, { $set: { "cart.$.quantity": quantity } })
    response.status(201).json({
        status: "success",
        message: "quantity updated"
    })
}))

//remove cart items from db
cartApiObj.post("/removeItemFromCart", checkToken, expressAsyncHandler(async (request, response) => {
    const { books } = request.body
    const email = request.email
    await cartCollection.updateOne({ email }, { $pull: { cart: { "books": books } } })
    response.status(200).json({
        status: "success",
        message: "item deleted"
    })
}))

//export module
module.exports = cartApiObj