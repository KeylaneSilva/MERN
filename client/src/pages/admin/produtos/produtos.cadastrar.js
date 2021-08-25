import React, {useState} from 'react';
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

const useStyles = makeStyles((theme) => ({
  root: {display: 'flex',},
  appBarSpacer: theme.mixins.toolbar,
  content: {flexGrow: 1,height: '100vh',overflow: 'auto',},
  container: {paddingTop: theme.spacing(4),paddingBottom: theme.spacing(4),},
  paper: {padding: 30,display: 'flex',overflow: 'auto',flexDirection: 'column',},
  fixedHeight: {height: 240,},
  formControl:{width: '100%'}
}));

export default function ProdutoCadastrar() {
  
  const classes = useStyles();

  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [preco, setPreco] = useState('');
  const [quantidade, setQuantidade] = useState('');

  async function handleSubmit(){
    const data = {
      nome_produto: nome,
      descricao_produto: descricao,
      preco_produto: preco,
      qtd_produto: quantidade
    }
      //api
      if(nome!= '' && descricao!='' && preco !='' && quantidade!=''){
        const response = await api.post('/api/produtos', data);

        if(response.status == 200){
          window.location.href="/admin/produtos"
        }else{
          alert('Erro ao cadastrar o produto!');
        }
      }else{
        alert('Por favor, preencha todos os campos');

      }
  }

  return (
    <div className={classes.root}> 
    <MenuAdmin title={'PRODUTOS'}/>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            <Grid item sm={12}>
              <Paper className={classes.paper}>
                <h2>Cadastro de Produtos</h2>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={12}>
                    <TextField
                      required
                      id="nome"
                      name="nome"
                      label="Nome do produto"
                      fullWidth
                      autoComplete="given-name"
                      value={nome}
                      onChange={e => setNome(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <TextField
                      required
                      type="text"
                      id="descricao"
                      name="descricao"
                      label="Descrição"
                      fullWidth
                      autoComplete="family-name"
                      value={descricao}
                      onChange={e => setDescricao(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                  <TextField
                      required
                      type="number"
                      id="preco"
                      name="preco"
                      label="Preço"
                      fullWidth
                      autoComplete="family-name"
                      value={preco}
                      onChange={e => setPreco(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      type="number"
                      id="quantidade"
                      name="quant_Preco"
                      label="Quantidade"
                      fullWidth
                      autoComplete="family-name"
                      value={quantidade}
                      onChange={e => setQuantidade(e.target.value)}
                    />
                  </Grid>
                  <Grid item sx={12} sm={12}>
                    <Button variant="contained"
                    onClick={handleSubmit}
                    color="primary">
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
