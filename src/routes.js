const express = require('express');
const routes = express.Router();

const Usuario = require('./controllers/usuarios.controller')

routes.get('/usuarios', Usuario.index);


// Rotas Usuário
routes.get('/api/usuarios', Usuario.index);
routes.post('/api/usuarios', Usuario.create);
routes.get('/api/usuarios.details/:_id', Usuario.details)

module.exports = routes;

