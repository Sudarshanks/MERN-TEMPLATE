const jwt=require('jsonwebtoken')
const crypto=require('crypto')

//generate secrete key using HMAC algorithm

const access_key=process.env.ACCESS_KEY
const key="welcome to Nodejs"

//auth token secrete

const generateKey=()=>{
    return crypto.createHmac('sha1',key).update(access_key).digest('hex')
}
    //jwt token
 const createAccessToken=async(payload)=>{
    let secrete_key=generateKey()
        return jwt.sign(payload,secrete_key,{expiresIn:'1d'}) //if less hr 50*60*1000
}

const sendResponseWithCookie=({res,id})=>{
    const token=createAccessToken(id)
    const oneDay=1000*60*60*24//1day

    res.cookie('token',token,{
        httpOnly:true,
        path:`/api/v1/auth/token/validate`,
        expires:new Date(Date.now()+oneDay),
        signed:true
    })
}

module.exports={createAccessToken,sendResponseWithCookie}