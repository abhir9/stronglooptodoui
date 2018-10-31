import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import {connect} from 'react-redux';
import {userActions} from '../_actions';
import {history} from '../_helpers';
import Typography from '@material-ui/core/Typography';
import Snackbar from '@material-ui/core/Snackbar';
import {withRouter} from 'react-router-dom';
import './signup.component.css'


const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  margin: {
    margin: theme.spacing.unit,
  },
  withoutLabel: {
    marginTop: theme.spacing.unit * 3,
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  selectItem: {
    width: '60%',
  },

  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },

  button: {
    margin: theme.spacing.unit,
  },

  input: {
    display: 'none',
  },
});


class Signup extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      showPassword: false,
      message: '',
        showMessage:false
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({message: nextProps.message});
      this.updateNotification(nextProps.message)
  }

  componentDidMount() {
    if (localStorage.getItem('token')) {
      history.push('/login');
    }
  }
    updateNotification =(msg)=>{
        this.setState({
            message:msg,
            showMessage:msg?true:false
        })
        setTimeout(()=>{
            this.setState({
                message:'',
                showMessage:false
            })
        },2000)
    }
  handleChange = prop => event => {
    this.setState({[prop]: event.target.value});
  };

  signup = event => {
    this.setState({submitted: true});
    const {email, password} = this.state;
    const {dispatch} = this.props;
    if (email && password) {
      dispatch(userActions.signup(email, password));
    }
  }

  render() {
    const {classes} = this.props;

    return (
        <div className="login-margin">
          <Grid container spacing={24}>
            <Grid item xs={3}>
              <Snackbar
                  anchorOrigin={{ vertical:"top", horizontal:"right" }}
                  open={this.state.showMessage}
                  ContentProps={{
                      'aria-describedby': 'message-id',
                  }}
                  message={<span id="message-id">{this.state.message}</span>}
              />
            </Grid>
            <Grid item xs={6}>
              <Paper className={classes.paper}>
                <Typography variant="display1">{'Signup'}</Typography>
              </Paper>
              <Paper className={classes.paper}>
                <div>
                  <TextField
                      label="Email"
                      value={this.state.email}
                      className={classes.textField}
                      onChange={this.handleChange('email')}
                  />
                  <br/>
                  <br/>
                  <TextField
                      label="Password"
                      autoComplete="current-password"
                      type={this.state.showPassword ? 'text' : 'password'}
                      className={classes.textField}
                      value={this.state.password}
                      onChange={this.handleChange('password')}
                  />
                  <br/>
                  <br/>
                  <Button variant="contained" color="primary" className={classes.button} onClick={() => {
                    history.push('/login')
                  }}>
                    Login
                  </Button>
                  <Button variant="contained" color="primary" className={classes.button} onClick={(event) => {
                    this.signup()
                  }}>
                    Signup
                  </Button>
                </div>
              </Paper>
            </Grid>
            <Grid item xs={3}>
            </Grid>
          </Grid>
        </div>
    );
  }
}

Signup.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  const {loggingIn, message} = state.authentication;
  return {
    loggingIn, message
  };
}

const connectedSignupPage = withRouter(connect(mapStateToProps, null, null, {
  pure: false
})(withStyles(styles)(Signup)));

export {connectedSignupPage as Signup};