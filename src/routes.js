import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';

import {PrivateRoute} from './_components';

import asyncComponent from './AsyncComponent';

// Dynamically imported components
const Home = asyncComponent(() =>
    import('./Content/Home/Home').then(module => module.default)
)

const Login = asyncComponent(() =>
    import('./Authenticate/Login').then(module => module.default)
)

const Logout = asyncComponent(() =>
    import('./Authenticate/Logout').then(module => module.default)
)

const ForgotPassword = asyncComponent(() =>
    import('./Authenticate/ForgotPassword').then(module => module.default)
)

const ResetPassword = asyncComponent(() =>
    import('./Authenticate/ResetPassword').then(module => module.default)
)

const UserList = asyncComponent(() =>
    import('./Content/User/UserList').then(module => module.default)
)

const UserForm = asyncComponent(() =>
    import('./Content/User/UserForm').then(module => module.default)
)

const ContactUs = asyncComponent(() =>
    import('./Content/ContactUs/ContactUs').then(module => module.default)
)

const QueryList = asyncComponent(() =>
    import('./Content/ContactUs/QueryList').then(module => module.default)
)

const UserCart = asyncComponent(() =>
    import('./Content/User/UserCart').then(module => module.default)
)

const CategoryList = asyncComponent(() =>
    import('./Content/Category/CategoryList').then(module => module.default)
)

const CategoryForm = asyncComponent(() =>
    import('./Content/Category/CategoryForm').then(module => module.default)
)

const ProductForm = asyncComponent(() =>
    import('./Content/Product/ProductForm').then(module => module.default)
)

const ProductListAdmin = asyncComponent(() =>
    import('./Content/Product/ProductListAdmin').then(module => module.default)
)

const ProductDetails = asyncComponent(() =>
    import('./Content/Product/ProductDetails').then(module => module.default)
)

const OrderList = asyncComponent(() =>
    import('./Content/Orders/OrderList').then(module => module.default)
)

const UserDashboard = asyncComponent(() =>
    import('./Content/UserDashboard/UserDashboard').then(module => module.default)
)

class Routes extends Component {
  isAuthenticated() {
    return (this.props.authenticated) ? 'true' : 'false';
  }

  isAdmin() {
    return (this.props.admin) ? 'true' : 'false';
  }

  render() {
    return (
      <Switch>
        <Route exact path='/' component={Home}/>
        <Route path='/login' component={Login}/>
        <Route path='/logout' component={Logout}/>
        <Route path='/register' component={UserForm}/>
        <Route path='/forgot-password' component={ForgotPassword}/>
        <Route path='/reset-password/:otp/:userId' component={ResetPassword}/>
        <Route path='/contact-us' component={ContactUs}/>
        <Route path='/product-detail/:productId' component={ProductDetails}/>

        <PrivateRoute path='/my-dashboard' authenticated={this.isAuthenticated()} component={UserDashboard}/>
        <PrivateRoute path='/edit-user/:userId' authenticated={this.isAuthenticated()} component={UserForm}/>
        <PrivateRoute path='/admin/users' admin={this.isAdmin()} authenticated={this.isAuthenticated()} component={UserList}/>
        <PrivateRoute path='/create-category' admin={this.isAdmin()} authenticated={this.isAuthenticated()} component={CategoryForm}/>
        <PrivateRoute path='/edit-category/:categoryId' admin={this.isAdmin()} authenticated={this.isAuthenticated()} component={CategoryForm}/>
        <PrivateRoute path='/admin/categories' admin={this.isAdmin()} authenticated={this.isAuthenticated()} component={CategoryList}/>
        <PrivateRoute path='/create-product' admin={this.isAdmin()} authenticated={this.isAuthenticated()} component={ProductForm}/>
        <PrivateRoute path='/edit-product/:productId' admin={this.isAdmin()} authenticated={this.isAuthenticated()} component={ProductForm}/>
        <PrivateRoute path='/admin/queries' admin={this.isAdmin()} authenticated={this.isAuthenticated()} component={QueryList}/>
        <PrivateRoute path='/admin/products' admin={this.isAdmin()} authenticated={this.isAuthenticated()} component={ProductListAdmin}/>
        <PrivateRoute path='/admin/orders' admin={this.isAdmin()} authenticated={this.isAuthenticated()} component={OrderList}/>
        <PrivateRoute path='/my-cart/:userId' authenticated={this.isAuthenticated()} component={UserCart}/>

        <Redirect to="/" />
      </Switch>
    );
  }
}

const mapStateToProps = (state) => ({
  authenticated: state.authentication.isAuthenticated,
  admin: state.authentication.isAdmin
});

export default Routes = withRouter(connect(
  mapStateToProps
)(Routes));