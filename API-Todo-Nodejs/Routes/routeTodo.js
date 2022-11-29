const express = require('express')
const routes = express.Router()

//Routes -----------------------------------------

routes.get('/', (req,res)=>{
    //Obtener coneccion
    req.getConnection((err, conn) =>{
        if(err) return res.send(err)
        
        conn.query('SELECT * FROM todo',(err, rows)=>{
            if(err) return res.send(err)

            res.json(rows)
        })
    })
})

routes.post('/:id', (req,res)=>{
    //Obtener coneccion
    req.getConnection((err, conn) =>{
        if(err) return res.send(err)
        
        conn.query('SELECT * FROM todo WHERE created_by = ?',[req.params.id], (err, rows)=>{
            if(err) return res.send(err)

            res.json(rows)
        })
    })
})

routes.post('/', (req,res)=>{
    //Obtener coneccion
    req.getConnection((err, conn) =>{
        if(err) return res.send(err)
        
        conn.query('INSERT INTO  todo set ?', [req.body], (err, rows)=>{
            if(err) return res.send(err)

            res.send('Todo inserted')
        })
    })
})

routes.delete('/:id', (req,res)=>{
    //Obtener coneccion
    req.getConnection((err, conn) =>{
        if(err) return res.send(err)
        
        conn.query('DELETE FROM todo WHERE id = ?', [req.params.id], (err, rows)=>{
            if(err) return res.send(err)

            res.send('Todo Deleted')
        })
    })
})

routes.put('/:id', (req,res)=>{
    //Obtener coneccion
    req.getConnection((err, conn) =>{
        if(err) return res.send(err)
        
        conn.query('UPDATE todo set ? WHERE id = ?', [req.body, req.params.id], (err, rows)=>{
            if(err) return res.send(err)

            res.send('Todo Update')
        })
    })
})


module.exports = routes