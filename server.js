const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const path = require('path');
const { ppid } = require('process');
const mongoose = require('mongoose');
const routes = require('./src/routes')

const app = express();
const port = process.env.PORT || 5000;

// CONEXÃO MONGOOSE
    mongoose.connect('mongodb://localhost:27017/curso-basico-mern', {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useFindAndModify: false
    },(err) => {
        if(err){
            console('Houve um erro: '+err)
        }else{
            console.log('MongoDB CONECTADO com sucesso!')
        }
    })

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(routes);
// app.use('/admin', routes);

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`)
})


