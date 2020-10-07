'use strict'

var express = require('express');
var bodyParser = require('body-parser');

var app = express();

// cargar archivos rutas
var bot_routes = require('./routes/bot');
var contact_routes = require('./routes/contact');



// middlewares
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// Configurar cabeceras y cors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

// rutas

app.get('/test',(req, res) => {
    res.status(200).send({
        message:"Hola Prueba Backend B2B bot"
        });
    });

app.post('/test1',(req,res) => {
    //console.log(res.body.nombre);
    res.status(200).send({
        message:"Hola soy prueba"
        });
    });

    app.get('/chat', (req, res) => res.send('hello!'));


// rutas
app.use('/api', bot_routes);
app.use('/api', contact_routes);


// exportar
module.exports = app;

