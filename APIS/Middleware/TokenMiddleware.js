const jwt = require("jsonwebtoken")
require("dotenv").config()
const checkToken = (request,response,next)=>{
    //get token
    const token = request.headers.authorization.split(" ")[1]

    if (token === "null") {
        throw new Error("token not available")
    }

    const { email } = jwt.verify(token, process.env.SECRET)
    request.email = email
    //console.log(request.email)
    next()
}

module.exports = checkToken