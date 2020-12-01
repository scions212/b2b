'use strict'

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const morgan = require('morgan');

// cargar archivos rutas


var user_routes = require('./routes/user');
var group_routes= require('./routes/group');
var message_routes= require('./routes/message');
var contact_routes = require('./routes/contact');




// middlewares
app.use(morgan('dev'));
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


app.use('/api', user_routes);
app.use('/api', group_routes);
app.use('/api', message_routes);
app.use('/api', contact_routes);




// exportar
module.exports = app;

