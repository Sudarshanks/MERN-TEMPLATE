const mongoose=require('mongoose')

const connectDB = () => {
    return mongoose.connect(
        process.env.MONGO_URL,
        {
        useNewUrlParser:false
    },(err)=>{
        console.log('mongo db connected successfully')
    })
}

module.exports=connectDB