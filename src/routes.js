const express = require('express');
const routes = express.Router();

const Usuario = require('./controllers/usuarios.controller')
const Produto = require('./controllers/produtos.controller')

routes.get('/usuarios', Usuario.index);


// Rotas Usuário
routes.get('/api/usuarios', Usuario.index);
routes.post('/api/usuarios', Usuario.create);
routes.get('/api/usuarios.details/:_id', Usuario.details);
routes.delete('/api/usuarios.delete/:_id', Usuario.delete);
routes.put('/api/usuarios.update', Usuario.update);
routes.post('/api/usuarios/login', Usuario.login);

routes.get('/api/usuarios/checktoken', Usuario.checkToken);
routes.get('/api/usuarios/destroytoken', Usuario.destroyToken);


// Rotas Produtos
routes.get('/api/produtos', Produto.index);
routes.post('/api/produtos', Produto.create);
routes.get('/api/produtos.details/:_id', Produto.details);
routes.delete('/api/produtos.delete/:_id', Produto.delete);
routes.put('/api/produtos.update', Produto.update);

module.exports = routes;

