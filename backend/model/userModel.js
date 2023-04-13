const mongoose=require('mongoose')

const UserSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,'Name is required'],
        trim:true,
        minlength:3
    },
    email:{
        type:String,
        unique:true,
        required:[true, 'Email is required'],
        trim:true
    },
    mobile:{
        type:String,
        unique:true,
        required:['Mobile number is required'],
        trim:true
    },
    address:{
        type:String,
        trim:true,
        default:""
    },
    profileImage:{
        type:Object,
        default:{}
    },
    password:{
        type:String,
        required:[true,'Password is required'],
        trim:true
    },
    role:{
        type:String,
        enum:['user','admin','trainer'],
        trim:true,
        default:'user'
    },
    isActive:{
        type:Boolean,
        default: true
    }
},{
    collection:"user",
    timestamps:true
})


module.exports=mongoose.model("User",UserSchema)