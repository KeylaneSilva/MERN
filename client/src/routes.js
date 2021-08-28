import React from "react";

import { BrowserRouter, Switch, Route} from 'react-router-dom';

// IMPORT ADMIN
import Dashboard from './pages/admin/dashboard';
import Login from './pages/admin/login/index'

import Produtos from './pages/admin/produtos';
import ProdutoCadastrar from './pages/admin/produtos/produtos.cadastrar';
import ProdutoEditar from './pages/admin/produtos/produtos.editar';

import Usuarios from './pages/admin/usuarios';
import UsuarioCadastrar from './pages/admin/usuarios/usuarios.cadastrar';
import UsuarioEditar from './pages/admin/usuarios/usuarios.editar';

// IMPORT CLIENT
import Home from './pages/client/home';
import ProdutosDetails from './pages/client/produtos/produtos.details';


export default function Routes(){
    return(
        <BrowserRouter>
            <Switch>
                {/* Rota Cliente */}
                <Route path="/" exact component={Home} />
                <Route path="/produtos/:idProduto" exact component={ProdutosDetails} />

                {/* Rota Admin */}
                <Route path="/admin" exact component={Dashboard} />
                <Route path="/admin/login" exact component={Login} />

                <Route path="/admin/produtos" exact component={Produtos} />
                <Route path="/admin/produtos/cadastrar" exact component={ProdutoCadastrar} />
                <Route path="/admin/produtos/editar/:idProduto" exact component={ProdutoEditar} />

                <Route path="/admin/usuarios" exact component={Usuarios} />
                <Route path="/admin/usuarios/cadastrar" exact component={UsuarioCadastrar} />
                <Route path="/admin/usuarios/editar/:idUsuario" exact component={UsuarioEditar} />
            </Switch>
        </BrowserRouter>
    )
} 


