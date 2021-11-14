import React, {Component, Fragment} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch, Redirect} from 'react-router-dom'
import {AllProducts} from './components/AllProducts';
import { Login, Signup } from './components/AuthForm';
import {Home} from './components/Home';
import {me} from './store'
import SingleProduct from './components/SingleProduct';
import Cart from './components/Cart';
import AdminUserList from "./components/AdminUserList";
import AdminPortal from "./components/AdminPortal";
import AdminProductList from "./components/AdminProductList";
import AdminEditProduct from "./components/AdminEditProduct";
import AdminCreateProduct from "./components/AdminCreateProduct";

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData();
  }

  render() {
    const { isLoggedIn } = this.props;

    return (
      <div>
        {isLoggedIn ? (
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/admin-portal" component={AdminPortal} />
            <Route path="/admin-users" component={AdminUserList} />
            <Route exact path="/admin-products" component={AdminProductList} />
            <Route
              path="/admin-products/create"
              component={AdminCreateProduct}
            />
            <Route exact path="/products" component={AllProducts} />
            <Route exact path="/products/:id" component={SingleProduct} />
            <Route path="/products/:id/edit" component={AdminEditProduct} />
            <Redirect to="/" />
          </Switch>
        ) : (
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <Route exact path="/products" component={AllProducts} />
            <Route exact path="/products/:id" component={SingleProduct} />
            <Route exact path="/cart" component={Cart} />
          </Switch>
        )}
      </div>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.auth that has a truthy id.
    // Otherwise, state.auth will be an empty object, and state.auth.id will be falsey
    isLoggedIn: !!state.auth.id,
    isAdmin: state.auth.isAdmin,
  };
};

const mapDispatch = (dispatch) => {
  return {
    loadInitialData() {
      dispatch(me());
    },
  };
};

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes));
