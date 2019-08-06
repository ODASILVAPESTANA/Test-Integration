/* ###POST `admision` */
const express = require('express');
const router = express.Router();

const mysqlConnection = require('../database');

router.post('/',(req, res)=>{
    const {nombre, apellido, correo}= req.body;
    const query = 'insert into persona (nombre,apellido,correo) VALUES (?, ?, ?)';
    mysqlConnection.query(query, [nombre, apellido, correo],(err, rows, fields)=>{
        if(!err){
            res.json({status:'Persona Salvada'});
        }else{
            console.log(err);
        }
    });
});

module.exports = router;