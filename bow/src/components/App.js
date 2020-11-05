import React, { Component } from 'react';
import {
  Route, Switch, Redirect,
} from 'react-router-dom';
import { connect } from 'react-redux';
import Landing from './Landing';
import Spinner from './Spinner';
import PageNotFound from './ErrorPage';
import * as actions from '../actions';
import Signup from './Signup';
import Login from './Login';
import NavBar from './NavBar';
import Organization from './Organization';
import Services from './Services';
import Policy from './Policy';
import ContactUs from './ContactUs';
import * as ROUTES from '../constants/routes';

const PrivateRoute = ({
  loggedIn, component, ...rest
}) => (
    <Route
      {...rest}
      component={loggedIn ? component : Landing}
    />
  );

class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    document.body.classList.add('has-navbar-fixed-top');
    document.body.classList.add('has-spaced-navbar-fixed-top');
    return this.props.loadState === 0 ? (
      <>
        <NavBar />
        <Switch>
          <PrivateRoute
            exact
            path="/"
            // component={Landing}
            component={null}
            // loggedIn={this.props.auth}
            loggedIn={false}
            // accountSetup={this.props.auth.isSetup}
            accountSetup={false}
          />
          <Route path={ROUTES.ORGANIZATION} component={Organization} />
          <Route path={ROUTES.SERVICES} component={Services} />
          <Route path={ROUTES.POLICY} component={Policy} />
          <Route path={ROUTES.CONTACT_US} component={ContactUs} />
          <Route exact path={ROUTES.SIGN_UP} component={Signup} loggedIn={false} accountSetup={false} />
          <Route exact path={ROUTES.LOGIN} component={Login} loggedIn={false} accountSetup={false} />
          <Route component={PageNotFound} />
          {this.props.auth ? <></> : <Redirect from="/*" to="/" />}
        </Switch>
        <Route
          render={({ history }) => {
            // Auto-update service worker on route change
            history.listen(() => {
              if (window.swUpdate === true) {
                // console.log('Reloading');
                window.location.reload();
              }
            });
            return null;
          }}
        />
      </>
    ) : (this.props.loadState === 1) ? (
      <Spinner fullPage />
    ) : (
          <>
            <NavBar />
            <Spinner fullPage />
          </>
        );
  }
}

function mapStateToProps({ auth, loadState }) {
  return { auth, loadState };
}

export default connect(
  mapStateToProps,
  actions,
)(App);
