const express = require('express');
const routes = express.Router();

const Usuario = require('./controllers/usuarios.controller')

routes.get('/usuarios', Usuario.index);


// Rotas Usuário
routes.get('/api/usuarios', Usuario.index);
routes.post('/api/usuarios', Usuario.create);
routes.get('/api/usuarios.details/:_id', Usuario.details)
routes.delete('/api/usuarios.delete/:_id', Usuario.delete)
routes.put('/api/usuarios.update', Usuario.update)

module.exports = routes;

