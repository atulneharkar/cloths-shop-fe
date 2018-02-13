import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';

import {PrivateRoute} from './_components';

import Home from './Content/Home/Home';
import Login from './Authenticate/Login';
import Logout from './Authenticate/Logout';
import ForgotPassword from './Authenticate/ForgotPassword';
import ResetPassword from './Authenticate/ResetPassword';
import UserList from './Content/User/UserList';
import UserForm from './Content/User/UserForm';
import UserCart from './Content/User/UserCart';
import CategoryList from './Content/Category/CategoryList';
import CategoryForm from './Content/Category/CategoryForm';
import ProductForm from './Content/Product/ProductForm';
import ProductListAdmin from './Content/Product/ProductListAdmin';
import ProductDetails from './Content/Product/ProductDetails';
import ContactUs from './Content/ContactUs/ContactUs';
import QueryList from './Content/ContactUs/QueryList';
import OrderList from './Content/Orders/OrderList';
import UserDashboard from './Content/UserDashboard/UserDashboard';

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