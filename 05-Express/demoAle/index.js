var express = require('express');
const getHtml = require('./routes/getHtml')
// const postUser = require('./routes/postUser')
var app= express();
// var morgan = require('morgan')

//------------MiddleWares-------------------
// app.use(function(req, res, next){
//     console.log('estoy en: ', req.url)
//     next()
// })

// REQ------>middleware----->ruta

// app.use(morgan('dev'))

app.use(express.json())


//---------------------------------------------

//---------------Metodos--------------------------
//---------------Get--------------------------

app.get('/', (req,res)=>{
    // console.log('Estoy en /')
    res.send('estoy en /')
})

// app.get('/html', (req,res)=>{
//     // console.log('estoy en /html')
//     res.send('<h1>estoy en /html</h1>')
// })

app.use('/html', getHtml)

app.get('/obj', (req,res)=>{
    console.log('Estoy en /obj')
    const obj = {nombre: 'Ale', apellido: 'Cabrera'}
    res.json(obj)
})

app.get('/status', (req,res)=>{
    console.log('Estoy en /status')
    res.sendStatus(404)
})

app.get('/msg/status', (req,res)=>{
    console.log('Estoy en /msg/status')
    res.status(400).json({msg: 'lo siento bro'})
})

app.get('/user/saludar', (req,res)=>{
    console.log('estoy en: /user/saludar')
     res.send('Holaaa usuario!!')
 })

app.get('/user/:name', (req,res)=>{
    console.log('SOY PARAMS: ', req.params)
    res.json({user: req.params.name})
    //res.send(req.params.name)
})








app.get('/query', (req,res)=>{
    console.log('Soy las queries: ', req.query)
    const {nombre, apellido} = req.query
   res.send('algo')
})




//----------------Post--------------------------------

// app.post('/users', (req,res)=>{
//     console,log(req.body)
//     const {name, lastName} = req.body
//     res.send(`Usuario ${name} ${lastName} creado con éxito`)
// })

// app.use('/users', postUser)

app.listen(3001);

