import CryptoJS from 'crypto-js';

// encrypting
export const encrypt = plainObject => {
    if(plainObject){
        try{
            return CryptoJS.AES.encrypt(JSON.stringify(plainObject), process.env.REACT_APP_SECRET_CRYPTO).toString()
        }
        catch(error){
            throw error
        }
    }
}

// decrypting
export const decrypt = cipherText => {
    if(cipherText){
        try{
            return JSON.parse(CryptoJS.AES.decrypt(cipherText, process.env.REACT_APP_SECRET_CRYPTO).toString(CryptoJS.enc.Utf8))
        }
        catch(error){
            throw error
        }
    }
}