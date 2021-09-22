const CryptoJS = require("crypto-js")

exports.encrypt = plainObject => {
    return CryptoJS.AES.encrypt(JSON.stringify(plainObject), process.env.REACT_APP_SECRET_CRYPTO).toString()
}

exports.decrypt = cipherText => {
    //console.log("Secret",process.env.REACT_APP_SECRET_CRYPTO)
    return JSON.parse(CryptoJS.AES.decrypt(cipherText, process.env.REACT_APP_SECRET_CRYPTO).toString(CryptoJS.enc.Utf8))
    
}