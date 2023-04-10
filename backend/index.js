const  express=require('express')
const cors=require('cors')
const cookieParser=require('cookie-parser')

require('dotenv').config()

const PORT=process.env.PORT ||6000

//ref to express
const app=express()

//configure body parser and json
app.use(express.urlencoded({extended:true}))
app.use(express.json())

//middleware
app.use(cors())
app.use(cookieParser())

//default route
app.use(`**`,(req,res)=>{
    return res.status(404).json({msg:`Requested path Not Found..`})
})

//listen

function launchServer(){
    app.listen(PORT,async()=>{
    console.log(`server is started @ http://localhost:${PORT}`)
    })
}
launchServer()