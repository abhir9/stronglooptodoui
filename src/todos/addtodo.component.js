import React, {Component} from 'react';
import AppBar from '../_components/appbar';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import {connect} from 'react-redux';
import {todoAction} from '../_actions';
import {withRouter} from 'react-router-dom';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Snackbar from '@material-ui/core/Snackbar';

const drawerWidth = 240;

const styles = theme => ({

  root: {
    flexGrow: 1,
  },

  contentRoot: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },

  appFrame: {
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
    width: '100%',
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
  },
  'appBar-left': {
    marginLeft: drawerWidth,
  },
  'appBar-right': {
    marginRight: drawerWidth,
  },
  drawerPaper: {
    position: 'relative',
    width: drawerWidth,
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
  },
});

class AddTodo extends Component {
  constructor(props) {
    super(props);
    this.state = {file: null, loaded: 0,message:null,showMessage:false};
  }
updateNotification =(msg)=>{
    this.setState({
        message:msg,
        showMessage:true
    })
    setTimeout(()=>{
        this.setState({
            message:'',
            showMessage:false
        })
    },2000)
}
  handleChange = prop => event => {
    const {dispatch} = this.props;
    dispatch(todoAction.onChangeProps(prop, event));
  };
  handleChangeFile = prop => event => {
    event.preventDefault();
    let FileSize = event.target.files[0].size / 1024/1024 ; // in MB
      if (FileSize > 0.512) {
          this.updateNotification('File size should not exceeds 512 kb')
      } else {
          this.setState({
              file: event.target.files[0],
              fileName: event.target.files[0].name,
              loaded: 1          })
          this.updateNotification('File Uploaded')
      }
  };

  componentDidMount() {
    const {match: {params}} = this.props;

    if (params.id) {
      const {dispatch} = this.props;
      dispatch(todoAction.getTodoById(params.id));
    }
  }


  handleClick(event) {
    if (this.props.todo.name) {
      const {match: {params}} = this.props;
      const {dispatch} = this.props;
      const payload = new FormData()
      payload.append('file', this.state.file, this.state.fileName,)
      payload.append('name', this.props.todo.name)
      payload.append('priority', this.props.todo.priority ? this.props.todo.priority : this.props.priority)
      payload.append('fileName', this.state.fileName ? this.state.fileName : this.props.fileName)

      if (params.id) {
        dispatch(todoAction.editTodoInfo(params.id, payload));
      } else {
        dispatch(todoAction.createTodo(payload));
      }
    }
    else {
        this.updateNotification('Please check Input Fields')
    }
  }


  render() {
    const {classes} = this.props;
    const {match: {params}} = this.props;
    function InsertText(props) {
      return <Typography>{'Add New Todo'}</Typography>;
    }

    function EditText(props) {
      return <Typography>{'Edit Todo'}</Typography>;
    }

    function SegHeader() {
      if (params.id) {
        return <EditText/>;
      }
      return <InsertText/>;
    }


    return (
        <div className={classes.root}>
          <div className={classes.appFrame}>
            <AppBar/>
            <main className={classes.content}>
              <div className={classes.toolbar}/>
              <Grid container spacing={24}>
                <Grid item xs={3}>
                  <SegHeader/>
                </Grid>
                <Grid item xs={6}>
                  <Snackbar
                      anchorOrigin={{ vertical:"top", horizontal:"right" }}
                      open={this.state.showMessage}
                      ContentProps={{
                          'aria-describedby': 'message-id',
                      }}
                      message={<span id="message-id">{this.state.message}</span>}
                  />
                </Grid>
                <Grid item xs={3} container justify="flex-end">
                </Grid>
              </Grid>
              <br/>
              <br/>
              <Grid container spacing={24}>
                <Grid item xs={12}>
                  <div>
                    <Paper className={classes.contentRoot} elevation={1}>
                      <form className={classes.container}>
                        <Grid container spacing={24}>
                          <Grid item xs={4}>
                            <TextField
                                id="name"
                                label="Name"
                                className={classes.textField}
                                value={this.props.todo.name}
                                onChange={this.handleChange('name')}
                                margin="normal"
                            />
                          </Grid>
                          <Grid item xs={4}>
                            <Select style={{width: '60%', marginTop: 30}}
                                    id="attachment"
                                    label="Attachment"
                                    value={this.props.todo.priority ? this.props.todo.priority : this.props.priority}
                                    onChange={this.handleChange('priority')}>
                              <MenuItem value={'High'}>High</MenuItem>
                              <MenuItem value={'Medium'}>Medium</MenuItem>
                              <MenuItem value={'Low'}>Low</MenuItem>
                            </Select>
                          </Grid>
                          <Grid item xs={4}>
                            <input
                                accept="image/*"
                                className={classes.input}
                                id="contained-button-file"
                                multiple
                                type="file"
                                style={{display: 'none'}}
                                onChange={this.handleChangeFile('file')}
                            />

                            <label htmlFor="contained-button-file">
                              <Button style={{marginTop: 30}} variant="contained" component="span" className={classes.button}>
                                  {this.state.loaded===1?this.state.fileName:'Upload Attachment'}
                              </Button>
                            </label>
                          </Grid>
                        </Grid>
                        <br/>
                        <Grid container spacing={24}>
                          <Grid item xs={3}>
                          </Grid>
                          <Grid item xs={6}>
                          </Grid>
                          <Grid item xs={3} container justify="center">
                            <Grid container spacing={24}>
                              <Grid item xs={6} container justify="center">
                                <Button variant="contained" color="secondary" className={classes.button} component='a' href="/todo">
                                  Cancel
                                </Button>
                              </Grid>
                              <Grid item xs={6} container justify="flex-start">
                                <Button variant="contained" color="primary" className={classes.button} onClick={(event) => this.handleClick(event)}>
                                  Save
                                </Button>
                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid>
                      </form>
                    </Paper>
                  </div>
                </Grid>
              </Grid>
            </main>
          </div>
        </div>
    );
  }
}

//export default Home;

AddTodo.propTypes = {
  classes: PropTypes.object.isRequired,
};
AddTodo.defaultProps = {
  priority: 'High',
  fileName: 'No Attachment'
};


//export default BoxCon
const mapStateToProps = (state) => {
  return state;
}


const connectedAddTodoPage = withRouter(connect(mapStateToProps, null, null, {
  pure: false
})(withStyles(styles)(AddTodo)));

export {connectedAddTodoPage as AddTodo};