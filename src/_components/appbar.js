import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {withStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import {userActions} from '../_actions';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

const drawerWidth = 240;

const styles = theme => ({
  root: {
    flexGrow: 1

  },
  rightToolbar: {
    marginLeft: 'auto'
  },
  appFrame: {
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
    width: '100%'
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

class PermanentDrawer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {anchor: 'left'};
  }

  logout = event => {
    const {dispatch} = this.props;
    dispatch(userActions.logout());
  }

  render() {
    const {classes} = this.props;
    const {anchor} = this.state;

    return (
        <AppBar
            position="absolute"
            className={classNames(classes.appBar, classes[`appBar-${anchor}`])}
        >
          <Toolbar>
            <Typography variant="title" color="inherit" noWrap>
              ToDo
            </Typography>
            <section className={classes.rightToolbar}>
              <IconButton color="inherit" aria-label="Edit" onClick={(event) => {
                this.logout()
              }}>
                LogOut
              </IconButton>
            </section>
          </Toolbar>
        </AppBar>
    );
  }
}

PermanentDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return state;
}

const Appbar = withRouter(connect(mapStateToProps, null, null, {
  pure: false
})(withStyles(styles)(PermanentDrawer)));
export default Appbar;


