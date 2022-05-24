var express = require('express');
var router = express.Router();

module.exports = router.post('/', (req,res)=>{
    console,log(req.body)
    const {name, lastName} = req.body
    res.send(`Usuario ${name} ${lastName} creado con éxito`)
})