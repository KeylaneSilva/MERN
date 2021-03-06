import React, {useEffect, useState} from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';

import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';

import MenuAdmin from '../../../components/menu-admin';
import Footer from '../../../components/footer-admim';
import api from '../../../services/api';

import { useParams } from 'react-router-dom'; 

const useStyles = makeStyles((theme) => ({
  root: {display: 'flex',},
  appBarSpacer: theme.mixins.toolbar,
  content: {flexGrow: 1,height: '100vh',overflow: 'auto',},
  container: {paddingTop: theme.spacing(4),paddingBottom: theme.spacing(4),},
  paper: {padding: 30,display: 'flex',overflow: 'auto',flexDirection: 'column',},
  fixedHeight: {height: 240,},
  formControl:{width: '100%'}
}));

export default function UsuarioEditar() {
  
  const classes = useStyles();

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [tipo, setTipo] = useState('');

  const { idUsuario } = useParams(); // Pega o id da url

  useEffect(() => {
    async function getUsuario(){
      var response = await api.get('/api/usuarios.details/' +idUsuario);
      // console.log(response)
      setNome(response.data.nome_usuario);
      setEmail(response.data.email_usuario);
      setTipo(response.data.tipo_usuario);
      setSenha(response.data.senha_usuario);
    }
    getUsuario();
  },[])

  async function handleSubmit(){
    const data = {
      nome_usuario: nome,
      email_usuario: email,
      senha_usuario: senha,
      tipo_usuario: tipo,
      _id: idUsuario,
    }
      //api
      if(nome!= '' && email!='' && senha !='' && tipo!=''){
        const response = await api.put('/api/usuarios.update', data);

        if(response.status == 200){
          window.location.href="/admin/usuarios"
        }else{
          alert('Erro ao atualizar o usu??rio!');
        }
      }else{
        alert('Por favor, preencha todos os campos');

      }
  }

  return (
    <div className={classes.root}> 
    <MenuAdmin title={'USU??RIOS'}/>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            <Grid item sm={12}>
              <Paper className={classes.paper}>
                <h2>Editar Usu??rio</h2>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={12}>
                    <TextField
                      required
                      id="nome"
                      name="nome"
                      label="Nome completo"
                      fullWidth
                      autoComplete="given-name"
                      value={nome}
                      onChange={e => setNome(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      type="email"
                      id="email"
                      name="email"
                      label="Email"
                      fullWidth
                      autoComplete="family-name"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <FormControl 
                      required 
                      className={classes.formControl}
                    >
                      <InputLabel id="demo-simple-select-label">Tipo</InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={tipo}
                        onChange={e => setTipo(e.target.value)}
                      >
                        <MenuItem value={1}><strong>Administrador</strong></MenuItem>
                        <MenuItem value={2}><strong>Funcion??rio</strong></MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <TextField
                      required
                      type="password"
                      id="senha"
                      name="senha"
                      label="Senha"
                      fullWidth
                      autoComplete="family-name"
                      valeu={senha}
                      onChange={e => setSenha(e.target.value)}
                    />
                  </Grid>
                  <Grid item sx={12} sm={12}>
                    <Button onClick={handleSubmit} variant="contained" color="primary">
                      Salvar
                    </Button>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          </Grid>
          <Box pt={4}>
            <Footer />
          </Box>
        </Container>
      </main>
    </div>
  );
}
