import React, { Component } from 'react';
import {
  Route, Switch, Redirect,
} from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Element } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js/pure';
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
import Footer from './Footer';
import EditProfile from './EditProfile';
import VesselNameLookup from './VesselNameLookup';
import PasswordReset from './PasswordReset';
import PasswordResetConfirm from './PasswordResetConfirm';
import PrivateRegistration from './PrivateRegistration';
import PrivateRegistrationDetails from './PrivateRegistrationDetails';
import Dashboard from './Dashboard';
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
  constructor(props) {
    super(props);
    this.textboxRef = React.createRef();
  }

  componentDidMount() {
    this.props.onTryAutoSignup();
  }

  render() {
    document.body.classList.add('has-navbar-fixed-top');
    // document.body.classList.add('has-spaced-navbar-fixed-top');
    return this.props.loadState === 0 ? (
      <Router>
        <NavBar textboxRef={this.textboxRef} />
        <Switch>
          <Route path={ROUTES.ORGANIZATION} component={Organization} />
          <Route path={ROUTES.PASSWORD_RESET} component={PasswordReset} />
          <Route path={ROUTES.PASSWORD_RESET_CONFIRM} component={PasswordResetConfirm} />
          <Route path={ROUTES.SERVICES} component={Services} />
          <Route path={ROUTES.POLICY} component={Policy} />
          <Route path={ROUTES.CONTACT_US} component={ContactUs} />
          <Route exact path={ROUTES.SIGN_UP} component={Signup} loggedIn={false} accountSetup={false} />
          <Route exact path={ROUTES.LOGIN} component={Login} loggedIn={false} accountSetup={false} />
          <Route exact path={ROUTES.VESSEL_NAME_LOOKUP} component={VesselNameLookup} loggedIn={false} accountSetup={false} />
          <Route exact path={ROUTES.PRIVATE_REGISTRATION} component={PrivateRegistration} />
          <Route exact path={ROUTES.PRIVATE_REGISTRATION_DETAILS} component={PrivateRegistrationDetails} />
          <Route exact path={ROUTES.DASHBOARD} component={Dashboard} />
          <Route exact path={ROUTES.LANDING} component={Landing} />
          <Route component={PageNotFound} />
          {this.props.auth ? <></> : <Redirect from="/*" to="/" />}
        </Switch>
        <Footer textboxRef={this.textboxRef} />
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
      </Router>
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

const  mapStateToProps = ({ auth, loadState }) => {
  return { auth, loadState };
}

const mapDispatchToProps = (dispatch) => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  };
};


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
