const { findOne } = require('../models/usuario.model');
const Usuario = require('../models/usuario.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secret = 'myscret';

module.exports = {
    async index(req, res){
        const user = await Usuario.find();
        res.json(user);
    },
    async create(req,res){
        const {nome_usuario, email_usuario, tipo_usuario, senha_usuario} = req.body;
        let data = {};

        // Verificar se o email já existe
        let user = await Usuario.findOne({email_usuario});

        if(!user){
            data = {nome_usuario,email_usuario,tipo_usuario,senha_usuario};
            user = await Usuario.create(data);

            return res.status(200).json(user);
        }else{
            return res.status(500).json(user);
        }
    },
    async details(req,res){
        const {_id} = req.params;
        const user = await Usuario.findOne({_id});
        res.json(user);
    },
    async delete(req, res){
        const {_id} = req.params;
        const user = await Usuario.findByIdAndDelete({_id});
        return res.json(user);
    },
    async update(req, res){
        const {_id, nome_usuario, email_usuario, senha_usuario, tipo_usuario} = req.body;
        const data = {nome_usuario, email_usuario, senha_usuario, tipo_usuario};
        const user = await Usuario.findOneAndUpdate({_id}, data, {new:true});
        return res.json(user);
    },
    async login(req, res){
        const { email, senha } = req.body;
        Usuario.findOne({email_usuario: email}, function(err,user){
            if(err){
                console.log(err);
                res.status(200).json({erro: 'Erro no servidor, por favor, tente novamente'});
            }else if(!user){
                res.status(200).json({status:2, erro: 'Email não cadastrado'});
            }else{
                user.isCorrectPassword(senha, async function(err, same){
                    if(err){
                        res.status(200).json({erro: 'Erro no servidor, por favor, tente novamente'});
                    }else if(!same){
                        res.status(200).json({status:2, erro: 'A senha não confere'});
                    }else{
                        const payload = { email };
                        const token = jwt.sign(payload, secret, {
                            expiresIn: '24h'
                        })
                        res.cookie('token', token, {httpOnly: true});
                        res.status(200).json({status:1, auth:true, token:token,id_client: user.id,user_name:user.nome_usuario});
                    }
                })
            }
        })

    }

}