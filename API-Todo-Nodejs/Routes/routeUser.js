const express = require('express')
const routes = express.Router()

//Routes -----------------------------------------
routes.get('/', (req,res)=>{
    //Obtener coneccion
    req.getConnection((err, conn) =>{
        if(err) return res.send(err)
        
        conn.query('SELECT * FROM user', (err, rows)=>{
            if(err) return res.send(err)

            res.json(rows)
        })
    })
})

routes.post('/login', (req,res)=>{
    const {user, pass} = req.body

    const values = [user,pass]

    console.log(user)

    req.getConnection((err, conn) =>{
        if(err) return res.send(err)
        
        conn.query('SELECT * FROM user Where user = ? AND pass = ?',values,
        (err, result)=>{
            if(err){
                res.status(500).send(err)
            }else{
                if(result.length > 0){
                    res.status(200).send({
                        "id":result[0].id,
                        "user":result[0].user
                    })
                }else{
                    res.status(400).send('User doesnt exist')
                }
            }
        })
    })
})

routes.post('/', (req,res)=>{
    //Obtener coneccion
    req.getConnection((err, conn) =>{
        if(err) return res.send(err)
        
        conn.query('INSERT INTO  user set ?', [req.body], (err, rows)=>{
            if(err) return res.send(err)

            res.send('User inserted')
        })
    })
})

module.exports = routes