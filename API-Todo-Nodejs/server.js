const express = require('express')
const mysql = require('mysql')
const mycon = require('express-myconnection')
const cors = require('cors')

const routeTodo = require('./Routes/routeTodo')
const routeUser = require('./Routes/routeUser')

const app = express()
app.set('port',process.env.PORT ||  3002)

const dbOptions = {
    host:'localhost',
    port:'3306',
    user:'root',
    password:'password',
    database:'apptodos'
}

//middlewares -----------------------------------------
app.use(mycon(mysql, dbOptions, 'single'))
app.use(express.json())
app.use(cors())

//Config cors -----------------------------------------
const whiteList = [
    'http://127.0.0.1:5173/',
    'http://127.0.0.1:5173/addTodo'
]

const corsOptions = {
    origin: function(origin, callback){
        if(whiteList.index(origin) !== 1){
            callback(null,true)
        }else{
            callback(new Error('Not allowed by cors'))
        }
    }
}

//Routes ----------------------------------------------
app.get('/',cors(corsOptions),(req, res)=>{
    res.send('Welcome to my server')
})

app.use('/todo',cors(),routeTodo)
app.use('/user',cors(),routeUser)

//Server running --------------------------------------
app.listen(app.get('port'),()=>{
    console.log('server runnig on port ', app.get('port'))
})

