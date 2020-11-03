import React, { Component } from 'react';
import {
  Route, Switch, Redirect,
} from 'react-router-dom';
import { connect } from 'react-redux';
import Landing from './Landing';
import Spinner from './Spinner';
import PageNotFound from './ErrorPage';
import * as actions from '../actions';


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
    return this.props.loadState === 0 ? (
      <>
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
