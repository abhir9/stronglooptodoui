import {connect} from 'react-redux';
import {todoAction} from '../_actions';
import React, {Component} from 'react';
import AppBar from '../_components/appbar';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import SvgIcon from '@material-ui/core/SvgIcon';
import {withRouter} from 'react-router-dom';

const jsPDF = require('jspdf');
const drawerWidth = 240;


const styles = theme => ({
      root: {
        flexGrow: 1,
      },

      appFrame: {
        zIndex: 1,
        overflow:
            'hidden',
        position:
            'relative',
        display:
            'flex',
        width:
            '100%',
      }
      ,
      appBar: {
        width: `calc(100% - ${drawerWidth}px)`,
      }
      ,
      'appBar-left':
          {
            marginLeft: drawerWidth,
          }
      ,
      'appBar-right':
          {
            marginRight: drawerWidth,
          }
      ,
      drawerPaper: {
        position: 'relative',
        width:
        drawerWidth,
      }
      ,
      toolbar: theme.mixins.toolbar,
      content:
          {
            flexGrow: 1,
            backgroundColor:
            theme.palette.background.default,
            padding:
            theme.spacing.unit * 3,
          }
      ,

      paper: {
        position: 'absolute',
        width:
        theme.spacing.unit * 50,
        backgroundColor:
        theme.palette.background.paper,
        boxShadow:
            theme.shadows[5],
        padding:
        theme.spacing.unit * 4,
      }
      ,
    })
;

class Todo extends Component {
  constructor(props) {
    super(props);
    this.state = {file: null, loaded: 0};
  }

  componentDidMount() {
    const {dispatch} = this.props;
    dispatch(todoAction.getTodo());
  }

  handleChange = event => {
    this.setState({
      anchor: event.target.value,
    });
  };


  handleDownload = (event, id) => {
    const {dispatch} = this.props;
    dispatch(todoAction.downloadTodoById(id))
  };
  exportToPdf = (event) => {
    let doc = new jsPDF();
    doc.fromHTML(document.getElementById('tododata'));
    doc.save("AllTodo.pdf");
  }

  handleClick = (event, id) => {
    const {dispatch} = this.props;
    dispatch(todoAction.deleteTodoById(id))
  };

  render() {
    const {classes} = this.props;
    const {todo} = this.props.todo;
    return (
        <div className={classes.root}>
          <div className={classes.appFrame}>
            <AppBar/>
            <main className={classes.content}>
              <div className={classes.toolbar}/>
              <Grid container spacing={24}>
                <Grid item xs={9}>
                </Grid>
                <Grid item xs={3} container justify="flex-end">
                </Grid>
              </Grid>
              <Grid container spacing={24}>
                <Grid item xs={3} container justify="flex-start">
                  <Button onClick={(event) => this.exportToPdf(event)} variant="contained" color="primary" className={classes.button}>
                    Export ToDo
                  </Button>
                </Grid>
                <Grid item xs={6}>
                </Grid>
                <Grid item xs={3} container justify="flex-end">
                  <Button variant="contained" color="primary" className={classes.button} component='a' href="/add-todo">
                    Add Todo
                  </Button>
                </Grid>
              </Grid>
              <br/>
              <br/>
              <Grid container spacing={24}>
                <Paper id="tododata" className={classes.root}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell numeric>Name</TableCell>
                        <TableCell numeric>Priority</TableCell>
                        <TableCell numeric>Attachment</TableCell>
                        <TableCell>Action</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {todo.map(n => {
                        return (
                            <TableRow key={n.id}>
                              <TableCell numeric component="th" scope="row">
                                {n.name}
                              </TableCell>
                              <TableCell numeric>{n.priority}</TableCell>
                              <TableCell numeric>{n.fileName}</TableCell>
                              <TableCell>
                                <IconButton className={classes.button} aria-label="Delete" onClick={(event) => this.handleDownload(event, n.id)}>
                                  <SvgIcon>
                                    <path d="M16 13h-3V3h-2v10H8l4 4 4-4zM4 19v2h16v-2H4z"/>
                                    <path d="M0 0h24v24H0z" fill="none"/>
                                  </SvgIcon>
                                </IconButton>
                                <IconButton className={classes.button} aria-label="Edit" component='a' href={`/edit-todo/${n.id}`}>
                                  <EditIcon/>
                                </IconButton>
                                <IconButton className={classes.button} aria-label="Delete" onClick={(event) => this.handleClick(event, n.id)}>
                                  <DeleteIcon/>
                                </IconButton>
                              </TableCell>
                            </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </Paper>
              </Grid>
            </main>
          </div>
        </div>
    );
  }
}


Todo.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    todo: state.todo
  };
}

const connectedTodoPage = withRouter(connect(mapStateToProps, null, null, {
  pure: false
})(withStyles(styles)(Todo)));

export {connectedTodoPage as Todo};