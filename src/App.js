import React, { Component, Suspense, lazy } from "react";
import { Switch } from "react-router-dom";
import AppBar from "./components/AppBar/AppBar";
import Loader from "./components/Loader/Loader";
import authOperations from "./redux/auth/auth-operations";
import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRoute";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const HomePage = lazy(() =>
  import("./views/HomeView/HomeView.js" /*webpackChunkName: 'home-page' */)
);
const Register = lazy(() =>
  import(
    "./views/RegisterView/RegisterView.js" /*webpackChunkName: 'register' */
  )
);
const Login = lazy(() =>
  import("./views/LoginView/LoginView.js" /*webpackChunkName: 'Login' */)
);

const PhoneBook = lazy(() =>
  import(
    "./views/PhoneBookView/PhoneBookView.js" /*webpackChunkName: 'phone-book' */
  )
);

class App extends Component {
  static propTypes = {
    onGetCurretnUser: PropTypes.func,
  };
  componentDidMount() {
    this.props.onGetCurretnUser();
  }

  render() {
    return (
      <>
        <AppBar />
        <Suspense fallback={<Loader />}>
          <Switch>
            <PublicRoute exact path="/" component={HomePage} />
            <PublicRoute
              path="/register"
              restricted
              redirectTo="/contacts"
              component={Register}
            />
            <PublicRoute
              path="/login"
              restricted
              redirectTo="/contacts"
              component={Login}
            />
            <PrivateRoute
              path="/contacts"
              redirectTo="/login"
              component={PhoneBook}
            />
          </Switch>
        </Suspense>
      </>
    );
  }
}

const mapDispatchToProps = {
  onGetCurretnUser: authOperations.getCurrentUser,
};

export default connect(null, mapDispatchToProps)(App);
