import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';

import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';

import MenuAdmin from '../../../components/menu-admin';
import Footer from '../../../components/footer-admim';
import api from '../../../services/api';
import { Chip } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
  table: {
    minWidth: 650,
  },
  TableCell:{
    fontSize: '132px'
  }
}));

export default function UsuariosListagem() {
  const classes = useStyles();

  const [usuarios, setUsuarios] = useState([]);
  
  useEffect(() => {
    async function loadUsuarios(){
      const response = await api.get('/api/usuarios');
      // console.log(response.data);
      setUsuarios(response.data);
    }
    loadUsuarios();
  },[])

  async function handleDelete(id){
    if(window.confirm('Deseja realmente excluir esse usuário?')){
      var result = await api.delete('/api/usuarios.delete/'+id);
      window.location.href = '/admin/usuarios';
    }
  }

  return (
    <div className={classes.root}> 
    <MenuAdmin title={'USUÁRIOS'}/>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            <Grid item sm={12}>
            <Paper className={classes.paper}>
                <h2>Listagem de Usuários</h2>
                <Grid item sm={12}>
                <TableContainer component={Paper}>
                    <Table className={classes.table} size="small" aria-label="a dense table">
                      <TableHead>
                        <TableRow>
                          <TableCell align="center"><strong>Nome</strong></TableCell>
                          <TableCell align="center"><strong>Email</strong></TableCell>
                          <TableCell align="center"><strong>Tipo</strong></TableCell>
                          <TableCell align="center"><strong>Data de Cadastro</strong></TableCell>
                          <TableCell align="right"><strong>Opções</strong></TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {usuarios.map((row) => (
                          <TableRow key={row._id}>
                            <TableCell component="th" scope="row" align="center">
                              {row.nome_usuario}
                            </TableCell>
                            <TableCell align="center">{row.email_usuario}</TableCell>
                            <TableCell align="center">{row.tipo_usuario === 1 ?<Chip label='Administrador' color='primary'></Chip> : <Chip label='Funcionário' color='secondary'></Chip>}</TableCell>
                            <TableCell align="center">{new Date(row.createdAt).toLocaleString('pt-br')}</TableCell>
                            <TableCell align="right">
                            <ButtonGroup aria-label="outlined secondary button group">
                            <Button color="primary"
                            href={'/admin/usuarios/editar/' + row._id}>
                              Atualizar
                              </Button>
                            <Button 
                            color="secondary" 
                            onClick={() => handleDelete(row._id)}>
                              Excluir
                            </Button>
                          </ButtonGroup>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
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
